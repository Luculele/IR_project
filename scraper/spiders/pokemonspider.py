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
        id_ = 0
        for pokemon in response.css('table.roundy tbody tr[style="background:#FFF"]'):
            tds = pokemon.css('td')  
            try:
                # new_rowspan = int(tds[0].css('::attr(rowspan)').get())
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
            yield {
                'id': pokemon.css('td.cell-num.cell-fixed span.infocard-cell-data::text').get(),  # ID
                'name': pokemon.css('td.cell-name a.ent-name::text').get(),  # Name
                'form': form,
                'types': pokemon.css('td.cell-icon a.type-icon::text').getall(),  # Types
                'total': stats[0],  # Total stats
                'hp': stats[1],     # HP
                'attack': stats[2], # Attack
                'defense': stats[3],# Defense
                'sp_atk': stats[4], # Special Attack
                'sp_def': stats[5], # Special Defense
                'speed': stats[6],  # Speed
                }
