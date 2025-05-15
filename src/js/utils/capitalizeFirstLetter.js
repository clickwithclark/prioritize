/**
 * Capitalizes the first letter of a given string.
 *
 * @function capitalizeFirstLetter
 * @param  {String} string - The string to capitalize.
 * @returns {String} The input string with the first letter capitalized.
 */
export function capitalizeFirstLetter(string) {
  // Convert the first character to uppercase and append the rest of the string
  return string[0].toUpperCase() + string.slice(1);
}
