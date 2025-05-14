/**
 * Callback function
 * @callback debounceFunction
 *
 */

/**
 * @function debounce
 * @param  {debounceFunction} callback function to execute
 * @param  {Number} delayInSeconds delay time in seconds
 */
export function debounce(callback, delayInSeconds) {
  let timeoutId;

  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      callback.apply(context, args);
    }, delayInSeconds * 1000);
  };
}
