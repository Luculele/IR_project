import axios from "axios";

const SOLR_BASE_URL = "/api";

export const searchPokemon = async (query, page = 0, rowsPerPage = 10) => {
  try {
    const response = await axios.get(`${SOLR_BASE_URL}/select`, {
      params: {
        q: query,
        defType: "edismax",
        qf: "name^2 Description type1 type2",
        start: page * rowsPerPage,
        rows: rowsPerPage,
        wt: "json",
      },
    });
    return response.data.response.docs;
  } catch (error) {
    console.error("Error during the call to Solr:", error);
    throw error;
  }
};
