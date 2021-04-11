const speechBubble = document.querySelector('.bubble');
const speechMessage = document.querySelector('.info-message');
const logo = document.querySelector('#logo');

export function resetLogo() {
  speechBubble.style.visibility = 'hidden';
  speechMessage.textContent = '';
  // needed to remove 'shine' from hair that stays when image is just replaced!
  logo.src = '';
  logo.src = '../assets/img/cwc.png';
}

/**
 * Displays a message to user
 * @function feedbackMessage
 * @param  {String} message - the message to user
 * @param  {Number} [seconds] - how long to display message to user in seconds, 3 is default
 *
 */

export function feedbackMessage(message, seconds = 3) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  logo.src = '../assets/img/oops.png';
  speechBubble.style.visibility = 'visible';
  speechMessage.textContent = message;

  setTimeout(() => {
    resetLogo();
  }, seconds * 1000);
}

export function feedbackMessageNormal(message, seconds = 3) {
  resetLogo();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  speechBubble.style.visibility = 'visible';
  speechMessage.textContent = message;

  setTimeout(() => {
    resetLogo();
  }, seconds * 1000);
}
