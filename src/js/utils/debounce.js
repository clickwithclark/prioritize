/**
 * Callback function
 * @callback debounceFunction
 * @param {...any} args - Arguments passed to the callback function
 */

/**
 * Creates a debounced version of the provided callback function.
 * The debounced function delays the execution of the callback until after
 * the specified delay time has elapsed since the last time it was invoked.
 *
 * @function debounce
 * @param  {debounceFunction} callback - Function to execute after the delay
 * @param  {Number} delayInSeconds - Delay time in seconds
 * @returns {Function} A debounced version of the callback function
 */
export function debounce(callback, delayInSeconds) {
  let timeoutId; // Stores the ID of the timeout to clear it if needed

  return function () {
    const context = this; // Preserve the context of the calling function
    const args = arguments; // Capture the arguments passed to the debounced function

    // Clear any existing timeout to reset the delay
    clearTimeout(timeoutId);

    // Set a new timeout to execute the callback after the delay
    timeoutId = setTimeout(function () {
      callback.apply(context, args); // Execute the callback with the correct context and arguments
    }, delayInSeconds * 1000); // Convert delay from seconds to milliseconds
  };
}
