import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import styles from "./Start.module.css"
import aqua_X from "../icons/aqua-X-logo.svg";
import yellow_O from "../icons/yellow-O-logo.svg";
import white_X from "../icons/white-X-logo.svg";
import black_O from "../icons/black-O-logo.svg";
import O_bgImage from "../icons/O_bg_image.svg";
import Invite from './Invite';
import Board from '../Board/Board';
import ToggleBtn from './ToggleBtn';
import PlayAgainBoard from '../Board/PlayAgainBoard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Start = () => {
  const [toggleState, setToggleState] = useState(null);
  const [showBoard, setShowBoard] = useState(false);

  const handleToggle = (isActive) => {
    setToggleState(isActive);
  };

  const handleNewGameClick = () => {
    if (toggleState === null) {
    // alert("choose player")
    toast.error("Choose player!", {
        autoClose: 2000,
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      setShowBoard(true);
    }
  };

  return (
    <>
      {!showBoard && (
        <div className={styles.container}>
          <div className={styles.logo}>
            <img src={aqua_X} alt="images" className={styles.logoImage}/>
            <img src={yellow_O} alt="images" className={styles.logoImage} />
          </div>
          <div className={styles.toggle}>
            <ToggleBtn onToggle={handleToggle} />
          </div>
          <div className={styles.newgameBtn}>
          {!toggleState && 
            <button
              className={`${styles.btn} ${styles.newgame}`}
              onClick={handleNewGameClick}
            >
              NEW GAME (VS CPU)
            </button>

          }
          {toggleState&&
          <Link to="/play-again" style={{ textDecoration: 'none' } }>
            <button
              className={`${styles.btn} ${styles.newgame}`}
              onClick={handleNewGameClick}
            >
              NEW GAME (VS CPU)
            </button>
            </Link>
          }
            <button className={`${styles.btn} ${styles.comingsoon}`}>
              NEW GAME (VS HUMAN) Coming soon
            </button>
         </div>

            <Invite
                buttonText=" Invite your friend"
                notificationMessage="Invite link copied "
                onClick={()=>{}}
            />

        </div>
      )}
      {showBoard && <PlayAgainBoard />}
    </>
  );
};

export default Start;
