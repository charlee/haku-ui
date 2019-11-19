import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'row wrap',
    },

    colorBlock: {
      width: 80,
      height: 40,
      border: '1px #000',
      cursor: 'pointer',
    },

    active: {},
  }),
);

type Props = {
  selectedColor: string;
  colors: string[];
  onColorChange: (color: string) => void;
  className?: string;
};

const ColorPicker: React.FC<Props> = props => {
  const { selectedColor, colors, onColorChange, className } = props;
  const classes = useStyles();

  const handleColorClick = (color: string) => () => {
    console.log(color);
    onColorChange(color);
  };

  return (
    <div className={classNames(classes.root, className)}>
      {colors.map(color => (
        <div
          key={color}
          className={classNames(classes.colorBlock, { [classes.active]: color === selectedColor })}
          style={{ backgroundColor: color }}
          onClick={handleColorClick(color)}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
