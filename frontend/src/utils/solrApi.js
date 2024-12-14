import axios from "axios";

const SOLR_BASE_URL = "/api";

export const searchPokemon = async (
    query,
    filters = {},
    page = 0,
    rowsPerPage = 20
) => {
  try {
    let qFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc.push(`${key}:[${value[0]} TO ${value[1]}]`);
      } else if (value) {
        acc.push(`${key}:${value}`);
      }
      return acc;
    }, []);

    qFilters = qFilters.join(" AND ");

    console.log("Search query:", query);
    console.log("Generated filter queries:", qFilters);

    const response = await axios.get(`${SOLR_BASE_URL}/select`, {
      params: {
        q: query,
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
        q: `id:${id}`, // Exact match for ID
        wt: "json",
        rows: 1, // Expect only one result
      },
    });

    const docs = response.data.response.docs;
    return docs.length > 0 ? docs[0] : null; // Return the Pokémon or null if not found
  } catch (error) {
    console.error("Error fetching Pokémon by ID:", error);
    throw error;
  }
};
