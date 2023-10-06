// image written this way for webpack
const oopsSource = require('../assets/img/oops.png');
const normalSource = require('../assets/img/cwc-shades.png');

const speechBubble = document.querySelector('.bubble');
const logo = document.querySelector('#logo');

export function resetLogo() {
  speechBubble.style.visibility = 'hidden';
  speechBubble.textContent = '';
  // needed to remove 'shine' from hair that stays when image is just replaced!
  logo.src = '';
  logo.src = normalSource;
}

/**
 * Displays a message to user
 * @function feedbackMessage
 * @param  {String} message - the message to user
 * @param  {Number} [seconds] - how long to display message to user in seconds, 3 is default
 *
 */

export function feedbackMessage(message, seconds = 3) {
  resetLogo();
  // window.scrollTo({ top: 0, behavior: 'smooth' });
  logo.src = oopsSource;
  speechBubble.style.visibility = 'visible';
  speechBubble.innerHTML = message;

  setTimeout(() => {
    resetLogo();
  }, seconds * 1000);
}

export function feedbackMessageNormal(message, seconds = 3) {
  resetLogo();
  // window.scrollTo({ top: 0, behavior: 'smooth' });
  speechBubble.style.visibility = 'visible';
  speechBubble.textContent = message;

  setTimeout(() => {
    resetLogo();
  }, seconds * 1000);
}
