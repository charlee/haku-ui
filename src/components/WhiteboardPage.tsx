import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer } from 'react-konva';
import PreviewLayer from './PreviewLayer';
import simplifyLine from '../utils/simplifyLine';

const uuidv1 = require('uuid/v1');

type Props = {
  boardId: string;
};

const WhiteboardPage: React.FC<Props> = props => {
  const stageEl = React.createRef<Stage>();
  const layerEl = React.createRef<Konva.Layer>();

  const handleLineCreated = (line: Konva.Line) => {
    if (layerEl.current) {
      const layer = layerEl.current;
      layer.add(simplifyLine(line, 1));
      layer.batchDraw();
    }
  };

  return (
    <div className="WhiteboardPage">
      <Stage width={window.innerWidth} height={window.innerHeight - 150} ref={stageEl}>
        <PreviewLayer onLineCreated={handleLineCreated}></PreviewLayer>
        <Layer ref={layerEl}></Layer>
      </Stage>
    </div>
  );
};

export default WhiteboardPage;
