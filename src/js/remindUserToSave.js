import { feedbackMessage } from './feedbackMessage.js';
import { debounce } from './debounce.js';

/* -------------------------------------------------------------------*/
// #region [save to Database]
/* -------------------------------------------------------------------*/
const remindUserToSave = debounce(() => feedbackMessage('PSSSST!\nSign in to sync your tasks across devices! ', 6)
);
