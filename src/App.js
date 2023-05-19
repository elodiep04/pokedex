import "./App.css";
import React, { useState, useEffect } from "react";
import PokemonCard from "./component/PokemonCard";
import PokemonModal from "./component/PokemonModal";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const [findPokemon, setFindPokemon] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pokemonInfos, setPokemonInfos] = useState(null);

  //Function for API Call
  const searchPokemon = async () => {
    const rawData = await fetch(loadMore);
    const data1 = await rawData.json();

    setLoadMore(data1.next);

    const data2 = await Promise.all(
      data1.results.map((data) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${data.name}`).then((data) =>
          data.json()
        )
      )
    );
    setPokemonList([...pokemonList, data2].flat());
  };

  //Setting new value when the user clicked on card to show Modal
  const getData = (pokemon) => {
    setShowModal(true);
    setPokemonInfos(pokemon);
  };

  //Close Modal
  const closeModal = () => {
    setShowModal(false);
  };

  //Initialize component
  useEffect(() => {
    searchPokemon();
  }, []);

  return (
    <div className="appContainer">
      <div className="appLogo">
        <img className="logo" alt="logo" src="/pokemonlogo.png" />
      </div>

      <div className="appSearchBar">
        <input
          placeholder="...Search"
          type="search"
          onChange={(e) => setFindPokemon(e.target.value)}
          value={findPokemon}
        ></input>
      </div>
      <PokemonCard
        pokemonList={pokemonList}
        searchValue={findPokemon}
        handleClickParent={getData}
      />
      {showModal ? (
        <PokemonModal
          infosPokemon={pokemonInfos}
          openModal={showModal}
          hideModal={closeModal}
        />
      ) : null}
      <div className="footer">
        <button onClick={() => searchPokemon()}>Load more ...</button>
      </div>
    </div>
  );
}
export default App;
