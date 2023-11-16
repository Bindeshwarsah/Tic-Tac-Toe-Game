import React, { useState } from 'react'
import styles from "./BoardHeader.module.css"
import largeX from "../icons/aqua-X-logo.svg";
import largeO from "../icons/yellow-O-logo.svg";
import smallX from "../icons/xTurn.svg";
import smallO from "../icons/oTurn.svg";
import refreshLogo from "../icons/refresh_icon.svg"
import QuitModal from '../Modal/QuitModal';
const BoardHeader = ({currentPlayer,refreshIcon,setScores}) => {
  const [showQuitModal, setShowQuitModal] = useState(false);

  const onRefreshClick = () => {
    setShowQuitModal(true);
  };

  const handleModalClose = () => {
    setShowQuitModal(false);
  };
  
  return (
    <div className={styles.boardHeader}>
        <div className={styles.logo}>
            <img src={largeX} alt="logoX"  className={styles.largeImage}/>
            <img src={largeO} alt="logoO" className={styles.largeImage} />

        </div>
        <div className={styles.btn}>
            {currentPlayer === 'HUMAN' ? (
                <img src={smallX} alt="xTurn" className={styles.xTurn} />
              ) : (
                <img src={smallO} alt="oTurn" className={styles.oTurn} />
              )}
              <span className={styles.btnText}>turn</span>

        </div>
          {refreshIcon && 
          <div className={styles.refreshIcon} onClick={onRefreshClick} >
            <img src={refreshLogo} alt="refreshLogo" className={styles.refreshLogo}/>
          </div>
          }
          
      {showQuitModal && <QuitModal onClose={handleModalClose} setScores={setScores}/>}
        </div>

  )
}

export default BoardHeader;






