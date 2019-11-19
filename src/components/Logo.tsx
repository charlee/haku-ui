import React from 'react';
import classNames from 'classnames';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import logo from '../logo.png';

type Props = {
  className?: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundImage: `url(${logo})`,
      backgroundSize: '128px 128px',
      backgroundPosition: '0 -40px',
      width: 128,
      height: 52,
      textIndent: -1000,
      margin: 0,
    },
  }),
);

const Logo: React.FC<Props> = props => {
  const { className } = props;
  const classes = useStyles();
  return <h1 className={classNames(className, classes.root)}>Haku.page</h1>;
};

export default Logo;
