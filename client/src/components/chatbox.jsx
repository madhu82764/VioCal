
import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { Grid,TextField, Typography, Paper, makeStyles, Container } from '@material-ui/core';
import {  Send } from '@material-ui/icons';
import { SocketContext } from '../SocketContext';

// Code for the presentation of chatbox
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    gridContainer: {
      
        justifyContent: 'left',
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'column',
        },
    },
    container: {
      
      width: '300px',
      margin: '35px 0',
      justifyContent: 'left',
      padding: 0,
      [theme.breakpoints.down('xs')]: {
        width: '80%',
      },
    },
    margin: {
      marginTop: 20,
    },
    padding: {
      padding: 20,
    },
    paper: {
      borderRadius: 20,
      padding: '10px 20px',
      border: '3px solid black',
    },
  }));

  // Function for ChatBox
  const ChatBox = () => {
  //chatcall function used here, taken from SocketContext file 
    const { chatcall } = useContext(SocketContext);
    const classes = useStyles();
  
    return (
            <Container className={classes.container}>
              <Paper elevation={10} className={classes.paper}  style={{ background: '#FFDDCA' }}>
                <form className={classes.root} noValidate autoComplete="off">
                  <Grid container className={classes.gridContainer} >

                      <div className="chat__heading">
                      <Typography gutterBottom variant="h6" >Chat  </Typography>
                      </div>
            
                  
                      <br/> <br/> 
                      <div className="main__chat_window">
                      <br/><br/>
                      <ul className="messages">
                      </ul>
                      </div>
                      <div className="main__message_container">
                   
                    <TextField id="standard-basic" label="Type message here..." fullWidth/>
                     </div>
                        <Button variant="contained" style={{ backgroundColor: '#008080' }} startIcon={<Send fontSize="large" />} color="primary" onClick= {()=> chatcall()} fullWidth>
                          Send 
                        </Button>
                    
                    </Grid>
                    
                </form>
               </Paper>
            </Container>
  );
      
   
  };
  
  export default ChatBox;