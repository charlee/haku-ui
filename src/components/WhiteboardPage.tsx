import React from 'react';
import Konva from 'konva';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles, Paper, Typography, Button, TextField } from '@material-ui/core';
import { Stage, Layer } from 'react-konva';
import PreviewLayer from './PreviewLayer';
import simplifyLine from '../utils/simplifyLine';
import ColorPicker from './ColorPicker';

const uuidv1 = require('uuid/v1');

type Props = {
  boardId: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorPicker: {
      position: 'fixed',
      right: 20,
      top: 20,
    },
  }),
);

const colors = ['#000000', '#FE3512', '#FA9600', '#5663FF', '#00F200', '#FE2C67'];

const WhiteboardPage: React.FC<Props> = props => {
  const layerEl = React.useRef<Konva.Layer>(null);

  const classes = useStyles();

  const [selectedColor, setSelectedColor] = React.useState(colors[0]);

  const handleLineCreated = (line: Konva.Line) => {
    console.log('handleLineCreated');
    if (layerEl.current) {
      const layer = layerEl.current;
      console.log(line);
      layer.add(simplifyLine(line, 1));
      layer.batchDraw();
    }
  };

  return (
    <div className="WhiteboardPage">
      <Stage width={window.innerWidth} height={window.innerHeight - 150}>
        <Layer ref={layerEl}></Layer>
        <PreviewLayer color={selectedColor} onLineCreated={handleLineCreated}></PreviewLayer>
      </Stage>
      <ColorPicker
        className={classes.colorPicker}
        colors={colors}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />
    </div>
  );
};

export default WhiteboardPage;
