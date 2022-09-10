import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Sidebar.module.css";
import { usePokemons } from "../../context/PokemonsContext";
import { api } from "../../services/api";
import { useAppProvider } from "../../context/AppContext";

function Sidebar({ types }) {
  const {
    setPokemons,
    currentPage,
    setNextPage,
    setPrevPage,
    setHidePagination,
    setCountPokemons,
  } = usePokemons();
  const { loading, setLoading } = useAppProvider();

  const [active, setActive] = useState(false);
  const ref = useRef([]);

  async function handleClick(type, event) {
    setLoading(true);
    if (ref) {
      for (let item of ref.current) {
        item.classList.remove(styles.typeActive);
      }
    }
    try {
      const response = await api.get(`type/${type}`);
      const pokemonsName = response.data.pokemon.map((pokemon) => {
        return pokemon.pokemon.name;
      });
      setPokemons(pokemonsName);
      setActive(false);
      event.classList.add(styles.typeActive);
      setHidePagination(true);
      setCountPokemons(pokemonsName.length);
    } catch (error) {
      console.log(error);
    }
  }

  async function getPokemons() {
    if (ref) {
      for (let item of ref.current) {
        item.classList.remove(styles.typeActive);
      }
    }
    try {
      const response = await api.get(currentPage);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
      setCountPokemons(response.data.count);
      const pokemonsName = response.data.results.map((pokemon) => {
        return pokemon.name;
      });
      setPokemons(pokemonsName);
      setActive(true);
      setHidePagination(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPokemons();
  }, [currentPage]);

  return (
    <aside className={styles.sidebar}>
      {types ? (
        <ul>
          <li
            onClick={() => getPokemons()}
            className={`${active ? styles.typeActive : ""} ${
              styles.allPokemons
            }`}
          >
            <Image
              src={`/images/icon-all.svg`}
              alt="Todos pokemons"
              width="16"
              height="16"
            />
            <span>Todos</span>
          </li>
          {types.map((type, index) => (
            <li
              key={type.name}
              onMouseEnter={(e) => e.currentTarget.classList.add(styles.active)}
              onMouseLeave={(e) =>
                e.currentTarget.classList.remove(styles.active)
              }
              className={`${type.name}-color`}
              onClick={(event) => handleClick(type.name, event.currentTarget)}
              ref={(el) => (ref.current[index] = el)}
            >
              <Image
                src={`/images/${type.name}.svg`}
                alt={type.name}
                width="16"
                height="16"
              />
              <span>{type.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum tipo encontrado</p>
      )}
    </aside>
  );
}

export default Sidebar;
