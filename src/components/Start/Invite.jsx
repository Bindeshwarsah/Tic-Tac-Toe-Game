import React from 'react';
import styles from './Invite.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Invite = ({ onClick, notificationMessage, buttonText }) => {
  const triggerNotification = () => {
    toast(notificationMessage, {
      autoClose: 3000,
    });
  };

  return (
    <>
      <div className={styles.invite}>
        <ToastContainer
          className={styles.toastMessage}
          autoClose={4000}
          closeButton={false}
          limit={1}
          //Style for the toast message
          toastStyle={{
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            position: `fixed`,
            right: `0rem`,
            fontFamily: ` 'DM Sans', sans-serif`,
            fontSize: `1rem `,
            fontWeight: 800,
            borderRadius: `.5rem`,
            width: `15rem`,
            height: `3.5rem`,
            alignItems: `center`,
            color: `#F2B237`,
            backgroundColor: '#192A32',
          }}
        />
        <button className={styles.btnInvite} onClick={() => { onClick(); triggerNotification(); }}>
          {buttonText}
        </button>
      </div>
    </>
  );
};

export default Invite;
