import React, { ReactEventHandler } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles, Paper, Typography, Button, TextField } from '@material-ui/core';
import { navigate } from 'hookrouter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    form: {
      width: 600,
      margin: '160px auto 0',
      padding: theme.spacing(2),
    },
  }),
);

const HomePage: React.FC = () => {
  const classes = useStyles();

  const [whiteboardId, setWhiteboardId] = React.useState('');

  const handleCreateNew = () => {};

  const handleJoin = () => {
    navigate(`/b/${whiteboardId}`);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.form}>
        <Typography variant="h4" align="center">
          Start your whiteboard
        </Typography>
        <Button variant="contained" color="primary" onClick={handleCreateNew}>
          Create a new whiteboard
        </Button>
        <div>or join an existing whiteboard</div>
        <TextField
          value={whiteboardId}
          placeholder="e.g. 144-425-661"
          onChange={e => setWhiteboardId(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleJoin}>
          Join
        </Button>
      </Paper>
    </div>
  );
};

export default HomePage;
