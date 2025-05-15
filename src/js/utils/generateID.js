/**
 * Generates a random numeric ID.
 * The ID is a random integer between 0 and 99,999,999.
 *
 * @function generateID
 * @returns {Number} A randomly generated numeric ID.
 */
export function generateID() {
  // Generate a random number and floor it to ensure it's an integer
  return Math.floor(Math.random() * 100000000);
}
