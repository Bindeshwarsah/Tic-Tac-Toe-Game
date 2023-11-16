import React, { useState } from 'react';
import styles from "./QuitModal.module.css";
import ResetButton from '../Board/ResetButton';

const QuitModal = ({ onClose, setScores }) => {
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

  const handlePlayAgainBtn = () => {
    localStorage.removeItem('board');
    onClose(false); // Call the callback function provided by the parent to hide the modal

    window.location.reload();
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalInnerContainer}>
        <div className={styles.heading}>
          <h3>Do you want to quit?</h3>
        </div>
        <div className={styles.btn}>
          <button className={`${styles.PlayAgain} ${styles.Btn}`} onClick={handlePlayAgainBtn}>
            Play Again
          </button>
          <button className={`${styles.Quit} ${styles.Btn}`} onClick={handleReset}>
            Quit
          </button>
        </div>
        <ResetButton onReset={handleReset} />
      </div>
    </div>
  );
};

export default QuitModal;
