import React, {useEffect, useState} from "react";
import axios from "axios";
import "./PokemonCard.css";

function PokemonCard({name}) {

    const [pokemonData, setPokemonData] = useState({});

    useEffect(()=> {
        async function fetchPokemon() {
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                // console.log(result);
                setPokemonData(result);
            } catch (e) {
                console.error(e);
            }
        }
        fetchPokemon();
    }, []);


    return (
        <>
            { Object.keys(pokemonData).length > 0 && // DIT IS BELANGRIJK!!!
                <div className="pokemon-card">
                    <h2>{pokemonData.data.name}</h2>
                    <img src={pokemonData.data.sprites.front_default}/>
                    <p>Abilities: </p>
                    <ul>
                        {pokemonData.data.abilities.map((a) => {
                            return <li key={a.ability.name} >{a.ability.name}</li>
                        })}
                    </ul>
                    <p>{`Gewicht: ${pokemonData.data.weight}`}</p>
                    <p>{`Aantal moves: ${pokemonData.data.moves.length}`}</p>
                </div>
            }
        </>
    );
}

export default PokemonCard;






