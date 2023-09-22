/**
 * Callback function
 * @callback debounceFunction
 * 
 */

/**
 * @function debounce
 * @param  {debounceFunction} callback function to execute
 * @param  {type} timeout delay time in seconds
 */
export function debounce(callback, timeout = 3) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, timeout * 1000);
  };
}
