import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);

type Props = {
  connectionIds: string[];
  className?: string;
};

const ConnectionList: React.FC<Props> = props => {
  const { className, connectionIds } = props;
  const classes = useStyles();
  return (
    <Paper className={classNames(classes.root, className)}>
      {connectionIds.map(connectionId => (
        <div>{connectionId}</div>
      ))}
    </Paper>
  );
};

export default ConnectionList;
