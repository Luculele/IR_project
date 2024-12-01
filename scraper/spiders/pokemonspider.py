import scrapy
import scrapy.spiders 
from urllib.parse import quote



class PokemonBulbapediaSpider(scrapy.Spider):
    name = 'pokemonBulbapedia_listAllPokemon'
    
    start_urls = [
        'https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number'
    ]

    def parse(self, response):
        id_ = 1
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
                        'id':       id_,
                        'number': number_,
                        'image' : tds[1].css('a img::attr(src)').get(),
                        'name': tds[2].css('a::text').get().strip(),
                        'form': "No form",
                        'type1': tds[3].css('a span::text').get().strip(),
                        'type2': tds[4].css('a span::text').get().strip(),
                    }
                else :
                    yield {
                        'id':       id_,
                        'number': number_,
                        'image' : tds[1].css('a img::attr(src)').get(),
                        'name': tds[2].css('a::text').get().strip(),
                        'form': "No form",
                        'type1': tds[3].css('a span::text').get().strip(),
                        'type2': "No type",
                    }

                id_ += 1
            
            except:

                if len(tds) == 4:    
                    yield {
                        'id':       id_,
                        'number': number_,
                        'image' : tds[0].css('a img::attr(src)').get(),
                        'name': tds[1].css('a::text').get().strip(),
                        'form': tds[1].css('small::text').get(),
                        'type1': tds[2].css('a span::text').get().strip(),
                        'type2': tds[3].css('a span::text').get().strip(),
                    }
                else:
                    yield {
                        'id':       id_,
                        'number': number_,
                        'image' : tds[0].css('a img::attr(src)').get(),
                        'name': tds[1].css('a::text').get().strip(),
                        'form': tds[1].css('small::text').get(),
                        'type1': tds[2].css('a span::text').get().strip(),
                        'type2': "No type",
                    }
                
                id_ += 1
    

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
                'number':   pokemon.css('td.cell-num.cell-fixed span.infocard-cell-data::text').get(),
                'name':     pokemon.css('td.cell-name a.ent-name::text').get(),
                'form':     form if form is not None else "No form",
                'type1':    types[0],
                'type2':    types[1] if len(types) > 1 else "No type",
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




class PokemonDatabaseSpider(scrapy.Spider):
    name = 'pokemon_fandom'
    start_urls = [
        'https://pokemon.fandom.com/wiki/List_of_Pok%C3%A9mon_by_evolution'
    ]

    def parse(self, response):
        main = response.css('main')

        tables = main.css('div#content div#mw-content-text div.mw-parser-output')
        table = tables.css('table')

        for table in tables:
            trs = table.css('tbody tr:nth-child(n+2)')
    
            for tr in trs:
                ev_array = []
                tds = tr.css('td:nth-child(n+2)')
                for td in tds:
                    a_s = td.css('a')
                    for a in a_s:
                        ev_array.append(a.css('::text').get())
                
                yield {
                    'evolution_line' : ev_array
                }



class PokemonDatabaseMegaFormsSpider(scrapy.Spider):
    name = 'pokemon_megaforms'
    start_urls = [
        'https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution',
    ]

    def parse(self, response):
        table_wrapper = response.css('div#globalWrapper div#column-content div#content div#bodyContent div#mw-content-text div.mw-parser-output')
        tables = table_wrapper.css('table')
        
        old_number = 0
        for table in tables[:2]:
            trs = table.css('tbody tr:nth-child(n+3):not(:last-child)')

            for tr in trs:
                tds = tr.css('td')
                
                if len(tds) == 10:
                    old_number = tds[0].css('::text').get()
                    yield {
                        'number': old_number.strip(),
                        'image': tds[5].css('a img::attr(src)').get(),
                    }
                else:
                    yield {
                        'number': old_number,
                        'image': tds[0].css('a img::attr(src)').get(),
                    }



class PokemonOtherFormsSpider(scrapy.Spider):
    name = 'pokemon_otherforms'
    start_urls = [
        'https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_with_form_differences',
    ]

    def parse(self, response):
        divs = response.css('div[style*="flex: 1"]')
        for div in divs:
            name = div.css('::text').get().strip() if div.css('::text') else None

            image = None
            link = div.css('a')
            if link:
                image = link.css('img::attr(src)').get()

            if name or image: 
                yield {
                    'name': name,
                    'image': image,
                }
