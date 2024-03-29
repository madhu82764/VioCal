import React from 'react';
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import VideoPlayer from './components/videoplayer';
import Options from './components/options';
import Notifications from './components/notifications';


// Styles used for the presentation of the whole application
const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '400px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  }

 
}));

const App = () => {
  const classes = useStyles();

  //The complete layout of the application

  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit" style={{ background: '#FFDDCA' }}>
      <Typography variant="h5" align="center">VioCal - Video Chatting Application</Typography>
      </AppBar>
      <VideoPlayer >
      </VideoPlayer>
      <Options>
        <Notifications />
      </Options>  
    </div>
  );
};

export default App;