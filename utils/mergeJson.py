import json

# this file is used to merge data from dei json of pokemonDB(file1) and Bulbapedia(file2)
# take the images from Bulbapedia and put them with the informations from pokemonDB
# save everything in the output path
def merge_json_files (file1, file2, output):
    with open(file1, 'r', encoding='utf-8') as f1, open(file2, 'r', encoding='utf-8') as f2:
        d1 = json.load(f1)
        d2 = json.load(f2)

    images_dictionary = {(item['name'], item['form']): item['image'] for item in d2}

    for pokemon in d1:
        key = (pokemon['name'], pokemon['form'])

        if key in images_dictionary:
            pokemon['image'] = images_dictionary[key]
    
    with open(output, 'w', encoding='utf-8') as f_out:
        json.dump(d1, f_out, ensure_ascii=False, indent=4)


if __name__ == "__main__":

    file1_path = '../data/pokemonsDatabaseAll.json'
    file2_path = '../data/pokemonsBulbapediaAll.json'
    output_path = '../data/final_data/bigPokemonData.json'

    merge_json_files(file1_path, file2_path, output_path)