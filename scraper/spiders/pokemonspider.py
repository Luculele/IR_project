import scrapy
import scrapy.spiders 
from urllib.parse import quote



class PokemonBulbapediaSpider(scrapy.Spider):
    name = 'pokemonBulbapedia_listAllPokemon'
    
    start_urls = [
        'https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number'
    ]

    def parse(self, response):
        number_ = 0
        for pokemon in response.css('table.roundy tbody tr[style="background:#FFF"]'):
            tds = pokemon.css('td')  
            try:
                is_number_ = tds[0].css('::text').get()

                if is_number_ is None:
                    raise ValueError("Number not found")
                
                number_ = is_number_.strip()

                if len(tds) == 5:    
                    yield {
                        'number': number_,
                        'image' : tds[1].css('a img::attr(src)').get(),
                        'name': tds[2].css('a::text').get().strip(),
                        'form': None,
                        'type1': tds[3].css('a span::text').get().strip(),
                        'type2': tds[4].css('a span::text').get().strip(),
                    }
                else :
                    yield {
                        'number': number_,
                        'image' : tds[1].css('a img::attr(src)').get(),
                        'name': tds[2].css('a::text').get().strip(),
                        'form': None,
                        'type1': tds[3].css('a span::text').get().strip(),
                        'type2': None,
                    }
            
            except:

                if len(tds) == 4:    
                    yield {
                        'number': number_,
                        'image' : tds[0].css('a img::attr(src)').get(),
                        'name': tds[1].css('a::text').get().strip(),
                        'form': tds[1].css('small::text').get(),
                        'type1': tds[2].css('a span::text').get().strip(),
                        'type2': tds[3].css('a span::text').get().strip(),
                    }
                else:
                    yield {
                        'number': number_,
                        'image' : tds[0].css('a img::attr(src)').get(),
                        'name': tds[1].css('a::text').get().strip(),
                        'form': tds[1].css('small::text').get(),
                        'type1': tds[2].css('a span::text').get().strip(),
                        'type2': None,
                    }
    

# Spider for Bulbapedia's Pokémon Database
class PokemonDatabaseSpider(scrapy.Spider):
    name = 'pokemonDatabase_listAllPokemon'
    start_urls = [
        'https://pokemondb.net/pokedex/all'
    ]
    
    def parse(self, response):
        # Loop through each Pokémon row

        id_ = 1

        for pokemon in response.css('table#pokedex.data-table.sticky-header.block-wide tbody tr'):
            # Extract Pokémon stats
            stats = pokemon.css('td.cell-num::text').getall()
            form = pokemon.css('td.cell-name small.text-muted::text').get()
            types = pokemon.css('td.cell-icon a.type-icon::text').getall()
            pokemon_data = {
                'id':       id_,
                'number':       pokemon.css('td.cell-num.cell-fixed span.infocard-cell-data::text').get(),
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

            id_ += 1

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


# class PokemonSerebiiGen1(scrapy.Spider):
#     name = "PokemonSerebiiGen1"
#     start_urls = [
#         'https://pokemondb.net/pokedex/all'
#     ]

#     def parse(self, response):
#         main = response.css('main *')

#         buttons = main.css('img.typeimg')








# class PokemonShowdownSpider(scrapy.Spider):
#     name = "PokemonShowdown"

#     def start_requests(self):
#         yield scrapy.Request(
#             url='https://dex.pokemonshowdown.com/pokemon',
#             callback=self.parse,
#             meta={
#                 "playwright": True,
#                 "playwright_page_methods": [
#                     PageMethod('set_default_timeout', 0),
#                     PageMethod('wait_for_selector', 'div.pfx-panel div.pfx-body div.results ul li:nth-child(n+3)'),
#                 ],
#             },
#         )

    
#     async def parse(self, response):

#         lis = response.css('div.pfx-panel div.pfx-body div.results ul li')

#         for li in lis:
#             new_page = li.css('a::attr(href)').get()

#             if new_page is not None:
#                 normalized_url = response.urljoin(new_page)
#                 yield scrapy.Request(
#                     url=normalized_url,
#                     callback=self.parse_pokemon_page,
#                     meta={
#                         "playwright": True,
#                         "playwright_page_methods": [
#                             PageMethod('set_default_timeout', 0),
#                             PageMethod('wait_for_selector', 'div.pfx-panel div.pfx-body.dexentry'),
#                         ],
#                     },
#                     dont_filter=True,  
#                 )
    
#     async def parse_pokemon_page(self, response):

#         pokemon_box = response.css('div.pfx-panel div.pfx-body.dexentry')

#         pokemon_data = {}

#         pokemon_data['name'] = pokemon_box.css('h1 a::text').get()

#         sizes = pokemon_box.css('dl.sizeentry')
#         pokemon_data['sizes'] = sizes.css('dd::text').get()
        
#         abilities = pokemon_box.css('dl.abilityentry')
#         pokemon_data['ability1'] = abilities.css('dd a::text').get(default="Unknown")
#         pokemon_data['ability2'] = abilities.css('dd a em::text').get(default=None)
    
#         if not pokemon_data['ability1']:
#             self.logger.warning(f"No ability1 found for {pokemon_data['name']}")

#         # stats_table = pokemon_box.css('dl:not(.specific-class) dd:first-of-type table tbody')

#         # if stats_table:
#         #     pokemon_data['min_hp'] = stats_table.css('tr:nth-child(2) td:nth-child(4) small::text').get()
#         #     pokemon_data['max_hp'] = stats_table.css('tr:nth-child(2) td:nth-child(5) small').get()

#         #     trs = stats_table.css('tr:nth-child(n+3)')
#         #     for i, stat in enumerate({'attack', 'defense', 'sp_atk', 'sp_def', 'speed'}):
#         #         if i < len(trs):
#         #             pokemon_data[f'min_{stat}'] = trs[i].css('td:nth-child(3) small::text').get(default="N/A")
#         #             pokemon_data[f'max_{stat}'] = trs[i].css('td:nth-child(6) small::text').get(default="N/A")
#         #         else:
#         #             pokemon_data[f'min_{stat}'] = "N/A"
#         #             pokemon_data[f'max_{stat}'] = "N/A"
#         # else:
#         #     self.logger.warning(f"No stats table found for {pokemon_data['name']}")

#         yield pokemon_data



        



 
