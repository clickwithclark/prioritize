import oopsSource from '../../assets/img/oops.png';
import normalSource from '../../assets/img/cwc.png';

const speechBubble = document.querySelector('.bubble'); // Speech bubble element for displaying messages
const logo = document.querySelector('#logo'); // Logo element for visual feedback

/**
 * Resets the logo and speech bubble to their default states.
 * Hides the speech bubble and restores the logo to its normal state.
 *
 * @function resetLogo
 */
export function resetLogo() {
  speechBubble.style.visibility = 'hidden';
  speechBubble.textContent = '';
  // Needed to remove 'shine' from hair that stays when the image is just replaced!
  logo.src = '';
  logo.src = normalSource;
}

/**
 * Displays an error message to the user.
 * Changes the logo to an "oops" state and shows the message in the speech bubble.
 * Automatically resets the logo and speech bubble after the specified time.
 *
 * @function feedbackMessage
 * @param  {String} message - The message to display to the user.
 * @param  {Number} [seconds=3] - How long to display the message in seconds (default is 3 seconds).
 */
export function feedbackMessage(message, seconds = 3) {
  resetLogo(); // Reset the logo and speech bubble before displaying the message
  // window.scrollTo({ top: 0, behavior: 'smooth' }); // Optional: Scroll to the top of the page
  logo.src = oopsSource; // Change the logo to the "oops" state
  speechBubble.style.visibility = 'visible'; // Make the speech bubble visible
  speechBubble.innerHTML = message; // Display the message in the speech bubble

  // Reset the logo and speech bubble after the specified time
  setTimeout(() => {
    resetLogo();
  }, seconds * 1000);
}

/**
 * Displays a normal message to the user.
 * Shows the message in the speech bubble without changing the logo.
 * Automatically resets the speech bubble after the specified time.
 *
 * @function feedbackMessageNormal
 * @param  {String} message - The message to display to the user.
 * @param  {Number} [seconds=3] - How long to display the message in seconds (default is 3 seconds).
 */
export function feedbackMessageNormal(message, seconds = 3) {
  resetLogo(); // Reset the logo and speech bubble before displaying the message
  // window.scrollTo({ top: 0, behavior: 'smooth' }); // Optional: Scroll to the top of the page
  speechBubble.style.visibility = 'visible'; // Make the speech bubble visible
  speechBubble.textContent = message; // Display the message in the speech bubble

  // Reset the speech bubble after the specified time
  setTimeout(() => {
    resetLogo();
  }, seconds * 1000);
}
