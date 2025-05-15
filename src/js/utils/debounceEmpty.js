/**
 * Callback function
 * @callback debounceFunction
 * @param {...any} args - Arguments passed to the callback function
 */

/**
 * Checks if the input field is empty and waits for the specified interval
 * before executing the callback function.
 *
 * @function debounceEmpty
 * @param  {HTMLInputElement} inputElement - The input field to monitor.
 * @param  {debounceFunction} callback - The function to execute after the delay.
 * @param  {Number} [doneTypingInterval=3] - The delay time in seconds before executing the callback.
 */
export function debounceEmpty(inputElement, callback, doneTypingInterval = 3) {
  let typingTimer; // Timer to track the delay interval

  // Clear any existing timer to reset the delay
  clearTimeout(typingTimer);

  // If the input field is empty, set a timer to execute the callback
  if (!inputElement.value) {
    typingTimer = setTimeout(callback, doneTypingInterval * 1000); // Convert seconds to milliseconds
  }
}
