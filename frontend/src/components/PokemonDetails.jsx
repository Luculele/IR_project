import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchPokemonById,
  fetchMoreLikeThis,
  fetchPokemonByName,
} from "../utils/solrApi";

const typeColors = {
  Grass: "bg-green-500 text-white",
  Poison: "bg-purple-500 text-white",
  Fire: "bg-red-500 text-white",
  Water: "bg-blue-500 text-white",
  Electric: "bg-yellow-500 text-black",
  Flying: "bg-indigo-500 text-white",
  Bug: "bg-green-700 text-white",
  Psychic: "bg-pink-500 text-white",
  Rock: "bg-gray-500 text-white",
  Ground: "bg-yellow-700 text-white",
  Ice: "bg-cyan-500 text-black",
  Dragon: "bg-orange-500 text-white",
  Dark: "bg-gray-800 text-white",
  Fairy: "bg-pink-300 text-black",
  Steel: "bg-gray-300 text-black",
  Fighting: "bg-red-700 text-white",
  Ghost: "bg-purple-800 text-white",
  Normal: "bg-gray-200 text-black",
};

const PokemonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommended, setRecommended] = useState([]);
  const [evolutionDetails, setEvolutionDetails] = useState([]);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const fetchedPokemon = await fetchPokemonById(id);
        setPokemon(fetchedPokemon);
        let evolutionIds = [];
        if (
          fetchedPokemon.evolution_line &&
          fetchedPokemon.evolution_line.length > 0
        ) {
          const evolutionPromises = fetchedPokemon.evolution_line.map((name) =>
            fetchPokemonByName(name)
          );
          const evolutionData = await Promise.all(evolutionPromises);

          console.log("evolution DAta", evolutionData);
          const filteredEvolutionData = evolutionData.filter(
            (pokemon) => pokemon && String(pokemon.form).trim() === "No form"
          );

          setEvolutionDetails(filteredEvolutionData);
          console.log("settedEvolutionDetails", evolutionDetails);

          evolutionIds = filteredEvolutionData.map((evo) => evo.id);
        }

        const recommendedPokemons = await fetchMoreLikeThis(
          id,
          evolutionIds.length - 1
        );
        const filteredRecommended = recommendedPokemons.filter(
          (rec) => !evolutionIds.includes(rec.id)
        );
        setRecommended(filteredRecommended);
      } catch (error) {
        console.error("Error loading Pokémon details:", error);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-4 text-gray-600">Loading...</p>;
  }

  if (!pokemon) {
    return (
      <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">Pokémon not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go Back
      </button>
      <div className="bg-white p-6 rounded shadow-lg max-w-xl mx-auto">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-32 h-32 mx-auto"
        />
        <h1 className="text-2xl font-bold text-center mt-4">{pokemon.name}</h1>
        {pokemon.form && String(pokemon.form).trim() !== "No form" && (
          <h2 className="text-lg text-gray-500 text-center">{pokemon.form}</h2>
        )}
        <p className="text-center text-gray-600 mt-2">#{pokemon.number}</p>
        <div className="flex justify-center mt-4 space-x-2">
          <span
            className={`px-3 py-1 text-sm font-bold rounded-full ${
              typeColors[pokemon.type1] || "bg-gray-300 text-black"
            }`}
          >
            {pokemon.type1}
          </span>
          {pokemon.type2 && String(pokemon.type2).trim() !== "No type" && (
            <span
              className={`px-3 py-1 text-sm font-bold rounded-full ${
                typeColors[pokemon.type2] || "bg-gray-300 text-black"
              }`}
            >
              {pokemon.type2}
            </span>
          )}
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Description:</h3>
          <p className="text-gray-800">{pokemon.Description}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Base Stats:</h3>
          <ul className="text-gray-800">
            <li>HP: {pokemon.hp}</li>
            <li>Attack: {pokemon.attack}</li>
            <li>Defense: {pokemon.defense}</li>
            <li>Sp. Atk: {pokemon.sp_atk}</li>
            <li>Sp. Def: {pokemon.sp_def}</li>
            <li>Speed: {pokemon.speed}</li>
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Evolution Line:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {evolutionDetails.map((evolution) => (
              <div
                key={evolution.id}
                className="bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center cursor-pointer hover:shadow-lg"
                onClick={() => navigate(`/pokemon/${evolution.id}`)}
              >
                <img
                  src={evolution.image}
                  alt={evolution.name}
                  className="w-20 h-20"
                />
                <p className="mt-2 font-bold">{evolution.name}</p>
                <p className="text-gray-500 text-sm">#{evolution.number}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">More Like This:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {recommended.slice(0, 4).map((rec) => (
            <div
              key={rec.id}
              className="p-4 bg-white rounded shadow hover:shadow-lg cursor-pointer"
              onClick={() => navigate(`/pokemon/${rec.id}`)}
            >
              <img
                src={rec.image}
                alt={rec.name}
                className="w-24 h-24 mx-auto"
              />
              <p className="text-center mt-2 font-semibold">{rec.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
