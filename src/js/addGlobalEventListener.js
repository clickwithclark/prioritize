/**
 * @function addGlobalEventListener
 * @param  {String} type - Event type eg. 'click'
 * @param  {String} selector - CSS selector eg. '#id', '.class'
 * @param  {Function} callback - Function
 *
 */

export function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, (event) => {
    if (event.target.closest(selector)) {
     try {
       callback(event);
     } catch (error) {
       const errorCode = error.code;
       const errorMessage = error.message;
       console.error(
         "An error occurred in eventlistener: ",
         errorMessage,
         "Error Code: ",
         errorCode
       );
     }
    }
  });
}
