import { resetAppUI } from './deleteAllTodos.js';
import { updateDOM } from './updateDOM.js';

const appContainer = document.querySelector('.app-container');
const logo = document.querySelector('#logo');
const appName = document.querySelector('.app-name');
const popUp = document.querySelector('.confirmation-popup');
const logoContainer = document.querySelector('.logo-container');

let childrenToReplace;
export function tutorial() {
  appContainer.classList.add('blur');
  logo.classList.add('negate-blur');
  logoContainer.classList.add('negate-blur');
  appName.classList.add('negate-blur');
  popUp.classList.add('active');
  popUp.classList.add('tutorial');
  popUp.classList.add('negate-blur');
  document.body.style.overflowY = 'hidden';
  const heading = document.createElement('h1');
  heading.innerText = 'Instructions';
  heading.style.fontFamily = 'CabinSketch';
  childrenToReplace = [...popUp.children];
  popUp.replaceChildren();

  const instructions = document.createElement('div');
  const guide = document.createElement('p');
  instructions.append(heading);
  instructions.append(guide);

  guide.innerHTML = ` 
  
  <ol>
  <li><p>To enter a basic task just give it a name and press enter.</p> </li>
  <hr>
  <li><p>To enter a task and assign it a  <span class="good">category</span> put the category inside parentheses <span class="good">(&nbsp;&nbsp;&nbsp;&nbsp;)</span>
  </br>e.g. (Math) calculus or (Math) fractions.</p></li>
  <hr>
  <li>
  <p>  Entering a task one at a time can become tedious, so you can enter multiple tasks at a time by seperating each task by a comma <span class="good"> &nbsp;,</span> </br>
  e.g. Walk the dog<span class="good"> &nbsp;,</span> pick up milk<span class="good"> &nbsp;,</span> call Jane.</p>
  </li>
  <hr>
  <li><p>  You can also include categories with them!</br> e.g.(Rufus) Walk the dog<span class="good">&nbsp;,</span> (Supermarket)pick up milk<span class="good">&nbsp;,</span> (Visiting this summer)call Jane.  </p></li>
  <hr>
  <li>
  <p>  But what if you wanted to make a list all your task belonging to one category?</br>
you don't have to write... </br><span class="bad">(Grocerylist) eggs , (Grocerylist) cheese , (Grocerylist) bread</span> . . .</p></li>
<hr>
  <li><p> you can use a colon <span class="good">:</span> after the brackets to set
  all following task to that group.<br/>
  e.g. <span class="good">(Grocerylist) : eggs , cheese , bread</span>
</p></li>
</ol>


<button class="tutorial-ok-btn"><i class="fas fa-check"></i></button>


`;

  guide.classList.add('guide');
  instructions.classList.add('instructions');

  popUp.appendChild(instructions);
  popUp.scrollTo({ top: 0, behavior: 'smooth' });

  // add close on focus out

  document.addEventListener('pointerdown', (event) => {
    const isClickedInside = popUp.contains(event.target);
    // the tutorial button itself registers as an outside click so
    // ignore it
    console.log(event.target);
    if (event.target.closest('.tutorial-btn')) {
      return;
    }
    // ignore clicks if tutorial is not up contain the tutorial's classes
    if (!popUp.classList.contains('active')) {
      return;
    }
    if (!isClickedInside) {
      tutorialOk(event);
    }
  });
}

export function tutorialOk(event) {
  event.preventDefault();
  popUp.replaceChildren(...childrenToReplace);
  resetAppUI();
  updateDOM();
}
