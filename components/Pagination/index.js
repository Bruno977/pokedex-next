import React from "react";
import styles from "./Pagination.module.css";

function Pagination({ handleClickNext, handleClickPrev, nextPage, prevPage }) {
  return (
    <>
      <button
        type="button"
        className={styles.button}
        onClick={handleClickPrev}
        disabled={!prevPage}
      >
        Anterior
      </button>
      <button
        type="button"
        className={styles.button}
        onClick={handleClickNext}
        disabled={!nextPage}
      >
        Proximo
      </button>
    </>
  );
}

export default Pagination;
