import React, {useEffect, useState} from 'react';
import './App.css';
import PokemonCard from "./conponents/pokemonCard/PokemonCard";
import axios from "axios";

function App() {
    const [pokemonArray, setPokemonArray] = useState([]);
    const [arrayMetaData, setArrayMetaData] = useState({});
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");

    const [ loading, setLoading ] = useState( false )
    const [ error, setError ] = useState( false );

    useEffect(()=> {

        const controller = new AbortController();

        async function fetchEmAll() {
            setLoading( true );
            try {
                setError( false );
                const result = await axios.get(url, {signal: controller.signal});

                setArrayMetaData(result.data);
                setPokemonArray(result.data.results);

            } catch (e) {
                setError( true );
                if(axios.isCancel(e)){
                    console.log('The axios request was cancelled')
                } else {
                    console.error(e)
                }
            }
            setLoading( false );
        }
        fetchEmAll();

        return function cleanup() {
            controller.abort();
        }

    }, [url]);

    return (
        <>
            { loading && <p>Loading...</p> }
            { error && <p>Error: Could not fetch data!</p> }
            <button disabled={arrayMetaData.previous === null} type="button" onClick={() => setUrl(arrayMetaData.previous)}>Vorige</button>
            <button disabled={arrayMetaData.next === null} type="button" onClick={() => setUrl(arrayMetaData.next)}>Volgende</button>
            <ul>
                {pokemonArray &&
                    pokemonArray.map((pokemon) => {
                        return <PokemonCard key={pokemon.name} name={pokemon.name}/>
                    })
                }
            </ul>
        </>
        )
}

export default App;
