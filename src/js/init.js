import { observeUserState } from './firebase/observeUserState.js';
import { updateDOM } from './ui/updateDOM.js';

export function init() {
  observeUserState();
  updateDOM();
}
