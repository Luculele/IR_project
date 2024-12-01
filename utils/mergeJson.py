import json
from sortJsonById import sort_json_by_id

# This script merges data from two JSON files: PokémonDB (file1) and Bulbapedia (file2).
# It extracts images from Bulbapedia and combines them with information from PokémonDB.
# The merged data is saved to the specified output path.
def merge_json_files (file1, file2, file3, file4, file5, output):
    with open(file1, 'r', encoding='utf-8') as f1, open(file2, 'r', encoding='utf-8') as f2, open(file3, 'r', encoding='utf-8') as f3, open(file4, 'r', encoding='utf-8') as f4, open(file5, 'r', encoding='utf-8') as f5:
        d1 = json.load(f1)
        d2 = json.load(f2)
        d3 = json.load(f3)
        d4 = json.load(f4)
        d5 = json.load(f5)

    images_dictionary = {}
    for item in d2:
        form_first_word = item['form'].split()[0] if item['form'] else ''
        key = (item['name'], form_first_word)
        images_dictionary[key] = item['image']

    mega_images_dictionary = {}
    for item in d3:
        number = item['number'].replace('#', '').replace('\n', 'Y')
        mega_images_dictionary[number] = item['image']

    other_forms_dictionary = {}
    for item in d4:
        form = item.get('name', '')
        key = (form)
        other_forms_dictionary[key] = item.get('image', None)

    for pokemon in d1:
        form_first_word = pokemon['form'].split()[0] if pokemon['form'] else ''
        key = (pokemon['name'], form_first_word)

        if key in images_dictionary:
            pokemon['image'] = images_dictionary[key]
        else:
            pokemon['image'] = None
        
        pokemon_number = pokemon.get('number', '').strip()
        form = pokemon.get('form', '')

        if 'Mega' in form:  
            if 'Y' in form and pokemon_number in mega_images_dictionary:
                pokemon['image'] = mega_images_dictionary[pokemon_number + 'Y']
            elif 'X' in form and pokemon_number in mega_images_dictionary:
                pokemon['image'] = mega_images_dictionary[pokemon_number]
            elif pokemon_number in mega_images_dictionary:
                pokemon['image'] = mega_images_dictionary[pokemon_number]


        other_form_key = (pokemon['form'])
        if other_form_key in other_forms_dictionary:
            pokemon['image'] = other_forms_dictionary[other_form_key]

        for evolution in d5:  
            if pokemon['name'] in evolution['evolution_line']:
                pokemon['evolution_line'] = evolution['evolution_line']

    
    # now there are some pokemons images that is impossible to scrape and merge without doing it specifically "by hand"
    manual_assignments = [
        {"name": "Pikachu", "form": "Partner Pikachu", "image": "https://projectpokemon.org/home/uploads/monthly_2019_06/large.partner-pikachu.png.98d62e1b15ba68afa8658c09a638e92f.png"},
        {"name": "Tauros", "form": "Combat Breed", "image": "https://archives.bulbagarden.net/media/upload/2/25/0128Tauros-Paldea_Combat.png"},
        {"name": "Tauros", "form": "Blaze Breed", "image": "https://archives.bulbagarden.net/media/upload/thumb/f/f5/0128Tauros-Paldea_Blaze.png/110px-0128Tauros-Paldea_Blaze.png"},
        {"name": "Tauros", "form": "Aqua Breed", "image": "https://archives.bulbagarden.net/media/upload/thumb/d/d9/0128Tauros-Paldea_Aqua.png/110px-0128Tauros-Paldea_Aqua.png"},
        {"name": "Eevee", "form": "Partner Eevee", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8JNIrS1SWbK7WwaGCmGKQR7RbL_TY-OmNg&s"},
        {"name": "Ho-oh", "form": "No form", "image": "https://w7.pngwing.com/pngs/377/883/png-transparent-pokemon-gold-and-silver-pokemon-heartgold-and-soulsilver-pokemon-ultra-sun-and-ultra-moon-pokemon-ruby-and-sapphire-ho-oh-others-vertebrate-fauna-video-game-thumbnail.png"},
        {"name": "Rockruff", "form": "Own Tempo Rockruff", "image": "https://projectpokemon.org/home/uploads/monthly_2017_11/5a09917029c19_DuskRockruff.png.de7ccefef76945ccfa2e433e0ac78958.png"},
        {"name": "Minior", "form": "Core Form", "image": "https://archives.bulbagarden.net/media/upload/thumb/8/84/0774Minior-Core.png/1024px-0774Minior-Core.png"},
        {"name": "Zacian", "form": "Hero of Many Battles", "image": "https://archives.bulbagarden.net/media/upload/thumb/3/32/0888Zacian-Hero.png/250px-0888Zacian-Hero.png"},
        {"name": "Zamazenta", "form": "Hero of Many Battles", "image": "https://archives.bulbagarden.net/media/upload/thumb/f/fc/0889Zamazenta-Hero.png/250px-0889Zamazenta-Hero.png"},
    ]

    for assignment in manual_assignments:
        name = assignment['name']
        form = assignment['form']
        image = assignment['image']

        for pokemon in d1:
            if pokemon['name'] == name and pokemon['form'] == form:
                pokemon['image'] = image
                break

    with open(output, 'w', encoding='utf-8') as f_out:
        json.dump(d1, f_out, ensure_ascii=False, indent=4)

    sort_json_by_id(output, output)


if __name__ == "__main__":

    file1 = '../data/pokemonsDatabaseAll.json'
    file2 = '../data/pokemonBulbapediaAll.json'
    file3 = '../data/pokemon_megaforms.json'
    file4 = '../data/pokemon_otherForms.json'
    file5 = '../data/pokemon_fandom.json'
    output = '../data/final_data/bigPokemonData.json'

    merge_json_files(file1, file2, file3, file4, file5, output)