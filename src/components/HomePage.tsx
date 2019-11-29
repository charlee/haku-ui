import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Theme,
  createStyles,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
  Box,
  Snackbar,
  SnackbarContent,
  IconButton,
  Dialog,
  DialogContent,
  CircularProgress,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { navigate } from 'hookrouter';
import api, { BoardId } from '../lib/api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      height: '100vh',
      [theme.breakpoints.down('md')]: {
        paddingTop: 80,
      },
      [theme.breakpoints.up('md')]: {
        paddingTop: 180,
      },
    },

    form: {
      [theme.breakpoints.down('md')]: {
        width: 480,
      },
      [theme.breakpoints.up('md')]: {
        width: 600,
      },
      margin: '0 auto',
      padding: theme.spacing(4),
    },

    icon: {
      fontSize: 20,
    },

    error: {
      backgroundColor: theme.palette.error.dark,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

const HomePage: React.FC = () => {
  const classes = useStyles();

  const [whiteboardId, setWhiteboardId] = React.useState('');
  const [error, setError] = React.useState('');
  const [connecting, setConnecting] = React.useState(false);

  const handleSnackClose = () => {
    setError('');
  };

  const handleReceiveBoardId = (data: BoardId) => {
    console.log(data);
    navigate(`/b/${data.boardId}`);
  };

  const handleCreateNew = async () => {
    try {
      setConnecting(true);
      await api.open();
      api.registerOnBoardId(handleReceiveBoardId);
      api.getBoardId();
    } catch (e) {
      setError('Error occured, please try again later.');
      setConnecting(false);
    }
  };

  const handleJoin = async () => {
    try {
      setConnecting(true);
      await api.open(whiteboardId);
      navigate(`/b/${whiteboardId}`);
    } catch (e) {
      setError('Board not found');
      setConnecting(false);
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.form}>
        <Typography variant="h4" align="center">
          Start your whiteboard
        </Typography>

        <Box mt={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">Create a new whiteboard and share with your collaborators.</Typography>
              <Box minHeight={160} display="flex" alignItems="center" justifyContent="center">
                <Button variant="contained" color="primary" onClick={handleCreateNew} disabled={connecting}>
                  Create whiteboard
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body1">Join an existing whiteboard if you know the id.</Typography>
              <Box minHeight={160} display="flex" alignItems="center" justifyContent="center">
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <TextField
                      value={whiteboardId}
                      placeholder="e.g. 1444256611"
                      onChange={e => setWhiteboardId(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button variant="contained" color="primary" onClick={handleJoin} disabled={connecting}>
                      Join
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={!!error}
          autoHideDuration={3000}
          onClose={handleSnackClose}
        >
          <SnackbarContent
            className={classes.error}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                {error}
              </span>
            }
            action={[
              <IconButton key="close" aria-label="close" color="inherit" onClick={handleSnackClose}>
                <CloseIcon className={classes.icon} />
              </IconButton>,
            ]}
          />
        </Snackbar>
        <Dialog open={connecting}>
          <DialogContent>
            <Box alignItems="center" display="flex" padding={2}>
              <CircularProgress />
              <Box marginLeft={2}>
                <Typography variant="body1">Connecting...</Typography>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </Paper>
    </div>
  );
};

export default HomePage;
