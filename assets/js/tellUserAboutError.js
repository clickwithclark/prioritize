export function tellUserAboutError(Error) {
  const speechBubble = document.querySelector('#info-bubble');
  const speechMessage = document.querySelector('#info-message');
  const logo = document.querySelector('#logo');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  logo.src = '../assets/img/oops.png';
  speechBubble.style.visibility = 'visible';
  speechMessage.textContent = Error.message;
  setTimeout(() => {
    speechBubble.style.visibility = 'hidden';
    speechMessage.textContent = '';
    // needed to remove shine from hair that stays when image is just replaced!
    logo.src = '';
    logo.src = '../assets/img/cwc.png';
  }, 3000);
}
