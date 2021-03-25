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
      callback(event);
    }
  });
}
