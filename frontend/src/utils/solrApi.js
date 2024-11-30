import axios from "axios";

const SOLR_BASE_URL = "/api";

export const searchPokemon = async (query) => {
  try {
    const response = await axios.get(`${SOLR_BASE_URL}/select`, {
      params: {
        q: `name:${query}`,
        wt: "json",
      },
    });
    return response.data.response.docs;
  } catch (error) {
    console.error("Error during the call to solr:", error);
    throw error;
  }
};
