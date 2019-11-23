import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles, Paper, Box, Typography } from '@material-ui/core';

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
      <Box padding={1}>
        <Typography variant="body1">Current # users: {connectionIds.length}</Typography>
      </Box>
    </Paper>
  );
};

export default ConnectionList;
