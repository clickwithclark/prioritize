/**
 * Adds a global event listener to the document for a specific event type.
 * The listener triggers the callback only when the event target matches the specified selector.
 *
 * @function addGlobalEventListener
 * @param  {String} type - Event type (e.g., 'click', 'keyup').
 * @param  {String} selector - CSS selector to match the event target (e.g., '#id', '.class').
 * @param  {Function} callback - Function to execute when the event is triggered.
 */
export function addGlobalEventListener(type, selector, callback) {
  try {
    // Add an event listener to the document for the specified event type
    document.addEventListener(type, (event) => {
      // Check if the event target or its ancestor matches the selector
      if (event.target.closest(selector)) {
        callback(event); // Execute the callback function
      }
    });
  } catch (error) {
    // Handle any errors that occur during event listener setup
    const errorCode = error?.code; // Error code, if available
    const errorMessage = error?.message; // Error message, if available
    console.error(
      "An error occurred in event listener: ",
      errorMessage,
      "Error Code: ",
      errorCode
    );
  }
}
