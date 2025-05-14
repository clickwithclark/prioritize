import { feedbackMessage } from '../utils/feedbackMessage.js';
import { debounce } from '../utils/debounce.js';

/* -------------------------------------------------------------------*/
// #region [save to Database]
/* -------------------------------------------------------------------*/
const remindUserToSave = debounce(() => feedbackMessage('PSSSST!\nSign in to sync your tasks across devices! ', 6), 5);
