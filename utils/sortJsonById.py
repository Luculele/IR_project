import json

# This function sorts all JSON objects in a JSON file by the 'id' field.
# It is used because, after merging, the Pokémon data may become unordered.
# Always call this function after performing a merge to ensure the data is properly sorted.
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