import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [allPokemons, setAllPokemons] = useState([]); 
  const [pokemons, setPokemons] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 


  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151') 
      .then(function (response) {
        setAllPokemons(response.data.results); 
        setPokemons(response.data.results); 
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  
  const obtenerPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
      .then(function (response) {
        console.log(response.data);
        setPokemons([response.data]); 
      })
      .catch(function (error) {
        console.log(error);
      });
  };

 
  const mostrarTodosLosPokemones = () => {
    setPokemons(allPokemons);
  };

  return (
    <>
      <div className='head'>
        <div className='search'>
          <input
            placeholder="Ingrese el Nombre del pokemon"
            onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
          <button onClick={obtenerPokemon}>Buscar</button>
          <button onClick={mostrarTodosLosPokemones}>Mostrar Todos</button>
        </div>
      </div>
      <div className="cardDiv">
        {pokemons.map((pokemon, index) => (
          <div key={index} className="card">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} alt={`Imagen de ${pokemon.name}`} />
            <h1>{pokemon.name}</h1>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;