import React from 'react';
import './App.css';

import { useRoutes } from 'hookrouter';
import routes from '../routes';

import TopBar from './TopBar';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      width: '100%',
      height: '100vh',
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();

  const routeResult = useRoutes(routes);

  return (
    <div className={classes.root}>
      <TopBar></TopBar>
      {routeResult}
    </div>
  );
};

export default App;
