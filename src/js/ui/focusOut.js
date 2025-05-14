import { updateDOM } from './updateDOM.js';
import { clearUpdateConfig } from '../firebase/firebase.js';
import { endUpdate } from '../todos/endUpdate.js';

export function focusOut(event) {
  endUpdate(event.target);
  clearUpdateConfig();
  updateDOM();
}
