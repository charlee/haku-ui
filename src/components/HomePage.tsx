import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles, Paper, Typography, Button, TextField, Grid, Box } from '@material-ui/core';
import { navigate } from 'hookrouter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      height: '100vh',
      paddingTop: 180,
    },

    form: {
      width: 600,
      margin: '0 auto',
      padding: theme.spacing(4),
    },
  }),
);

const HomePage: React.FC = () => {
  const classes = useStyles();

  const [whiteboardId, setWhiteboardId] = React.useState('');

  const handleCreateNew = () => {
    const id = Math.floor(Math.random() * 1000000000);
    navigate(`/b/${id}`);
  };

  const handleJoin = () => {
    navigate(`/b/${whiteboardId}`);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.form}>
        <Typography variant="h4" align="center">
          Start your whiteboard
        </Typography>

        <Box mt={5}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="body1">Create a new whiteboard and share with your collaborators.</Typography>
              <Box minHeight={160} display="flex" alignItems="center" justifyContent="center">
                <Button variant="contained" color="primary" onClick={handleCreateNew}>
                  Create whiteboard
                </Button>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1">Join an existing whiteboard if you know the id.</Typography>
              <Box minHeight={160} display="flex" alignItems="center" justifyContent="center">
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <TextField
                      value={whiteboardId}
                      placeholder="e.g. 144-425-661"
                      onChange={e => setWhiteboardId(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button variant="contained" color="primary" onClick={handleJoin}>
                      Join
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default HomePage;
