import Konva from "konva";
import { Stage } from "react-konva";

export const addLine = (
  stage: Konva.Stage,
  layer: Konva.Layer,
  mode = "brush"
) => {
  let isPaint = false;
  let lastLine: Konva.Line;

  stage.on("mousedown touchstart", function(e) {
    isPaint = true;
    let pos = stage.getPointerPosition();

    if (pos) {
      lastLine = new Konva.Line({
        stroke: mode == "brush" ? "red" : "white",
        strokeWidth: mode == "brush" ? 2 : 20,
        globalCompositeOperation:
          mode === "brush" ? "source-over" : "destination-out",
        points: [pos.x, pos.y],
        draggable: mode == "brush"
      });
      layer.add(lastLine);
    }
  });

  stage.on("mouseup touchend", function() {
    isPaint = false;
  });

  stage.on("mousemove touchmove", function() {
    if (!isPaint) {
      return;
    }
    const pos = stage.getPointerPosition();
    if (pos) {
      let newPoints = lastLine.points().concat([pos.x, pos.y]);
      lastLine.points(newPoints);
      layer.batchDraw();
    }
  });
};
