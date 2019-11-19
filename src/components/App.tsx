import React from 'react';
import './App.css';

import { useRoutes } from 'hookrouter';
import routes from '../routes';

import Logo from './Logo';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      width: '100%',
      height: '100vh',
    },

    logo: {
      position: 'fixed',
      left: 20,
      top: 20,
      zIndex: 100,
    }
  }),
);

const App: React.FC = () => {
  const classes = useStyles();

  const routeResult = useRoutes(routes);

  return (
    <div className={classes.root}>
      <Logo className={classes.logo}/>
      {routeResult}
    </div>
  );
};

export default App;
