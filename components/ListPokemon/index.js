import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppProvider } from "../../context/AppContext";
import { usePokemons } from "../../context/PokemonsContext";
import { api } from "../../services/api";
import Modal from "../Modal";
import Pagination from "../Pagination";
import Search from "../Search";

import styles from "./ListPokemon.module.css";

function ListPokemon() {
  const {
    pokemons,
    setCurrentPage,
    nextPage,
    prevPage,
    hidePagination,
    countPokemons,
  } = usePokemons();
  const { loading, setLoading } = useAppProvider();
  const [listPokemons, setListPokemons] = useState([]);

  const [activeModal, setActiveModal] = useState(false);
  const [pokemonModal, setPokemonModal] = useState("");

  function handleClickShowPokemon(pokemon) {
    setPokemonModal(pokemon);
    setActiveModal(true);
  }

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
    <>
      <ul className={styles.grid}>
        {loading ? (
          <li className="">
            <Image
              src="/images/loading.svg"
              alt="Loading"
              width="80"
              height="80"
            />
          </li>
        ) : (
          <>
            {listPokemons.length ? (
              <>
                <div className={`${styles.countPokemons} columns md-gap`}>
                  {countPokemons && (
                    <div className={`$ flex ai-c col-md-8 col-sm-12`}>
                      <Image
                        src="/images/icon-poke-red.svg"
                        alt="Pokemons"
                        width="20"
                        height="20"
                      />
                      <p className="pl-1">{countPokemons} Pokémons</p>
                    </div>
                  )}
                  <div className="col-md-4 col-sm-12">
                    <Search />
                  </div>
                </div>
                {listPokemons.map((pokemon) => (
                  <li
                    key={pokemon.id}
                    className={`${styles.card}`}
                    onClick={() => handleClickShowPokemon(pokemon.name)}
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
              </>
            ) : (
              <p>Nenhum pokemon encontrado</p>
            )}
            {listPokemons && (
              <>
                {!hidePagination && (
                  <div className={`${styles.pagination} text-center`}>
                    <div className="mt-2">
                      <Pagination
                        handleClickNext={() => setCurrentPage(nextPage)}
                        handleClickPrev={() => setCurrentPage(prevPage)}
                        nextPage={nextPage}
                        prevPage={prevPage}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </ul>
      {activeModal && (
        <Modal
          name={pokemonModal}
          setActiveModal={setActiveModal}
          activeModal={activeModal}
        />
      )}
    </>
  );
}

export default ListPokemon;
