// Code for the presentation of notification which comes when someone is calling you
import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { SocketContext } from '../SocketContext';

// Function for Notification
const Notifications = () => {
   //functions, events and variables used here, taken from SocketContext file 
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around', background: '#FFDDCA', border: '5px #FFDDCA', }}>
          <h1>{call.name} is calling:</h1>
          <Button variant="contained"   style={{ backgroundColor: '#B666D2' }}  color="secondary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;