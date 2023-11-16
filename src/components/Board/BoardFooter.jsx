import React from 'react';
import styles from "./BoardFooter.module.css";

const BoardFooter = ({ footer, scores }) => {
  return (
    <div className={styles.footer}>

      <div className={styles.user}>
        <span>X (YOU)</span>
        <h2>{scores.human}</h2>
      </div>
      <div className={styles.ties}>
        <span>TIES</span>
        <h2>{scores.ties}</h2>
      </div>
      <div className={styles.cpu}>
        <span>O (CPU)</span>
        <h2>{scores.pc}</h2>
      </div>

    </div>
  );
};

export default BoardFooter;
