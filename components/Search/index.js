import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePokemons } from "../../context/PokemonsContext";
import { api } from "../../services/api";
import styles from "./Search.module.css";

function Search() {
  const [pokemonSearch, setPokemonSearch] = useState([]);
  const { setPokemons } = usePokemons();
  const [search, setSearch] = useState("");

  async function handleClick() {
    // setPokemons(search);
    console.log(search);
    //   try {
    //     const reponse = await api.get(`pokemon/${search}`);
    //     console.log(reponse.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
  }

  return (
    <form
      className={`${styles.form} relative`}
      onSubmit={(e) => handleClick(e.preventDefault())}
    >
      <input
        type="text"
        placeholder="Buscar nome ou id"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button>
        <Image src="/images/lupa.svg" alt="Buscar" width="18" height="19" />
      </button>
    </form>
  );
}

export default Search;
