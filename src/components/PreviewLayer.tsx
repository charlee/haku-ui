import React from 'react';
import Konva from 'konva';
import { Stage, Layer } from 'react-konva';

type Props = {
  onLineCreated: (line: Konva.Line) => void;
};

const PreviewLayer: React.FC<Props> = props => {
  const { onLineCreated } = props;
  const previewEl = React.createRef<Konva.Layer>();
  let isPaint = false;
  let line: Konva.Line;

  const initPreview = (stage: Konva.Stage, layer: Konva.Layer) => {
    stage.on('mousedown touchstart', function(e) {
      isPaint = true;
      let pos = stage.getPointerPosition();

      if (pos) {
        line = new Konva.Line({
          stroke: 'red',
          strokeWidth: 2,
          globalCompositeOperation: 'source-over',
          points: [pos.x, pos.y],
          draggable: true,
        });

        layer.add(line);
      }
    });

    stage.on('mouseup touchend', function() {
      isPaint = false;
      layer.removeChildren();
      layer.draw();
      onLineCreated(line);
    });

    stage.on('mousemove touchmove', function() {
      if (!isPaint) {
        return;
      }

      const pos = stage.getPointerPosition();
      if (pos) {
        line.points([...line.points(), pos.x, pos.y]);
        layer.batchDraw();
      }
    });
  };

  React.useEffect(() => {
    if (previewEl.current) {
      const stage = previewEl.current.getStage();
      initPreview(stage, previewEl.current);
    }
  }, []);

  return <Layer ref={previewEl}></Layer>;
};

export default PreviewLayer;
