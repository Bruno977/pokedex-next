import React from "react";
import styles from "./Modal.module.css";

function Modal({ pokemon }) {
  return (
    <section className={styles.modal}>
      <div className={styles.modalContent}>{pokemon}</div>
    </section>
  );
}

export default Modal;
