import React, { useState } from "react";
import "./Card.css";
import { backgroundColor, lightBackgroundColor } from "./BackgroundColor";

function PokemonCard({ pokemonList, searchValue, handleClickParent }) {
  //using Hook to change the value when the user is hovering on a card
  const [IsHovering, setIsHovering] = useState(-1);

  //Function to send info to parent component for the modal component
  const handleClick = (pokemon) => {
    handleClickParent(pokemon);
  };

  //Id format
  const pokemonId = (id) => {
    if (id < 10) return "00" + id;
    else if (id < 100) return "0" + id;
    else return id;
  };

  return (
    <div className="rowCard">
      {pokemonList
        .filter((pokemon) => {
          return pokemon.name.match(searchValue);
        })
        .map((pokemon, i) => {
          return (
            <div
              key={i}
              style={{
                background: backgroundColor[pokemon.types[0].type.name],
              }}
              className={`cardPokemon ${
                IsHovering === i ? "hoveringCard" : ""
              }`}
              onMouseEnter={() => setIsHovering(i)}
              onMouseLeave={() => setIsHovering(-1)}
              onClick={() => handleClick(pokemon)}
            >
              <div style={{ alignSelf: "end", marginRight: "10px" }}>
                #{pokemonId(pokemon.id)}
              </div>
              <img
                alt="pokemonImg"
                className="imgPokemon"
                style={{
                  backgroundColor:
                    lightBackgroundColor[pokemon.types[0].type.name],
                }}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              ></img>
              <h5>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h5>
              <div style={{ display: "flex", flexDirection: "row" }}>
                {pokemon.types.map((type) => {
                  return (
                    <h6 style={{ marginRight: "5px" }}>
                      {type.type.name.charAt(0).toUpperCase() +
                        type.type.name.slice(1)}
                    </h6>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default PokemonCard;
