import { resetAppUI } from '../todos/deleteAllTodos.js';
import { updateDOM } from './updateDOM.js';

const appContainer = document.querySelector('.app-container'); // Main application container
const logo = document.querySelector('#logo'); // Logo element
const appName = document.querySelector('.app-name'); // Application name element
const popUp = document.querySelector('.confirmation-popup'); // Popup element for the tutorial
const logoContainer = document.querySelector('.logo-container'); // Logo container element

let childrenToReplace; // Stores the original children of the popup

/**
 * Displays the tutorial instructions in a popup.
 * Blurs the main UI, replaces the popup content with instructions, and disables scrolling.
 * Adds an event listener to close the tutorial when clicking outside the popup.
 *
 * @function tutorial
 * @returns {void}
 */
export function tutorial() {
  // Blur the main UI and activate the tutorial popup
  appContainer.classList.add('blur');
  logo.classList.add('negate-blur');
  logoContainer.classList.add('negate-blur');
  appName.classList.add('negate-blur');
  popUp.classList.add('active', 'tutorial', 'negate-blur');
  document.body.style.overflowY = 'hidden'; // Disable vertical scrolling

  // Create and style the tutorial heading
  const heading = document.createElement('h1');
  heading.innerText = 'Instructions';
  heading.style.fontFamily = 'CabinSketch';

  // Store the original children of the popup and replace them with the tutorial content
  childrenToReplace = [...popUp.children];
  popUp.replaceChildren();

  // Create the tutorial instructions
  const instructions = document.createElement('div');
  const guide = document.createElement('p');
  instructions.append(heading);
  instructions.append(guide);

  // Add the tutorial content
  guide.innerHTML = `
  <ol>
    <li><p>To enter a basic task just give it a name and press enter.</p></li>
    <hr>
    <li><p>To enter a task and assign it a <span class="good">category</span>, put the category inside parentheses <span class="good">( )</span>.
    <br>e.g. (Math) calculus or (Math) fractions.</p></li>
    <hr>
    <li><p>To enter multiple tasks at once, separate each task with a comma <span class="good">,</span>.
    <br>e.g. Walk the dog<span class="good">,</span> pick up milk<span class="good">,</span> call Jane.</p></li>
    <hr>
    <li><p>You can also include categories with them!
    <br>e.g. (Rufus) Walk the dog<span class="good">,</span> (Supermarket) pick up milk<span class="good">,</span> (Visiting this summer) call Jane.</p></li>
    <hr>
    <li><p>To group tasks under one category, use a colon <span class="good">:</span> after the category.
    <br>e.g. <span class="good">(Grocerylist): eggs, cheese, bread</span></p></li>
  </ol>
  <button class="tutorial-ok-btn"><i class="fas fa-check"></i></button>
  `;

  // Style the tutorial content
  guide.classList.add('guide');
  instructions.classList.add('instructions');

  // Add the instructions to the popup and scroll to the top
  popUp.appendChild(instructions);
  popUp.scrollTo({ top: 0, behavior: 'smooth' });

  // Add an event listener to close the tutorial when clicking outside the popup
  document.addEventListener('pointerdown', (event) => {
    const isClickedInside = popUp.contains(event.target);

    // Ignore clicks on the tutorial button itself
    if (event.target.closest('.tutorial-btn')) {
      return;
    }

    // Ignore clicks if the tutorial is not active
    if (!popUp.classList.contains('active')) {
      return;
    }

    // Close the tutorial if clicking outside the popup
    if (!isClickedInside) {
      tutorialOk(event);
    }
  });
}

/**
 * Closes the tutorial and restores the original popup content.
 * Resets the UI and updates the DOM.
 *
 * @function tutorialOk
 * @param {Event} event - The event object triggered by the close action.
 * @returns {void}
 */
export function tutorialOk(event) {
  event.preventDefault(); // Prevent default behavior
  popUp.replaceChildren(...childrenToReplace); // Restore the original popup content
  resetAppUI(); // Reset the application UI
  updateDOM(); // Refresh the DOM
}
