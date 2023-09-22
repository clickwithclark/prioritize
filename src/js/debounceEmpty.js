/**
 * Callback function
 * @callback debounceFunction
 *
 */

/**
 * Check if input field is empty And interval elapsed
 * before running callback function
 * @function debounceEmpty
 * @param  {type} inputElement input field
 * @param  {debounceFunction} callback function to execute
 * @param  {type} doneTypingInterval delay time in seconds
 *
 */
export function debounceEmpty(
  inputElement,
  callback,
  doneTypingInterval = 3000
) {
  let typingTimer;
  clearTimeout(typingTimer);
  if (!inputElement.value) {
    typingTimer = setTimeout(callback, doneTypingInterval);
  }
}
