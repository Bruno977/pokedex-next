import Image from "next/image";
import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import styles from "./Modal.module.css";

function Modal({ name }) {
  const [pokemon, setPokemon] = useState([]);
  useEffect(() => {
    async function getPokemon() {
      try {
        const response = await api.get(`/pokemon/${name}`);
        setPokemon({
          id: response.data.id,
          name: response.data.name,
          type: response.data.types[0].type.name,
          types: response.data.types,
          image: response.data.sprites.other.dream_world.front_default,
          height: response.data.height,
          weight: response.data.weight,
          abilities: response.data.abilities,
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPokemon();
  }, [name]);
  return (
    <>
      {pokemon ? (
        <section className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.grid}>
              <div
                className={`${styles.containerImage}`}
                style={{
                  background:
                    pokemon.type &&
                    ` url(/images/bg-${pokemon.type}.svg) center center / cover no-repeat`,
                }}
              >
                {pokemon.type && (
                  <div className={styles.type}>
                    <img
                      src={`/images/${pokemon.type}.svg`}
                      alt={pokemon.name}
                    />
                  </div>
                )}
                {pokemon.image && (
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    width="190"
                    height="190"
                  />
                )}
              </div>

              <div className={styles.contentPokemon}>
                <h2 className={styles.title}>
                  {pokemon?.name} <span>#{pokemon?.id}</span>
                </h2>
                {pokemon?.types && (
                  <ul className={`${styles.types} flex ai-gc pt-1 pb-2`}>
                    {pokemon?.types.map((type) => (
                      <li
                        key={type?.slot}
                        className={`${type?.type?.name} ${type?.type?.name}-color`}
                      >
                        {type?.type?.name}
                      </li>
                    ))}
                  </ul>
                )}
                <ul className={`${styles.attributes} flex ai-c jc-sb`}>
                  {pokemon.height && (
                    <li>
                      <p>Height</p>
                      <p>{pokemon.height}m</p>
                    </li>
                  )}
                  {pokemon.weight && (
                    <li>
                      <p>Weight</p>
                      <p>{pokemon.weight}kg</p>
                    </li>
                  )}
                  {pokemon?.abilities && (
                    <li>
                      <p>Abilities</p>
                      <ul className={`${styles.abilities}`}>
                        {pokemon?.abilities.map((abilitie) => (
                          <li
                            key={abilitie?.ability.name}
                            className={`${pokemon.type} ${pokemon.type}-color`}
                          >
                            {abilitie?.ability.name}
                          </li>
                        ))}
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}

export default Modal;
