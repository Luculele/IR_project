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
          fetchedPokemon.evolution_line.length > 0
        ) {
          const evolutionPromises = fetchedPokemon.evolution_line.map((name) =>
            fetchPokemonByName(name)
          );
          const evolutionData = await Promise.all(evolutionPromises);

          const filteredEvolutionData = evolutionData.filter(
            (pokemon) => pokemon && String(pokemon.form).trim() === "No form"
          );

          setEvolutionDetails(filteredEvolutionData);
          evolutionIds = filteredEvolutionData.map((evo) => evo.id);
        }

        const recommendedPokemon = await fetchMoreLikeThis(
          id,
          evolutionIds.length - 1
        );
        const filteredRecommended = recommendedPokemon.filter(
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

    loadPokemon().then();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-4 text-gray-600">Loading...</p>;
  }

  if (!pokemon) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6">
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
    <div className="rounded-3xl mx-7 my-[3vh] max-h-[670px] w-[90vw]  flex-grow bg-[rgba(236,236,236,0.95)] overflow-y-auto p-6  shadow-lg custom-scrollbar">
      {/* Top Section */}
      <div className="flex justify-between items-start mb-8">
        {/* Pokémon Image */}
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-46 h-48 object-contain"
        />
        {/* Pokémon Info */}
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold pb-7">{pokemon.name}</h1>
          {pokemon.form && String(pokemon.form).trim() !== "No form" && (
            <h2 className="text-lg text-gray-500 pb-7">{pokemon.form}</h2>
          )}
          <p className="text-gray-600 mt-2 pb-7">#{pokemon.number}</p>
          <div className="flex space-x-4 mt-2">
            <span
              className={`px-5 py-2 text-lg font-bold rounded-full ${
                typeColors[pokemon.type1] || "bg-gray-300 text-black"
              }`}
            >
              {pokemon.type1}
            </span>
            {pokemon.type2 && String(pokemon.type2).trim() !== "No type" && (
              <span
                className={`px-5 py-2 text-lg font-bold rounded-full ${
                  typeColors[pokemon.type2] || "bg-gray-300 text-black"
                }`}
              >
                {pokemon.type2}
              </span>
            )}
          </div>
        </div>
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 w-[150px] h-[70px]"
        >
          Back To Results
        </button>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold border-b-4 pb-2 mb-4">
          Description:
        </h3>
        <p className="text-gray-800">{pokemon.Description}</p>
      </div>

      {/* Base Stats */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold border-b-4 pb-2 mb-4 pt-2">
          Base Stats:
        </h3>
        <div className="grid grid-cols-2 gap-x-10 gap-y-6">
          {[
            { label: "HP", value: pokemon.hp, max: 255 },
            { label: "Attack", value: pokemon.attack, max: 190 },
            { label: "Defense", value: pokemon.defense, max: 250 },
            { label: "Sp. Atk", value: pokemon.sp_atk, max: 194 },
            { label: "Sp. Def", value: pokemon.sp_def, max: 255 },
            { label: "Speed", value: pokemon.speed, max: 200 },
          ].map((stat) => {
            const percentage = (stat.value / stat.max) * 100;

            const color = `hsl(${(percentage * 120) / 100}, 100%, 50%)`;

            return (
              <div key={stat.label} className="flex items-center gap-x-4">
                <span className="w-20 font-semibold">{stat.label}:</span>
                <div className="flex items-center flex-grow">
                  <div
                    className="h-4 rounded-full flex-grow"
                    style={{
                      background: `linear-gradient(to right, ${color}, ${color} ${percentage}%, #e5e7eb ${percentage}%)`,
                    }}
                  ></div>
                  <span className="ml-4 text-gray-800 font-semibold">
                    {stat.value}/{stat.max}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Total Stats */}
      <div className="mt-6">
        <div className="flex items-center gap-x-4">
          <span className="w-20 text-2xl font-semibold ">Total:</span>
          <div className="flex items-center flex-grow">
            <div
              className="h-6 rounded-full flex-grow"
              style={{
                background: `linear-gradient(to right, hsl(${
                  (pokemon.total / 1549) * 120
                }, 100%, 50%), hsl(${
                  (pokemon.total / 1549) * 120
                }, 100%, 50%) ${(pokemon.total / 1549) * 100}%, #e5e7eb ${
                  (pokemon.total / 1549) * 100
                }%)`,
              }}
            ></div>
            <span className="ml-4 text-gray-800 font-semibold">
              {pokemon.total}/1549
            </span>
          </div>
        </div>
      </div>

      {/* Evolution Line */}
      <div className="mb-8">
        <h3 className="text-2xl pt-7 font-semibold border-b-4 pb-2 mb-4">
          Evolution Line:
        </h3>
        <div className="flex flex-wrap gap-4 pt-7 justify-center">
          {evolutionDetails.map((evolution) => (
            <div
              key={evolution.id}
              className="bg-gray-100 p-6 w-[200px] h-[200px] rounded-lg shadow hover:shadow-lg cursor-pointer flex flex-col items-center"
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

      {/* More Like This */}
      <div>
        <h3 className="text-2xl font-semibold border-b-4 pb-2 pt-8 mb-4">
          More Like This:
        </h3>
        <div className="flex flex-wrap gap-4 justify-center h-[200px]">
          {recommended.slice(0, 4).map((rec) => (
            <div
              key={rec.id}
              className="bg-white  w-[200px] p-7 rounded-lg shadow hover:shadow-lg cursor-pointer flex flex-col items-center"
              onClick={() => navigate(`/pokemon/${rec.id}`)}
            >
              <img
                src={rec.image}
                alt={rec.name}
                className="w-20 h-20 object-contain"
              />
              <p className="mt-2 font-semibold">{rec.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
