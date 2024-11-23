import json

# this function is used tu sort all the json objects in a json file by the id field
# I use this because after apply a merge all the pokemons are unordered
# so always call this function after a merge 
def sort_json_by_id(input, output):
    
    with open(input, 'r', encoding='utf-8') as f:
        data = json.load(f) 

    sorted_d = sorted(data, key=lambda x: int(x['id']))

    with open(output, 'w', encoding='utf-8') as f_out:
        json.dump(sorted_d, f_out, ensure_ascii=False, indent=4)


if __name__ == "__main__":

    input = '../data/final_data/bigPokemonData.json'
    output = '../data/final_data/bigPokemonData.json'

    sort_json_by_id(input, output)