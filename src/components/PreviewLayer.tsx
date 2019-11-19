import React from 'react';
import Konva from 'konva';
import { Stage, Layer } from 'react-konva';

type Props = {
  onLineCreated: (line: Konva.Line) => void;
  color: string;
};

const PreviewLayer: React.FC<Props> = props => {
  const { onLineCreated, color } = props;
  const previewEl = React.createRef<Konva.Layer>();
  let isPaint = false;
  let line: Konva.Line;

  const handleDrawLineStart = (layer: Konva.Layer) => {
    isPaint = true;
    let pos = layer.getStage().getPointerPosition();

    if (pos) {
      line = new Konva.Line({
        stroke: color,
        strokeWidth: 3,
        globalCompositeOperation: 'source-over',
        points: [pos.x, pos.y],
        draggable: true,
      });

      layer.add(line);
    }
  };

  const handleDrawLineMove = (layer: Konva.Layer) => {
    if (!isPaint) {
      return;
    }

    const pos = layer.getStage().getPointerPosition();
    if (pos) {
      line.points([...line.points(), pos.x, pos.y]);
      layer.batchDraw();
    }
  };

  const handleDrawLineEnd = (layer: Konva.Layer) => {
    isPaint = false;
    layer.removeChildren();
    layer.draw();
    onLineCreated(line);
  };

  React.useEffect(() => {
    if (previewEl.current) {
      const layer = previewEl.current;
      const stage = layer.getStage();
      stage.on('mousedown touchstart', () => handleDrawLineStart(layer));
      stage.on('mouseup touchend', () => handleDrawLineEnd(layer));
      stage.on('mousemove touchmove', () => handleDrawLineMove(layer));
    }
  }, [color, previewEl]);

  return <Layer ref={previewEl}></Layer>;
};

export default PreviewLayer;
