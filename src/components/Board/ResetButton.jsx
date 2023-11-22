import React from 'react';
import Board from './Board';

const ResetButton = ({ onReset }) => {
  const handleResetClick = () => {
    // Reset local storage values to null
    localStorage.setItem('playerChoice', null);
    localStorage.setItem('board', null);

    // Trigger the onReset function to inform the parent component
    onReset();
  };
  
  return ;
};
  
  export default ResetButton;