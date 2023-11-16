import React, { useState, useEffect } from 'react';
import styles from "./Board.module.css"
import BoardHeader from './BoardHeader';
import BoardFooter from './BoardFooter';
import BoardBody from './BoardBody';
import QuitModal from '../Modal/QuitModal';
import WinLossModal from '../Modal/WinLossModal';

const Board = ({ refreshIcon, footer }) => {
  // State for the game board
  const [board, setBoard] = useState(Array(9).fill(null));

  // State for the current player (either 'HUMAN' or 'PC')
  const [currentPlayer, setCurrentPlayer] = useState('HUMAN');

  // State for the player's symbol ('X' or 'O')
  const [playerSymbol, setPlayerSymbol] = useState("X");

  // State for game scores (number of wins for HUMAN, PC, and ties)
  const [scores, setScores] = useState({ human: 0, pc: 0, ties: 0 });

  // State to track whether the game is over
  const [gameOver, setGameOver] = useState(false);

  // State to control the display of the Quit Modal
  const [showQuitModal, setShowQuitModal] = useState(false);

  // State to control the display of the Win/Loss Modal
  const [showWinLossModal, setShowWinLossModal] = useState(false);

  // State to store the result of the game for the Win/Loss Modal
  const [winLossResult, setWinLossResult] = useState(null);

  // useEffect hook to initialize the game state from local storage
  useEffect(() => {
    // Retrieve the player's choice from local storage (default to 'X' if not present)
    const storedChoice = localStorage.getItem('playerChoice') || 'X';
    setPlayerSymbol(storedChoice);

    // Set the current player based on the player's choice
    setCurrentPlayer(storedChoice === 'X' ? 'HUMAN' : 'PC');

    // Retrieve the game board from local storage (default to an empty board if not present)
    const storedBoard = JSON.parse(localStorage.getItem('board')) || Array(9).fill(null);
    setBoard(storedBoard);

    // Retrieve the game scores from session storage (default to zeros if not present)
    const storedScores = JSON.parse(sessionStorage.getItem('scores')) || { human: 0, pc: 0, ties: 0 };
    setScores(storedScores);
  }, []);

  // Function to switch the current player between 'HUMAN' and 'PC'
  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === 'HUMAN' ? 'PC' : 'HUMAN');
  };

  // Function to handle the user's move
  const handleUserMove = (index) => {
    // Check if the game is not over, the selected cell is empty, and it's the human player's turn
    if (!gameOver && board[index] === null && currentPlayer === 'HUMAN') {
      // Update the game board with the user's move
      const updatedBoard = [...board];
      updatedBoard[index] = playerSymbol;
      setBoard(updatedBoard);

      // Check the result of the game after the user's move
      const gameResult = checkGameResult(updatedBoard);

      // Handle the game result (update scores and show modal if necessary)
      handleGameResult(gameResult);

      // Switch to the next player (PC)
      switchPlayer();

      // Save the updated board to local storage
      localStorage.setItem('board', JSON.stringify(updatedBoard));
    }
  };

  // Array representing the winning conditions for the game
  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  // Function to find a potential winning move for a player
  const findPotentialWinningMove = (currentBoard, symbol) => {
    for (const condition of winningConditions) {
      const [a, b, c] = condition;
      const cells = [currentBoard[a], currentBoard[b], currentBoard[c]];

      // Check if there is one empty cell and two cells with the player's symbol
      if (cells.filter(cell => cell === null).length === 1 && cells.filter(cell => cell === symbol).length === 2) {
        // Return the index of the empty cell to complete the winning move
        return condition.find(index => currentBoard[index] === null);
      }
    }
    return null;
  };

  // Function to handle the PC's move
  const handlePcMove = () => {
    if (!gameOver && currentPlayer === 'PC') {
      setTimeout(() => {
        // Find empty spots on the board
        const emptySpots = board.reduce((acc, cell, index) => (cell === null ? [...acc, index] : acc), []);

        // Check for a potential winning move for PC
        const pcWinningMove = findPotentialWinningMove(board, 'O');
        if (pcWinningMove !== null) return makePcMove(pcWinningMove);

        // Check for a potential winning move for the human and block it
        const humanBlockingMove = findPotentialWinningMove(board, 'X');
        if (humanBlockingMove !== null) return makePcMove(humanBlockingMove);

        // If human chooses the center, PC should choose any corner
        const centerIndex = 4;
        if (board[centerIndex] === 'X') {
          const availableCorners = [0, 2, 6, 8].filter(corner => board[corner] === null);
          if (availableCorners.length > 0) return makePcMove(availableCorners[Math.floor(Math.random() * availableCorners.length)]);
        }

        // If human chooses a corner, PC should choose the center
        const chosenCorner = [0, 2, 6, 8].find(corner => board[corner] === 'X');
        if (chosenCorner !== undefined) {
          const pcCenterMove = centerIndex;
          if (board[pcCenterMove] === null) return makePcMove(pcCenterMove);
        }

        // If not strategic moves available, make a random move
        const randomIndex = Math.floor(Math.random() * emptySpots.length);
        makePcMove(emptySpots[randomIndex]);
      }, 1000);
    }
  };

  // Function to make the PC's move on the board
  const makePcMove = (index) => {
    const updatedBoard = [...board];
    updatedBoard[index] = 'O';
    setBoard(updatedBoard);

    // Check the result of the game after the PC's move
    const gameResult = checkGameResult(updatedBoard);

    // Handle the game result (update scores and show modal if necessary)
    handleGameResult(gameResult);

    // Switch to the next player (HUMAN)
    setCurrentPlayer('HUMAN');

    // Save the updated board to local storage
    localStorage.setItem('board', JSON.stringify(updatedBoard));
  };

  // Function to check the result of the game
  const checkGameResult = (currentBoard) => {
    for (const condition of winningConditions) {
      const [a, b, c] = condition;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        // If a winning condition is met, set the game as over and return the winning symbol ('X' or 'O')
        setGameOver(true);
        return currentBoard[a];
      }
    }

    // If there are no empty cells left, set the game as over and return 'TIE'
    if (!currentBoard.includes(null)) {
      setGameOver(true);
      return 'TIE';
    }

    // If no winner yet, return null
    return null;
  };

  // Function to handle the result of the game
  const handleGameResult = (result) => {
    // If the result is 'X', 'O', or 'TIE', show the Win/Loss Modal
    if (result === 'X' || result === 'O' || result === 'TIE') {
      setShowWinLossModal(true);
      setWinLossResult(result);
    }

    // Function to update the scores based on the result
    const updateScores = (key) => {
      setScores((prevScores) => {
        const newScores = { ...prevScores, [key]: prevScores[key] + 1 };
        localStorage.setItem('scores', JSON.stringify(newScores));
        return newScores;
      });
    };

    // Update scores based on the result
    if (result === 'X') updateScores('human');
    else if (result === 'O') updateScores('pc');
    else if (result === 'TIE') updateScores('ties');
  };

  // Function to handle the close event of the Quit Modal
  const handleModalClose = () => setShowQuitModal(false);

  // Function to handle the close event of the Win/Loss Modal
  const handleWinLossModalClose = () => {
    setShowWinLossModal(false);
    setWinLossResult(null);
  };

  // useEffect hook to trigger the PC's move when the current player changes
  useEffect(() => {
    handlePcMove();
  }, [currentPlayer]);

  // useEffect hook to update scores from local storage on component mount
  useEffect(() => {
    const storedScores = localStorage.getItem('scores');
    if (storedScores) setScores(JSON.parse(storedScores));
  }, []);

  // useEffect hook to save the player's choice to local storage when it changes
  useEffect(() => {
    localStorage.setItem('playerChoice', playerSymbol);
  }, [playerSymbol]);

  // Render the game board UI
  return (
    <div className={styles.boardContainer}>
      {/* Board Header Component */}
      <div className={styles.boardHeader}>
        <BoardHeader currentPlayer={currentPlayer} refreshIcon={refreshIcon} setScores={setScores} />
      </div>

      {/* Board Body Component */}
      <div className={styles.boardBody}>
        <BoardBody boardBody={board} handleUserMove={handleUserMove} playerSymbol={playerSymbol} />
      </div>

      {/* Optional Board Footer Component */}
      {footer && (
        <div>
          <BoardFooter footer={footer} scores={scores} />
        </div>
      )}

      {/* Quit Modal Component */}
      {showQuitModal && <QuitModal onClose={handleModalClose} setScores={setScores} />}

      {/* Win/Loss Modal Component */}
      {showWinLossModal && (
        <WinLossModal result={winLossResult} onClose={handleWinLossModalClose} setScores={setScores} />
      )}
    </div>
  );
};

export default Board;
