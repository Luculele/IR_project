import scrapy
import scrapy.spiders 


class PokemonDotComSpider(scrapy.Spider):
    name = 'pokemon.com/pokedex'
    start_urls = [
        'https://www.pokemon.com/us/pokedex'
    ]

    def parse(self, response):
        for pokemon in response.css('section.section pokedex-results overflow-visible ul.results li.animating div.pokemon-info').getall():
            try:
                yield {
                    'id' : pokemon.css('p.id').get(),
                    'name' : pokemon.css('h5').get(),
                    'ability1' : pokemon.css('div.abilities').get(),
                    'ability2' : pokemon.css('div.abilities').getall()[1],
                }
            except:
                yield {
                    'id' : pokemon.css('p.id').get(),
                    'name' : pokemon.css('h5').get(),
                    'ability1' : pokemon.css('div.abilities').get(),
                }



class PokemonBulbapediaSpider(scrapy.Spider):
    name = 'pokemonBulbapedia_listAllPokemon'
    start_urls = [
        'https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number'
    ]

    def parse(self, response):
        for pokemon in response.css('table.roundy tbody tr[style="background:#FFF"]'):
            tds = pokemon.css('td')  
            if len(tds) == 5:    
                yield {
                    'id': tds[0].css('::text').get().strip()  ,
                    'name': tds[2].css('a::text').get().strip(),
                    'type1': tds[3].css('a span::text').get(),
                    'type2': tds[4].css('a span::text').get(),
                }
            else:
                yield {
                    'id': tds[0].css('::text').get().strip()  ,
                    'name': tds[2].css('a::text').get().strip(),
                    'type1': tds[3].css('a span::text').get(),
                    'type2': None,
                }