import { tutorialOk } from './tutorial.js';

export function hideTutorial(event) {
  event.preventDefault();
  const popUp = document.querySelector('.confirmation-popup');
  // if target constains tutorial and active class names
  // then close on outside click since user is probably
  // trying to close the tutorial pop up

  // the tutorial button istself registers as an outside click so
  // ignore it

  if (event.target.closest('.tutorial-btn')) {
    return;
  }
  // ignore clicks that dont contain the tutorial's classes
  if (
    !popUp.classList.contains('tutorial') &&
    !popUp.classList.contains('active')
  ) {
    return false;
  }
  if (!event.target.closest('.confirmation-popup')) {
    tutorialOk(event);
  }
}
