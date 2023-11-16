import React, { useState } from 'react';
import white_X from "../icons/white-X-logo.svg";
import black_O from "../icons/black-O-logo.svg";
import white_O from "../icons/white_O_image.svg";
import black_X from "../icons/black_X_image.svg";
import styles from "./ToggleBtn.module.css";

const ToggleBtn = ({ onToggle }) => {
  const [activeButton, setActiveButton] = useState(null);

  const handlePlayerBtnClick = (buttonType) => {
    setActiveButton(buttonType);
    onToggle(buttonType);
  };

  return (
    <div className={styles.innerContainer}>
      <h2 className={styles.heading}>PICK PLAYER </h2>
      <div className={styles.pickPlayer}>
        <div
          className={`${styles.player} ${styles.x} ${activeButton === 'X' ? styles.activeButton : ''}`}
          onClick={() => handlePlayerBtnClick('X')}
        >
          <img
            src={activeButton === 'X' ? black_X : white_X}
            className={styles.playerBtn}
            alt="btn images"
          />
          <span style={{ color: activeButton === 'X' ? 'black' : 'white' }}></span>
        </div>
        <div
          className={`${styles.player} ${styles.o} ${activeButton === 'O' ? styles.activeButton : ''}`}
          onClick={() => handlePlayerBtnClick('O')}
        >
          <img
            src={activeButton === 'O' ? black_O : white_O}
            className={styles.playerBtn}
            alt="btn images"
          />
          <span style={{ color: activeButton === 'O' ? 'black' : 'white' }}></span>
        </div>
      </div>
    </div>
  );
};

export default ToggleBtn;




