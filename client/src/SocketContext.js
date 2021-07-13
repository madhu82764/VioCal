import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import $ from 'jquery';
const SocketContext = createContext();

//Server deployed here 
 const socket = io('https://viocal.herokuapp.com/');


const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
 

  useEffect(() => {
    // For streaming user audio and video
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => setMe(id));
  // for receiving call fron the other user
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

  //For receiving text from the other user 
    socket.on('chatcall', data => {
      console.log(data);
     
      $("ul").append(`<li class="something"><b>Other user</b><br/>${data}</li>`);
         scrollToBottom();
     
     });
  }, []);

  //For answering the call, which is invoked on clicking the Answer button
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  // For calling another user, which is invoked on clicking "CALL" button
  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };
  
  
  let chattext = $("#standard-basic");

  //For sending text, invoked on clicking the "SEND" button
  const chatcall = () => {
    if(chattext.val())
  {
  
  socket.emit('chatcall', chattext.val());

  console.log("socket send succeess");

  $("ul").append(`<li class="message"><b>You</b><br/>${chattext.val()}</li>`);
    scrollToBottom();
    chattext.val(''); 
  };

}

// For hanging up or ending the call , invoked on clicking the "Hang Up" button
  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

//To scroll through the text, when the chat is long inside the chat box
const scrollToBottom = () => {
  var d = $('.main__chat_window');
  d.scrollTop(d.prop("scrollHeight"));
};

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      scrollToBottom,
      callUser,
      leaveCall,
      chatcall,
      answerCall,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };