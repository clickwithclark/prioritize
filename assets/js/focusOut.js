import { updateDOM } from './updateDOM.js';
import { clearUpdateConfig } from './localStorage.js';
import { endUpdate } from './endUpdate.js';

export function focusOut(event) {
  endUpdate(event.target);
  clearUpdateConfig();
  updateDOM();
}
