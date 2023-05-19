import "./Modal.css";
import React from "react";
import { lightBackgroundColor } from "./BackgroundColor";

function PokemonModal({ infosPokemon, hideModal }) {
  //Pokemon's name format
  const uppercaseName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <img
          alt="pokemonImg"
          className="modalImage"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${infosPokemon.id}.png`}
        />
        <div
          className="modalTitle"
          style={{
            backgroundColor:
              lightBackgroundColor[infosPokemon.types[0].type.name],
          }}
        >
          <span>{uppercaseName(infosPokemon.name)}</span>
        </div>
        <div className="modalStats">
          {infosPokemon.stats.map((stat) => {
            return (
              <div>
                {stat.stat.name.toUpperCase()} :
                <span style={{ marginLeft: "5px" }}>{stat.base_stat}</span>
                <div
                  className="modalStatBar"
                  style={{ width: "80%", backgroundColor: "#f1f2f6" }}
                >
                  <div
                    className="modalStatBar"
                    style={{
                      width: stat.base_stat,
                      backgroundColor:
                        lightBackgroundColor[infosPokemon.types[0].type.name],
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
          <div className="modalTypes">
            TYPES :
            {infosPokemon.types.map((element) => {
              return (
                <div className="typesElement">
                  <span>{uppercaseName(element.type.name)}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="footer">
          <button onClick={() => hideModal()}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;
