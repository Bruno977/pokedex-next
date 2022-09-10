import Image from "next/image";
import React, { useState } from "react";
import { usePokemons } from "../../context/PokemonsContext";
import styles from "./Search.module.css";

function Search() {
  const { setPokemons, setHidePagination } = usePokemons();
  const [search, setSearch] = useState("");

  async function handleClick() {
    setPokemons([search]);
    setHidePagination(true);
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
