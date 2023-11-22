import React, { useState } from 'react';
import styles from "./WinLossModal.module.css";
import ResetButton from '../Board/ResetButton';
import O_image from "../icons/yellow-O-logo.svg";
import X_image from "../icons/aqua-X-logo.svg"

const WinLossModal = ({ onClose, setScores, result,clearBoard }) => {
  const [scores, setLocalScores] = useState({
    human: 0,
    pc: 0,
    ties: 0,
  });

  const handleReset = () => {
    // Reset localStorage
    localStorage.removeItem('board');
    localStorage.removeItem('playerChoice');

    // Refresh the window to reflect the changes
    window.location.reload();
    window.history.back();

    // Reset scores in state
    setLocalScores({
      human: 0,
      pc: 0,
      ties: 0,
    });

    // Save scores to local storage
    localStorage.setItem('scores', JSON.stringify({
      human: 0,
      pc: 0,
      ties: 0,
    }));

    // Update scores in the parent component's state
    setScores({
      human: 0,
      pc: 0,
      ties: 0,
    });
  };

  const handleNextRoundBtn = () => {
    localStorage.removeItem('board');
    onClose(false); // Call the callback function provided by the parent to hide the modal

    // window.location.reload();
    if (typeof clearBoard === 'function') {
      console.log('Calling clearBoard');
      clearBoard()
  }
  };

  const getResultText = () => {
    switch (result) {
      case 'X':
        return 'YOU WON!';
      case 'O':
        return 'CPU WON!';
      case 'TIE':
        return 'TIE!';
      default:
        return '';
    }
  };

  const getRoundText = () => {
    switch (result) {
      case 'X':
        return(
          <div className={styles.O_logo}>
            <img src={O_image} alt="O_logo" className={styles.O_size}  />
            <span>TAKES THE ROUND</span>
          </div>
        );
      case 'O':
        return (
          <div className={styles.X_logo}>
            <img src={X_image} alt="X_logo" className={styles.X_size} />
            <span>TAKES THE ROUND</span>
          </div>
        );
      case 'TIE':
        return 'TRY AGAIN';
      default:
        return '';
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalInnerContainer}>
        <span className={styles.result}>{getResultText()}</span>
        <div className={styles.heading}>
          <h3>{getRoundText()}</h3>
        </div>
        <div className={styles.btn}>
          <button className={`${styles.Quit} ${styles.Btn}`} onClick={handleReset}>
            Quit
          </button>
          <button className={`${styles.PlayAgain} ${styles.Btn}`} onClick={handleNextRoundBtn}>
            Next Round
          </button>
        </div>
        <ResetButton onReset={handleReset} />
      </div>
    </div>
  );
};

export default WinLossModal;
