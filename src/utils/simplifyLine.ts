import Konva from 'konva';
import simplify, { Point } from 'simplify-js';

/**
 * Reduce the number of points in a line with Ramer–Douglas–Peucker.
 * @param line A Konva.Line object.
 * @param tolerance (optional) tolerance pixels, default = 1
 * @return Simplified Line object.
 */
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

  return newLine;
};

export default simplifyLine;
