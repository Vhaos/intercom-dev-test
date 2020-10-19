import { Coordinate } from '../typings';

const PI = Math.PI;
const EARTH_RADIUS_IN_KM = 6371.0088;

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

  const distance = EARTH_RADIUS_IN_KM * centralAngle;
  return distance;
}

/**
 * Converts an angle in degrees to radians
 * @param degrees
 * @returns corresponding angle in radians
 */
function degreesToRadians(degrees: number): number {
  return degrees * (PI / 180);
}
