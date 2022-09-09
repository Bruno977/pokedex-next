import React, { createContext, useContext, useState } from "react";

const PokemonsContext = createContext([]);

export function PokemonsProvider({ children }) {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState("/pokemon?offset=0&limit=9");

  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();

  const [hidePagination, setHidePagination] = useState(false);

  const [countPokemons, setCountPokemons] = useState(false);

  return (
    <PokemonsContext.Provider
      value={{
        pokemons,
        setPokemons,
        currentPage,
        setCurrentPage,
        nextPage,
        setNextPage,
        prevPage,
        setPrevPage,
        hidePagination,
        setHidePagination,
        setCountPokemons,
        countPokemons,
      }}
    >
      {children}
    </PokemonsContext.Provider>
  );
}

export function usePokemons() {
  const context = useContext(PokemonsContext);
  return context;
}
