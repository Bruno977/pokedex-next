import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePokemons } from "../../context/PokemonsContext";
import { api } from "../../services/api";
import Pagination from "../Pagination";

import styles from "./ListPokemon.module.css";

function ListPokemon() {
  const {
    pokemons,
    setPokemons,
    currentPage,
    setCurrentPage,
    nextPage,
    setNextPage,
    prevPage,
    setPrevPage,
  } = usePokemons();
  const [listPokemons, setListPokemons] = useState([]);

  const [loading, setLoading] = useState(false);

  // async function getPokemons() {
  //   const response = await api.get(currentPage);
  //   setNextPage(response.data.next);
  //   setPrevPage(response.data.previous);
  //   const pokemonsName = response.data.results.map((pokemon) => {
  //     return pokemon.name;
  //   });
  //   setPokemons(pokemonsName);
  // }

  // useEffect(() => {
  //   getPokemons();
  // }, [currentPage]);

  useEffect(() => {
    setLoading(true);
    async function getDetailsPokemons() {
      const pokemonsName = await Promise.all(
        pokemons.map(async (pokemon) => {
          const responsePokemons = await api.get(`/pokemon/${pokemon}`);
          return {
            id: responsePokemons.data.id,
            name: responsePokemons.data.name,
            type: responsePokemons.data.types[0].type.name,
            img: responsePokemons.data.sprites.other.dream_world.front_default,
            imgDefault: responsePokemons.data.sprites.front_default,
          };
        })
      );

      setListPokemons(pokemonsName);
      setLoading(false);
    }

    getDetailsPokemons();
  }, [pokemons]);

  return (
    <ul className="columns sm-gap">
      {loading ? (
        <li className="col-md-12 col-sm-12">
          <Image
            src="/images/loading.svg"
            alt="Loading"
            width="80"
            height="80"
          />
        </li>
      ) : (
        <>
          {listPokemons && (
            <>
              {listPokemons.map((pokemon) => (
                <li
                  key={pokemon.id}
                  className={`${styles.card} col-md-4 col-sm-12 `}
                >
                  <div className={`${styles.img} ${pokemon.type}`}>
                    {pokemon.img && (
                      <Image
                        src={pokemon.img}
                        alt={pokemon.type}
                        width="120"
                        height="120"
                      />
                    )}
                    {pokemon.img === null && pokemon.imgDefault && (
                      <Image
                        src={pokemon.imgDefault && pokemon.imgDefault}
                        alt={pokemon.type}
                        width="96"
                        height="96"
                        objectFit="cover"
                      />
                    )}
                  </div>
                  <div className="flex ai-fe jc-sb ">
                    <div className={styles.nameID}>
                      <p>#{pokemon.id}</p>
                      <p>{pokemon.name}</p>
                    </div>
                    <img
                      src={`/images/${pokemon.type}.svg`}
                      alt={pokemon.type}
                    />
                  </div>
                </li>
              ))}
              <div className="col-md-4 col-sm-12 text-center ">
                <div className="mt-2">
                  <Pagination
                    handleClickNext={() => setCurrentPage(nextPage)}
                    handleClickPrev={() => setCurrentPage(prevPage)}
                    nextPage={nextPage}
                    prevPage={prevPage}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </ul>
  );
}

export default ListPokemon;
