import { feedbackMessage } from '../utils/feedbackMessage.js';
import { debounce } from '../utils/debounce.js';

/* -------------------------------------------------------------------*/
// #region [save to Database]
/* -------------------------------------------------------------------*/

/**
 * Reminds the user to sign in and save their tasks.
 * Displays a feedback message, debounced to prevent excessive reminders.
 *
 * @constant {Function} remindUserToSave
 */
const remindUserToSave = debounce(
  () => feedbackMessage('PSSSST!\nSign in to sync your tasks across devices! ', 6),
  5
);

export { remindUserToSave };
