/**
 * Checks if the user is currently online.
 * Uses the `navigator.onLine` property to determine the network status.
 *
 * @function isOnline
 * @returns {Boolean} `true` if the user is online, otherwise `false`.
 */
export function isOnline() {
  return navigator.onLine; // Returns the online status of the user's browser
}
