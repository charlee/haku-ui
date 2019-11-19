import Konva from 'konva';
import simplify, { Point } from 'simplify-js';

const simplifyLine = (line: Konva.Line, tolerance: number = 1) => {
  const linePoints = line.points();
  const points: Point[] = [];
  for (let i = 0; i < linePoints.length; i += 2) {
    points.push({
      x: linePoints[i],
      y: linePoints[i + 1],
    });
  }

  const simplifiedPoints = simplify(points, tolerance);

  const newPoints: number[] = [];
  for (let i = 0; i < simplifiedPoints.length; i++) {
      newPoints.push(simplifiedPoints[i].x);
      newPoints.push(simplifiedPoints[i].y);
  }

  const newLine = line.clone();
  newLine.points(newPoints);
  console.log(linePoints.length, newPoints.length);

  return newLine;

};

export default simplifyLine;
