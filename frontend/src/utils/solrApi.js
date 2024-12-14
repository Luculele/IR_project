import axios from "axios";

const SOLR_BASE_URL = "/api";

export const searchPokemon = async (
  query = "",
  filters = {},
  page = 0,
  rowsPerPage = 2000
) => {
  try {
    let qFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc.push(`${key}:[${value[0]} TO ${value[1]}]`);
      } else if (key === "type1" || key === "type2") {
        if (value) {
          acc.push(`(type1:${value} OR type2:${value})`);
        }
      } else if (value) {
        acc.push(`${key}:${value}`);
      }
      return acc;
    }, []);

    qFilters = qFilters.join(" AND ");

    const query2 = query.trim() === "" ? "*:*" : query;
    console.log("Search query:", query2);
    console.log("Generated filter queries:", qFilters);

    const response = await axios.get(`${SOLR_BASE_URL}/select`, {
      params: {
        q: query2,
        defType: "edismax",
        qf: "name^2 Description type1 type2 evolution_line",
        start: page * rowsPerPage,
        rows: rowsPerPage,
        wt: "json",
        fq: qFilters,
      },
    });

    return response.data.response.docs;
  } catch (error) {
    console.error("Error during the call to Solr:", error);
    throw error;
  }
};

// Fetch a Pokémon by its exact ID
export const fetchPokemonById = async (id) => {
  try {
    const response = await axios.get(`${SOLR_BASE_URL}/select`, {
      params: {
        q: `id:${id}`,
        wt: "json",
        rows: 1,
      },
    });

    const docs = response.data.response.docs;
    return docs.length > 0 ? docs[0] : null;
  } catch (error) {
    console.error("Error fetching Pokémon by ID:", error);
    throw error;
  }
};

export const fetchMoreLikeThis = async (id, ev_line_number) => {
  let rows = 4 + ev_line_number;
  try {
    const response = await fetch(
      `/api/mlt?q=id:${id}&mlt.fl=name,Description,type1,type2&mlt.qf=name^2 Description^1 type1^1.5 type2^1.5&mlt.mindf=1&mlt.mintf=1&rows=${rows}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching MLT data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response.docs;
  } catch (error) {
    console.error("Error fetching more like this:", error);
    return [];
  }
};

export const fetchPokemonByName = async (name) => {
  try {
    const response = await fetch(`/api/select?q=name:"${name}"&wt=json&rows=1`);

    if (!response.ok) {
      throw new Error(`Error fetching Pokémon by name: ${response.statusText}`);
    }

    const data = await response.json();
    const docs = data.response.docs;

    return docs.length > 0 ? docs[0] : null;
  } catch (error) {
    console.error("Error fetching Pokémon by name:", error);
    return null;
  }
};
