import React from 'react'
import styles from "./BoardBody.module.css"
import X from "../icons/Board_X_img.svg"
import O from "../icons/Board_O_img.svg";

const BoardBody = ({ boardBody,handleUserMove,playerSymbol}) => {
    return (
        <div className={styles.boardCard}>
          {boardBody.map((cell, index) => (
            <div key={index} className={styles.cell} onClick={()=>handleUserMove(index)} >
            {cell === 'X' && <img src={X} alt="X" className={styles.boardX} />}
            {cell === 'O' && <img src={O} alt="O" className={styles.boardO} />}
            </div>
          ))}
        </div>
      );
}

export default BoardBody
