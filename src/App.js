import noPokemon from './assets/pokeball.png';
import './App.css';
import { useEffect, useState, useRef } from 'react';
import Swal from 'sweetalert2';
//import withReactContent from 'sweetalert2-react-content';
//const MySwal = withReactContent(Swal);

function App() {
  const [pokemon, setPokemon] = useState({});
  let state = pokemon?.id ?? 0;
  const inputRef = useRef();
  



  const fetchPokemon = (id) => {
    if (id === 0) {
      
    } else {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
        .then((data) => setPokemon(data));
    }
  }

  const fetchPokemonByName = (name) => {
    let mid = parseInt(name);
    if(mid === parseInt(name) && mid > 898){
      Swal.fire({ title: 'Pokemon Not Found!', text: "For 2022, there are only 898 Pokemons...", icon: 'warning' });
    }else if( mid === parseInt(name)){
      state = mid;
      fetchPokemon(state);
    }else{
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .catch((err) => (Swal.fire({ title: 'Pokemon Not Found!', text: 'Are you sure this Pokemon exists?', icon: 'error' })));
    }
  }

  const UpdatePokemon = (name) => {
    fetchPokemonByName(name);
    state = parseInt(pokemon.id);
    
  }

  const BackPokemon = () => {
    state --;
    if (state <= 0) { state = 898; }
    return state;
  }

  const NextPokemon = () => {
    state ++;
    if (state > 898) { state = 1; }
    return state;
  }

  const showAbilities = () => {
    if (pokemon.name) {
      Swal.fire({
        imageUrl: `${pokemon.sprites.front_default}`,
        title: "Abilities",
        text: `${pokemon.abilities.map(ab => { return '\n' + ab.ability.name })}`,
      })
    } else {
      Swal.fire({
        title: `No Pokemon!`,
        icon: 'warning'
      });
    }
  }

  const getRandomInt = (min = 1, max = 898) => {
    state = Math.floor(Math.random() * (max - min) + min);
    return state;
  }


  useEffect(() => {
    fetchPokemon(state);
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <div className='flex-container'>
          <input type="text" placeholder="Search by Name or ID (Number)" ref={inputRef}></input>
          <button onClick={() => UpdatePokemon(inputRef.current.value)} className='button'>Search</button>
        </div>
        <div className='flex-container'>
          <img src={pokemon?.sprites?.front_default ?? noPokemon} className="poke-image" alt="logo" />
          <img src={pokemon?.sprites?.back_default ?? noPokemon} className="poke-image" alt="logo" />
        </div>

        <p>
          {pokemon?.name ?? "No pokemon Detected"}
        </p>

        <p>
          {pokemon?.id ?? "No Pokemon ID"}
        </p>
        <p><a href='https://github.com/rodrilv/Pokemon-React-App'>GitHub Repo ;)</a></p>

        <div className='flex-container'>
          <button onClick={() => fetchPokemon((BackPokemon()))} className='button'>Back</button>
          <button onClick={() => fetchPokemon(getRandomInt())} className='button'>Random</button>
          <button onClick={() => fetchPokemon(NextPokemon())} className='button'>Next</button>
          <button onClick={() => showAbilities()} className='button'>Abilities</button>
        </div>
      </header>
    </div>
  );
}

export default App;
