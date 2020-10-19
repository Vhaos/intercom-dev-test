import env from '../config/env';
import { Coordinate } from '../typings';

/**
 * calculates the distance between to coordinates on the Earth using the Great Circle Formula
 * @see https://en.wikipedia.org/wiki/Great-circle_distance#Formulas
 * @param pointA Coordinate (longitude and latitude) object
 * @param pointB Coordinate (longitude and latitude) object
 * @returns distance in km
 */
export function getDistanceBetweenCoordinates(pointA: Coordinate, pointB: Coordinate): number {
  const [ɸa, ƛa, ɸb, ƛb] = [
    pointA.latitude,
    pointA.longitude,
    pointB.latitude,
    pointB.longitude,
  ].map(degreesToRadians);

  const centralAngle = Math.acos(
    Math.sin(ɸa) * Math.sin(ɸb) + Math.cos(ɸa) * Math.cos(ɸb) * Math.cos(ƛa - ƛb),
  );

  const distance = env.earthRadiusInKM * centralAngle;
  return distance;
}

/**
 * Converts an angle in degrees to radians
 * @param degrees
 * @returns corresponding angle in radians
 */
function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
