// Code for the presentation of options box, to write your name and to call your friend by providing their unique ID
import React, { useState, useContext } from 'react';
import { Button, Paper, TextField, Grid, Typography, Container } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FileCopy, Phone, PhoneDisabled } from '@material-ui/icons';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CallSharpIcon from '@material-ui/icons/CallSharp';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../SocketContext';

// Styles used for the presentation of options box
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    color: "black", 
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    color: "black", 
    width: '600px',
    margin: '35px 0',
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
  multilineColor:{
    color:'black',
    defaultValue:"secondary"
},

floatingLabelFocusStyle: {
  color: "white"
}
}));
// Function for Options box
const Options = ({ children }) => {
  
//functions, events and variables used here, taken from SocketContext file 
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const classes = useStyles();


  return (
    
    <Container className={classes.container}>
        <Paper elevation={10} className={classes.paper} style={{ background: '#FFDDCA' }}>
        <form className={classes.root} noValidate autoComplete="off" >
          <Grid container className={classes.gridContainer} >
            <Grid item xs={12} md={6} className={classes.padding}>
              <Grid><AccountCircle /></Grid>
              <Typography gutterBottom variant="h6" >User name  </Typography> 
              <TextField label="Name"  InputProps={{classes: { input: classes.multilineColor} } } InputLabelProps={{className: classes.loatingLabelFocusStyle}} value={name} onChange={(e) => setName(e.target.value)} fullWidth />
      
              <CopyToClipboard text={me} className={classes.margin}>
                <Button variant="contained" color="primary" style={{ backgroundColor: '#FF8C00' }}   fullWidth startIcon={<FileCopy fontSize="large" />}>
                  Copy ID
                </Button>
              </CopyToClipboard>
            </Grid>
      
            <Grid item xs={12} md={6} className={classes.padding}>
              <Grid>< CallSharpIcon/></Grid>
              <Typography gutterBottom variant="h6">Make a call</Typography>
              <TextField label="Paste ID to call"  InputProps={{  classes: { input: classes.multilineColor} }} color="secondary" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              {callAccepted && !callEnded ? (
                <Button variant="contained" color="secondary" style={{ backgroundColor: '#C11B17' }}  startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} className={classes.margin}>
                  Hang Up
                </Button>
              ) : (
                <Button variant="contained" color="secondary" style={{ backgroundColor: '#C12283' }} startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)} className={classes.margin}>
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
        </Paper>
    </Container>
  );
};

export default Options;