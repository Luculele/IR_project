import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPokemonById } from "../utils/solrApi";

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

    useEffect(() => {
        const loadPokemon = async () => {
            try {
                const fetchedPokemon = await fetchPokemonById(id);
                setPokemon(fetchedPokemon);
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
                    <p className="text-gray-800">{pokemon.evolution_line.join(" → ")}</p>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetails;