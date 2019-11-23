import React from 'react';
import Konva from 'konva';
import { Layer } from 'react-konva';

type Props = {
  onLineCreated: (line: Konva.Line) => void;
  tool: string;
  color: string;
};

type State = {
  isPaint: boolean;
};

class PreviewLayer extends React.Component<Props, State> {
  private isPaint: boolean = false;
  private line?: Konva.Line = undefined;
  private previewEl = React.createRef<Konva.Layer>();

  handleDrawLineStart = (layer: Konva.Layer) => {
    const { color, tool } = this.props;

    this.isPaint = true;
    let pos = layer.getStage().getPointerPosition();

    if (pos) {
      this.line = new Konva.Line({
        stroke: tool === 'pen' ? color : '#ffffff',
        strokeWidth: tool === 'pen' ? 3 : 24,
        globalCompositeOperation: 'source-over',
        points: [pos.x, pos.y],
        draggable: false,
      });

      layer.add(this.line);
    }
  };

  handleDrawLineMove = (layer: Konva.Layer) => {
    if (!this.isPaint || !this.line) {
      return;
    }

    const pos = layer.getStage().getPointerPosition();
    if (pos) {
      this.line.points([...this.line.points(), pos.x, pos.y]);
      layer.batchDraw();
    }
  };

  handleDrawLineEnd = (layer: Konva.Layer) => {
    const { onLineCreated } = this.props;

    if (!this.isPaint || !this.line) {
      return;
    }

    this.isPaint = false;
    layer.removeChildren();
    layer.draw();
    onLineCreated(this.line);
  };

  componentDidMount() {
    if (this.previewEl.current) {
      const layer = this.previewEl.current;
      const stage = layer.getStage();
      stage.on('mousedown touchstart', () => this.handleDrawLineStart(layer));
      stage.on('mouseup touchend', () => this.handleDrawLineEnd(layer));
      stage.on('mousemove touchmove', () => this.handleDrawLineMove(layer));
    }
  }

  render() {
    return <Layer ref={this.previewEl} />;
  }
}

export default PreviewLayer;
