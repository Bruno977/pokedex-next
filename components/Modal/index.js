import Image from "next/image";
import ReactModal from "react-modal";
import React, { useEffect, useRef, useState } from "react";
import { api } from "../../services/api";
import styles from "./Modal.module.css";

function Modal({ name, setIsOpen, modalIsOpen }) {
  const [pokemon, setPokemon] = useState([]);
  const [abilitie, setAbilitie] = useState(false);

  useEffect(() => {
    async function getPokemon() {
      try {
        const response = await api.get(`/pokemon/${name}`);
        const responseType = await api.get(
          `/type/${response.data.types[0].type.name}`
        );

        setPokemon({
          id: response.data.id,
          name: response.data.name,
          type: response.data.types[0].type.name,
          types: response.data.types,
          image: response.data.sprites.other.dream_world.front_default,
          height: response.data.height,
          weight: response.data.weight,
          abilities: response.data.abilities,
          stats: response.data.stats,
          weaknesses: responseType.data.damage_relations.double_damage_from,
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getPokemon();
  }, [name]);

  return (
    <ReactModal
      isOpen={modalIsOpen}
      closeTimeoutMS={200}
      onRequestClose={() => setIsOpen(false)}
      overlayClassName={`${styles.reactModalOverlay}`}
      className={`${styles.reactModalContent} react-modal-content`}
      ariaHideApp={false}
    >
      {pokemon ? (
        <section>
          <div className={styles.closeModal} onClick={() => setIsOpen(false)}>
            <Image
              src="/images/close.svg"
              alt="Fechar"
              width="19"
              height="19"
            />
          </div>
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
                  <img src={`/images/${pokemon.type}.svg`} alt={pokemon.name} />
                </div>
              )}
              {pokemon.image && (
                <div className={styles.imgPokemon}>
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    width="190"
                    height="190"
                  />
                </div>
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
                    <p>Altura</p>
                    <p className="mt-1">{pokemon.height}m</p>
                  </li>
                )}
                {pokemon.weight && (
                  <li>
                    <p>Peso</p>
                    <p className="mt-1">{pokemon.weight}kg</p>
                  </li>
                )}
                {pokemon?.abilities && (
                  <li className="relative">
                    <p className={styles.titleAbilitie}>Habilidades</p>
                    <button
                      type="button"
                      onClick={() => setAbilitie(!abilitie)}
                      className={`${pokemon.type} ${pokemon.type}-color ${styles.abilitiesButton}`}
                    >
                      Ver todos
                    </button>
                    <ul
                      className={`${styles.abilities} ${
                        abilitie ? styles.active : ""
                      }`}
                    >
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
              {pokemon?.weaknesses && (
                <>
                  <p className="text-natural mt-2 mb-1 ">Fraquezas</p>
                  <ul
                    className={`${styles.weaknesses} mt-1 mb-2 flex ai-gc fw-w`}
                  >
                    {pokemon?.weaknesses.map((type) => (
                      <li
                        className={`${type.name} ${type.name}-color`}
                        key={type.name}
                      >
                        {type.name}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {pokemon?.stats && (
                <ul className={`${styles.stats} `}>
                  <p className="text-natural mb-2">Status</p>

                  {pokemon?.stats.map((stat) => (
                    <li className="flex ai-c jc-sb" key={stat.stat.name}>
                      <p className={`${styles.statsName} mr-2`}>
                        {stat.stat.name}
                      </p>
                      <span className={styles.progressBar}>
                        <span
                          className={`${styles.progressBarWidth}`}
                          style={{
                            width: `${stat.base_stat}%`,
                            background: `var(--${pokemon?.type}-color)`,
                          }}
                        ></span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      ) : (
        <p>Loading</p>
      )}
    </ReactModal>
  );
}

export default Modal;
