import React from 'react';
import Konva from 'konva';
import { makeStyles } from '@material-ui/styles';
import {
  Theme,
  createStyles,
  Dialog,
  DialogContent,
  DialogContentText,
  CircularProgress,
  Box,
  Typography,
} from '@material-ui/core';
import { Stage, Layer } from 'react-konva';
import PreviewLayer from './PreviewLayer';
import simplifyLine from '../utils/simplifyLine';
import ColorPicker from './ColorPicker';
import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  green,
  lime,
  yellow,
  orange,
  brown,
  grey,
  lightGreen,
} from '@material-ui/core/colors';
import api from '../lib/api';

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

const colors = [
  red[500],
  pink[300],
  purple[400],
  deepPurple[400],
  indigo[400],
  blue[500],
  lightBlue[300],
  cyan[400],
  green[700],
  lightGreen[400],
  lime[500],
  yellow[600],
  orange[700],
  brown[600],
  grey[900],
  grey[500],
];

const WhiteboardPage: React.FC<Props> = props => {
  const layerEl = React.useRef<Konva.Layer>(null);

  const classes = useStyles();

  const [selectedColor, setSelectedColor] = React.useState(colors[0]);

  const [connecting, setConnecting] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const { boardId } = props;

    // If load the board page directly, try to reconnect
    if (boardId && !api.isOpen()) {
      setConnecting(true);
      api
        .open(boardId)
        .catch(e => {
          setError(true);
        })
        .finally(() => {
          setConnecting(false);
        });
    }
  });

  const handleLineCreated = (line: Konva.Line) => {
    console.log('handleLineCreated');
    if (layerEl.current) {
      const layer = layerEl.current;

      const simplifiedLine = simplifyLine(line, 1);
      layer.add(simplifiedLine);
      layer.batchDraw();

      // send to server
      api.addLine({
        type: 'line',
        data: {
          color: simplifiedLine.stroke(),
          points: simplifiedLine.points(),
        },
      });
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
      <Dialog open={error}>
        <DialogContent>
          <Box alignItems="center" display="flex" padding={2}>
            <Typography variant="body1">
              Failed to connect to Haku, please ensure your whiteboard ID is correct.
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WhiteboardPage;
