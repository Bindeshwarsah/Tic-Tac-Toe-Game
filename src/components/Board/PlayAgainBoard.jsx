import React, { useState } from 'react'
import Board from './Board'
import BoardHeader from './BoardHeader'
const PlayAgainBoard = (refreshIcon,footer) => {
    
  return (
    <div>
        <Board
            refreshIcon={refreshIcon}
            footer={footer}
        />
    </div>
  )
}

export default PlayAgainBoard




