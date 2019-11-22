import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles, Paper } from '@material-ui/core';
import { Create } from '@material-ui/icons';
import Eraser from '../icons/Eraser';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-evenly',
      width: 212,
      padding: 8,
    },

    toolBlock: {
      width: 48,
      height: 48,
      border: '2px #fff solid',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    active: {
      border: '2px #aaa solid',
    },
  }),
);

type Props = {
  selectedTool: string;
  onToolChange: (toolName: string) => void;
  className?: string;
};

type Tool = {
  name: string;
  icon: React.ReactNode;
};

const TOOLS: Tool[] = [
  { name: 'pen', icon: <Create /> },
  { name: 'eraser', icon: <Eraser /> },
];

const ToolPicker: React.FC<Props> = props => {
  const { selectedTool, onToolChange, className } = props;
  const classes = useStyles();

  const handleToolClick = (tool: Tool) => () => onToolChange(tool.name);

  return (
    <Paper className={classNames(classes.root, className)}>
      {TOOLS.map(tool => (
        <div
          key={tool.name}
          className={classNames(classes.toolBlock, { [classes.active]: tool.name === selectedTool })}
          onClick={handleToolClick(tool)}
        >
          {tool.icon}
        </div>
      ))}
    </Paper>
  );
};

export default ToolPicker;
