import scrapy
import scrapy.spiders 
from urllib.parse import quote



class PokemonBulbapediaSpider(scrapy.Spider):
    name = 'pokemonBulbapedia_listAllPokemon'
    start_urls = [
        'https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number'
    ]

    def parse(self, response):
        id_ = 0
        for pokemon in response.css('table.roundy tbody tr[style="background:#FFF"]'):
            tds = pokemon.css('td')  
            try:
                is_id_ = tds[0].css('::text').get()

                if is_id_ is None:
                    raise ValueError("Id not found")
                
                id_ = is_id_.strip()

                if len(tds) == 5:    
                    yield {
                        'id': id_,
                        'name': tds[2].css('a::text').get().strip(),
                        'form': None,
                        'type1': tds[3].css('a span::text').get().strip(),
                        'type2': tds[4].css('a span::text').get().strip(),
                    }
                else :
                    yield {
                        'id': id_,
                        'name': tds[2].css('a::text').get().strip(),
                        'form': None,
                        'type1': tds[3].css('a span::text').get().strip(),
                        'type2': None,
                    }
            
            except:

                if len(tds) == 4:    
                    yield {
                        'id': id_,
                        'name': tds[1].css('a::text').get().strip(),
                        'form': tds[1].css('small::text').get(),
                        'type1': tds[2].css('a span::text').get().strip(),
                        'type2': tds[3].css('a span::text').get().strip(),
                    }
                else:
                    yield {
                        'id': id_,
                        'name': tds[1].css('a::text').get().strip(),
                        'form': tds[1].css('small::text').get(),
                        'type1': tds[2].css('a span::text').get().strip(),
                        'type2': None,
                    }
    

class PokemonDatabaseSpider(scrapy.Spider):
    name = 'pokemonDatabase_listAllPokemon'
    start_urls = [
        'https://pokemondb.net/pokedex/all'
    ]

    def parse(self, response):
        # Loop through each Pokémon row
        for pokemon in response.css('table#pokedex.data-table.sticky-header.block-wide tbody tr'):
            # Extract Pokémon stats
            stats = pokemon.css('td.cell-num::text').getall()
            form = pokemon.css('td.cell-name small.text-muted::text').get()
            types = pokemon.css('td.cell-icon a.type-icon::text').getall()
            pokemon_data = {
                'id':       pokemon.css('td.cell-num.cell-fixed span.infocard-cell-data::text').get(),
                'name':     pokemon.css('td.cell-name a.ent-name::text').get(),
                'form':     form,
                'type1':    types[0],
                'type2':    types[1] if len(types) > 1 else None,
                'total':    stats[0],
                'hp':       stats[1],
                'attack':   stats[2],
                'defense':  stats[3],
                'sp_atk':   stats[4],
                'sp_def':   stats[5],
                'speed':    stats[6],
            }

            new_page = pokemon.css('td.cell-name a.ent-name::attr(href)').get()

            if new_page is not None:
                normalized_url = response.urljoin(quote(new_page))
                yield response.follow(normalized_url, self.parse_pokemon_page, meta={'pokemon_data' : pokemon_data}, dont_filter=True)

    def parse_pokemon_page (self, response):
        pokemon_data = response.meta['pokemon_data']

        # scrape the paragraphs
        main = response.xpath('//main')

        paragraphs = main.css('ul.list-nav.panel.panel-nav ~ p')
        
        pokemon_data['Description'] = '\n'.join(paragraph.xpath('string(.)').get().strip() for paragraph in paragraphs)

        yield pokemon_data



# class PokemonDatabaseSpider(scrapy.Spider):
#     name = 'pokemonDatabase_listAllPokemon'
#     start_urls = [
#         'https://pokemondb.net/pokedex/all'
#     ]

#     def parse(self, response):
#         for pokemon in response.css('table#pokedex.data-table.sticky-header.block-wide tbody tr'):

#             pokemon_data = {}
#             new_page =  pokemon.css('td.cell-name a.ent-name::text').get()

