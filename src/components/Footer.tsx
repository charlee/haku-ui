import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: 0,
      height: 36,
      padding: theme.spacing(1),
      left: 0,
    },
  }),
);

const Footer: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="caption" color="textSecondary">
        &copy; Copyright haku.page, 2019, All rights reserved.
      </Typography>
    </div>
  );
};

export default Footer;
