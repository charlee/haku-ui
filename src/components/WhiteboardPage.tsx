import React from 'react';
import Konva from 'konva';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles, Dialog, DialogContent, CircularProgress, Box, Typography } from '@material-ui/core';
import { Stage, Layer } from 'react-konva';
import PreviewLayer from './PreviewLayer';
import simplifyLine from '../utils/simplifyLine';
import ColorPicker from './ColorPicker';
import ToolPicker from './ToolPicker';
import ConnectionList from './ConnectionList';
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
import api, { Line, BoardData } from '../lib/api';

type Props = {
  boardId: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    overlay: {
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
  const [selectedTool, setSelectedTool] = React.useState('pen');

  const [connecting, setConnecting] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [connectionIds, setConnectionIds] = React.useState<string[]>([]);
  const [myConnectionId, setMyConnectionId] = React.useState<string>('');

  const handleLineAdded = (lineData: Line) => {
    const { color, width, points } = lineData.data;
    if (layerEl.current) {
      const layer = layerEl.current;

      const line = new Konva.Line({
        stroke: color,
        strokeWidth: width,
        globalCompositeOperation: 'source-over',
        points,
        draggable: false,
      });
      layer.add(line);
      layer.batchDraw();
    }
  };

  const handleBoardData = (boardData: BoardData) => {
    // TODO: handle init image and lines

    setMyConnectionId(boardData.myConnectionId);
    setConnectionIds(boardData.connections);
  };

  const initAPI = () => {
    api.registerOnLineAdded(handleLineAdded);
    api.registerOnBoardData(handleBoardData);
    api.init();
  };

  React.useEffect(() => {
    const { boardId } = props;

    // If load the board page directly, try to reconnect
    console.log(boardId, api.isOpen());
    if (boardId && !api.isOpen()) {
      setConnecting(true);
      api
        .open(boardId)
        .then(initAPI)
        .catch(e => {
          setError(true);
        })
        .finally(() => {
          setConnecting(false);
        });
    } else {
      initAPI();
    }
  }, []);

  const handleLineCreated = (line: Konva.Line) => {
    const { boardId } = props;
    if (layerEl.current) {
      const layer = layerEl.current;

      const simplifiedLine = simplifyLine(line, 1);
      layer.add(simplifiedLine);
      layer.batchDraw();

      // send to server
      api.addLine({
        type: 'line',
        boardId,
        data: {
          color: simplifiedLine.stroke(),
          width: simplifiedLine.strokeWidth(),
          points: simplifiedLine.points(),
        },
      });
    }
  };

  return (
    <div className="WhiteboardPage">
      <Stage width={window.innerWidth} height={window.innerHeight - 150}>
        <Layer ref={layerEl}></Layer>
        <PreviewLayer color={selectedColor} tool={selectedTool} onLineCreated={handleLineCreated} />
      </Stage>

      <Box className={classes.overlay}>
        <Box marginBottom={1}>
          <ColorPicker colors={colors} selectedColor={selectedColor} onColorChange={setSelectedColor} />
        </Box>
        <Box marginBottom={1}>
          <ToolPicker selectedTool={selectedTool} onToolChange={setSelectedTool} />
        </Box>
        <Box marginBottom={1}>
          <ConnectionList connectionIds={connectionIds} />
        </Box>
      </Box>

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
