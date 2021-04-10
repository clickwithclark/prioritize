/**
 * Displays error message to user
 * @function tellUserAboutError
 * @param  {Error} error - the error caught
 * @param  {type} seconds - how long to display error to user in seconds
 */
export function tellUserAboutError(error, seconds = 3) {
  const speechBubble = document.querySelector('.bubble');
  const speechMessage = document.querySelector('.info-message');
  const logo = document.querySelector('#logo');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  logo.src = '../assets/img/oops.png';
  speechBubble.style.visibility = 'visible';
  speechMessage.textContent = error.message;
  setTimeout(() => {
    speechBubble.style.visibility = 'hidden';
    speechMessage.textContent = '';
    // needed to remove shine from hair that stays when image is just replaced!
    logo.src = '';
    logo.src = '../assets/img/cwc.png';
  }, seconds * 1000);
}