#             if new_page is not None:
#                 yield response.follow(new_page, self.parse_pokemon_page, meta={'pokemon_data' : pokemon_data})

#     # function to parse each pokemon page 
#     def parse_pokemon_page (self, response):
#         pokemon_data = response.meta['pokemon_data']

#         # scrape the paragraphs
#         main = response.xpath('//main')

#         paragraphs = main.css('ul.list-nav.panel.panel-nav ~ p')
#         # TODO put paragraphs in the obj
#         paragraphs_joined = '\n'.join(paragraph.xpath('string(.)').get().strip() for paragraph in paragraphs)

#         # iterate through all pokemon forms
#         all_pokemon_forms = response.css('div.sv-tabs-panel-list') 
#         pokemon_forms = all_pokemon_forms[0].css('div')
#         all_pokemon_tabs = response.css('div.sv-tabs-tab-list') 
#         names = all_pokemon_tabs[0].css('a::text')

#         for i in range(len(pokemon_forms)):

#             pokemon_data['Name'] = names[i].get()

#             data_boxes = pokemon_forms[i].css('div.grid-row')
#             print(f"DEBUUUUUUUUUGGGGG: {len(data_boxes)} \n")
#             info = data_boxes[0]
#             stats = data_boxes[1]

#             # scraping the infos
#             info_divs = info.css('div')

#             #image
#             pokemon_data['Pokemon_image'] = info_divs[0].css('p a::attr(href)').get()

#             # pokedex data
#             trs = info_divs[1].css('table.vitals-table tbody tr')
#             # # Id
#             # pokemon_data['National_Id'] = trs[0].css('td strong').get()
#             # #types
#             # types = trs[1].css('td')
#             # for i in range(len(types)-1):
#             #     pokemon_data[f'Type_{i+1}'] = types[i].get()
#             # # Species
#             # pokemon_data['Species'] = trs[2].css('td').get()
#             # # Height
#             # pokemon_data['Height'] = trs[3].css('td').get()
#             # # Weight 
#             # pokemon_data['Weight'] = trs[4].css('td').get()

#             # # scrape pokemon stats
#             # base_stats = stats[0]
#             # table = base_stats.css('div.resp-scroll table')
#             # tbody = table.css('tbody')
#             # tfoot = table.css('tfoot')
#             # trss = tbody.css('tr')

#             # for i, stat in enumerate(['hp', 'attack', 'defense', 'sp_atk', 'sp_def', 'speed']):
#             #     pokemon_data[f'Base_{stat}'] = trss[i].css('td:nth-child(2)::text').get()
#             #     pokemon_data[f'Min_{stat}'] = trss[i].css('td:nth-child(4)::text').get()
#             #     pokemon_data[f'Max_{stat}'] = trss[i].css('td:nth-child(5)::text').get()
            
#             # pokemon_data[f'Base_total'] = tfoot.css('tr td').get()
#             # pokemon_data['Paragraphs'] = paragraphs_joined

#             yield pokemon_data



#         # divs = response.css('div.grid-col span-md-12 span-lg-8')

#         # for i in range(len(divs) - 1):
#         #     div = divs[i] 

#         #     table = div.css('div.resp-scroll table')
#         #     tbody = table.css('tbody')
#         #     tfoot = table.css('tfoot')
#         #     trs = tbody.css('tr')

#         #     for i, stat in enumerate(['hp', 'attack', 'defense', 'sp_atk', 'sp_def', 'speed']):
#         #         pokemon_data[f'base_{stat}'] = trs[i].css('td:nth-child(2)::text').get()
#         #         pokemon_data[f'min_{stat}'] = trs[i].css('td:nth-child(4)::text').get()
#         #         pokemon_data[f'max_{stat}'] = trs[i].css('td:nth-child(5)::text').get()
            
#         #     pokemon_data[f'base_total'] = tfoot.css('tr td').get()

#         #     yield pokemon_data



        
