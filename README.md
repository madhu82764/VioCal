VioCal is a video chatting web application where two people can communicate through video calling as well as texting.
The application on starting takes user permission for accessing the audio and video. On granting access, it streams user audio(originally muted to avoid echo) and video.
Below it is the box with textfields for filling user name and for pasting the ID of the user, whom you want to call.
The "COPY ID" button generates our ID and this ID can be given to another user, who wants to call us. 
The "CALL" button calls the user whose ID is filled in the "Make a call" textfield.
The chat box is used for sending text messages.
When receiving a call, a notification comes up for answering the call. After calling, users can end call using the "Hang up" button. Users can text before the call, during the call as well as after ending the call.
The application is built using React Js and its library material-ui for the front end, Node js, Express js for backend and uses Socket.io and Peer Js for establishing communication through video call/ text between the users. Bootstrap is also used to make the application responsive.