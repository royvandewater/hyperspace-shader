
const randomCoordinatesWithMinimumDistance = (minDistance) => {
  const r = 100; // range
  const x = Math.random() * (2 * r) - r;
  const y = Math.random() * (2 * r) - r;
  const z = Math.random() * 12 - 2;

  if (x * x + y * y < minDistance * minDistance) {
    return randomCoordinatesWithMinimumDistance(minDistance);
  }
  return [x, y, z]
}


/**
 * Generate a flattened array of star coordinates that can be used to 
 * generate individual stars
 * @param {number} starCount 
 * @returns {number[]}
 */
const generateStarfieldCoordinates = (starCount) => new Array(starCount).fill(0).map(() => randomCoordinatesWithMinimumDistance(1.0))

/**
 * Generate a flattened array of coordinates for triangles that represent
 * stars.
 * @param {number} starCount 
 * @returns {number[]}
 */
export const generateStarfield = (starCount) => generateStarfieldCoordinates(starCount).flat();
// export const generateStarfield = (starCount) => [
//   // triangle 1
//   -0.1, -0.1, 0.1,
//   -0.1, 0.1, 0.1,
//   0.1, -0.1, 0.1,
//   // triangle 2
//   0.1, -0.1, 0.1,
//   -0.1, 0.1, 0.1,
//   0.1, 0.1, 0.1,
// ];
// 