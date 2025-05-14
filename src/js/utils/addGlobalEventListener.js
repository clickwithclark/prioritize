/**
 * @function addGlobalEventListener
 * @param  {String} type - Event type eg. 'click'
 * @param  {String} selector - CSS selector eg. '#id', '.class'
 * @param  {Function} callback - Function
 *
 */

export function addGlobalEventListener(type, selector, callback) {
  try {
    document.addEventListener(type, (event) => {
      if (event.target.closest(selector)) {
        callback(event);
      }
    });
  } catch (error) {
    let errorCode = error?.code;
    let errorMessage = error?.message;
    console.error(
      "An error occurred in event listener: ",
      errorMessage,
      "Error Code: ",
      errorCode
    );
  }
}
