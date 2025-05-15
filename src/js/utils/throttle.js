/**
 * Creates a throttled version of the provided function.
 * The throttled function ensures that the callback is executed at most once
 * within the specified wait time, with optional leading or trailing execution.
 *
 * @function throttle
 * @param  {Function} func - The function to throttle
 * @param  {Number} [wait=5] - The wait time in seconds between allowed executions
 * @param  {Boolean} [leading=false] - Whether to execute the function on the leading edge of the wait time
 * @returns {Function} A throttled version of the provided function
 */
export function throttle(func, wait = 5, leading = false) {
  let timeout; // Stores the timeout ID for delayed execution
  let lastCalled = 0; // Tracks the last time the function was called
  const MILLISECONDSTOSECONDS = 1000; // Conversion factor from seconds to milliseconds

  return function (...args) {
    const now = Date.now(); // Current timestamp
    const shouldCall = leading
      ? now - lastCalled >= wait * MILLISECONDSTOSECONDS // Leading: Check if enough time has passed
      : !timeout; // Trailing: Ensure no active timeout exists

    if (shouldCall) {
      if (!leading) {
        lastCalled = now; // Update the last called time for trailing execution
      }
      func.apply(this, args); // Execute the function with the correct context and arguments
    }

    // Clear any existing timeout to reset the delay
    clearTimeout(timeout);

    // Set a new timeout for trailing execution
    timeout = setTimeout(() => {
      if (!leading) {
        lastCalled = now; // Update the last called time for trailing execution
      }
      timeout = null; // Reset the timeout
    }, wait * MILLISECONDSTOSECONDS);
  };
}
