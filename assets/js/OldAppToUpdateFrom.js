// prevent HTML injection
/* eslint-disable */
/* eslint-disable require-jsdoc */
/**
 *quickly build array of list items to populate UI with default values
 * @function demo
 * @return {Object} Object containing methods @function setDemoStatus
 */
const demo = (function() {
  let isDemo = true;
  let demoTodos;
  let demoStorage = [];
  return {
    /**
     * Sets the demo status
     * @function setDemoStatus
     * @param  {Boolean}  currentState represents the demo status
     * @return {undefined}
     */
    setDemoStatus(currentState) {
      isDemo = currentState;
    },
    /**
     * Retrieves the demo status
     * @function getDemoStatus
     * @return {Boolean} The current demo status
     */
    getDemoStatus() {
      return isDemo;
    },
    getDemoStorage() {
      return demoStorage;
    },
    setDemoStorage(list) {
      demoStorage = list;
    },
    /**
     * Populates UI with default todos as a demo of the app
     * if no todos are found in storage
     * @function runDemo
     * @param  {Array} ...listOfDemoTodos Takes a list of todos
     * @return {undefined}
     */
    runDemo(...listOfDemoTodos) {
      manageCreatedTodos.getInput(listOfDemoTodos.toString());
      demoTodos = manageCreatedTodos.show();
      demo.setDemoStorage(demoTodos);
      manageCreatedTodos.removeAll();
      idTracker.reset();
      UI.showTodos(this.getDemoStorage());
    },
    demoConversation: async function preparedConversationDemo() {
      document
        .querySelector("input[type='text']")
        .addEventListener('keypress', stopDemo);
      while (this.getDemoStatus()) {
        checkForUserInput();
        await sayToUser(
          'Hello There, thanks for checking out this project',
          4000
        );
        checkForUserInput();
        await sayToUser(
          'You can use the example task list below to get familiar with the controls',
          5000
        );
        checkForUserInput();
        document.querySelector('.date-sort > svg').classList.add('intro');
        checkForUserInput();
        await sayToUser('The First button lets you sort by date', 5000);
        checkForUserInput();
        document.querySelector('.category-button > svg').classList.add('intro');
        checkForUserInput();
        await sayToUser('The Second button lets you sort by category', 5000);
        checkForUserInput();
        document.querySelector('.drop-down-entry > svg').classList.add('intro');

        checkForUserInput();
        fadeOutToggle(document.querySelector("input[type='text']"));
        checkForUserInput();
        await sayToUser(
          'Finally to add a new task, use the add button...enjoy!',
          5000
        );
      }

      document
        .querySelector("input[type='text']")
        .removeEventListener('keypress', stopDemo);
    },
  };
})();
// UI Class
/**
 * Manage User Interface
 * @function UI
 * @param  {Array}  demolist a list of todos to populate the UI
 * @return {undefined}
 */
class UI {
  static showTodos(demolist = undefined) {
    // get todos from storage and populate UI if none found use demo todos
    const storedTodos = manageCreatedTodos.show();
    if (storedTodos.length !== 0) {
      demolist = storedTodos;
    }
    if (demolist !== undefined) {
      const ul = document.querySelector('.app-container ul');
      demolist.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.setAttribute('data-id', todo.id);
        listItem.innerHTML = todo.note;
        // preserve state of selected todo
        todo.isCompleted
          ? listItem.classList.add('completed')
          : listItem.classList.remove('completed');
        todo.isCompleted
          ? listItem.firstChild.classList.add('clickedLi')
          : listItem.firstChild.classList.remove('clickedLi');

        ul.append(listItem);
      });
      return;
    }
    if (demo.getDemoStorage().length > 1) {
      return this.showTodos(demo.getDemoStorage());
    }
    demo.runDemo(
      `Eg. Buy Tomatoes (Market), 
            Pack Lunch (field trip),
            Eg. feed the dog,
            Eg. Buy potatoes  (Market),
            Eg. pay bill (water),
            Eg. Buy Flowers (Anniversary)
            `
    );

    if (demo.getDemoStatus()) {
      demo.demoConversation();
    }
  }

  /**
   * Add a todo item
   * @function addNoteToList
   * @return {undefined}
   */
  static addNoteToList() {
    document
      .querySelector("input[type='text']")
      .addEventListener('keyup', event => {
        // when enter is pressed
        if (event.which === 13) {
          // remove all demo data from storage
          demo.setDemoStorage([]);
          // prevent submission of empty or space only entry
          if (event.target.value.trim() === '') {
            info('You Must Enter Something First!');
            // ensure every incorrect attempt shows an animation
            setTimeout(() => {
              $("input[type='text']").removeClass('shake');
            }, 401);
            return;
          }
          $("input[type='text']").removeClass('shake');

          // remove demo values if valid submission is being entered
          demo.setDemoStatus(false);
          // clear UI
          UI.clearTodos();

          manageCreatedTodos.getInput(escapeHtml(event.target.value.trim()));
          // update UI
          UI.showTodos();

          // clear field after enter
          event.target.value = '';
        }
      });
  }

  /**
   * Removes todos from UI
   * @function clearTodos
   * @return {undefined}
   */
  static clearTodos() {
    const ul = document.querySelector('.app-container ul');
    // faster than setting innerHtml=''
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
  }
}


t
/**
 * @function manageCreatedTodos
 *
 * @return {Object}  Object with closure on an array called list
 */



// sortable List Items use Jquery UI
$(() => {
  $('.list-group').sortable({
    handle: '.grip',
    forcePlaceholderSize: true,
    placeholder: 'place-holder',
    stop(event, ui) {
      /* ignore if no todos are stored */
      if (demo.getDemoStorage().length > 1) {
        return;
      }
      if (event.type == 'sortstop') {
        /* store todo id's in the order they are sorted, 
                when sorting is done */
        const positions = [];
        const elements = document.querySelectorAll('.app-container ul>li');
        elements.forEach(element => {
          /* populate new array with id's in new sorted order */
          positions.push(Number(element.getAttribute('data-id')));
        });

        const todosFromStorage = manageCreatedTodos.show();

        const todoIdsAndTheirPositions = {};
        const todosInStorage = {};
        const newList = [];

        /* store todos by their id */
        for (const todo of todosFromStorage) {
          todosInStorage[todo.id] = todo;
        }
        /* store todo id as property and array index position in sorted list as value  */
        for (const todoId of positions) {
          todoIdsAndTheirPositions[todoId] = positions.indexOf(todoId);
        }

        /*  rearrange list of todos */
        for (const id in todoIdsAndTheirPositions) {
          /* store todos by their sorted index position */
          newList[todoIdsAndTheirPositions[id]] = todosInStorage[id];
        }
        /* update Storage with new postioning  */
        manageCreatedTodos.removeAll();
        idTracker.reset();
        manageCreatedTodos.set(newList);
        /* update UI */
        UI.clearTodos();
        UI.showTodos();
      }
    },
  });
  $('.list-group').disableSelection();
});
// using TouchPunch to get sortable list on mobile devices
// prevents click events button added to enable/disable sorting
//

// Event:Display Notes on load
document.addEventListener('DOMContentLoaded', UI.showTodos());

// '+'  toggle button pressed, show input field
$('.drop-down-entry').click(() => {
  $("input[type='text']").fadeToggle();
  // prevent animation from repeating
  // when input field is hidden
  $("input[type='text']").removeClass('shake');
});

// Event: Add event listener for enter key to capture notes
UI.addNoteToList();

document.addEventListener(
  'click',
  function(event) {
    // selected completed todos
    if (event.target.matches('.app-container ul>li')) {
      const id = Number(event.target.getAttribute('data-id'));
      manageCreatedTodos.setCompletedState(id);
      event.target.firstChild.classList.toggle('clickedLi');
      event.target.classList.toggle('completed');
      fadeOutToggle(event.target.firstChild);
    }

    // deleting completed todos
    if (
      event.target.matches(' span.clickedLi ') ||
      event.target.matches(' span.clickedLi > svg ')
    ) {
      /* multi-delete */
      // when attempting a delete, find all other selected todos
      // and delete them as well
      const selectedTodos = document.querySelectorAll(
        '.app-container ul>li> span.clickedLi'
      );
      selectedTodos.forEach(element => {
        const id = Number(element.parentNode.getAttribute('data-id'));
        // fadeOut & delete todo from storage
        const s = element.parentNode.style;
        fadeAndDelete(s, id)();
      });
    }

    // sort by date
    if (
      event.target.matches('.date-sort') ||
      event.target.matches('.date-sort > svg ') ||
      event.target.matches('.date-sort > svg > path')
    ) {
      doDateSort.sort();

      UI.clearTodos();
      UI.showTodos();
      stopDemo();
    }

    // sort by category
    if (
      event.target.matches('.category-button') ||
      event.target.matches('.category-button > svg ') ||
      event.target.matches('.category-button > svg > path')
    ) {
      // sort todos based on boolean
      doCategorySort.sort();

      UI.clearTodos();
      UI.showTodos();
      stopDemo();
    }

    // sort by category
  },
  false
);

// undo escape for update purposes
const unEscapeHtml = text => {
  const map = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
  };

  return text.replace(/[&amp;&lt;&gt;&quot;&#039;]/g, function(m) {
    return map[m];
  });
};

// display information messages to user

const info = message => {
  $("input[type='text']").addClass('shake');
  $('#logo').attr('src', 'assets/img/oops.png');
  $('#info-message').text(message);
  $(document).scrollTop(0);
  $('#info-bubble').css('visibility', 'visible');
  // hide message after 3 seconds
  setTimeout(() => {
    $('#info-bubble').css('visibility', 'hidden');
    $('#logo').attr('src', 'assets/img/cwc.svg');
  }, 3000);
};

function sayToUser(message, time) {
  return new Promise(resolve => {
    (function talk() {
      $('#info-message').text(message);
      $('#info-bubble').css('visibility', 'visible');
      // hide message after 3 seconds
      setTimeout(() => {
        $(document).scrollTop(0);
        $('#info-bubble').css('visibility', 'hidden');
        resolve();
      }, time);
    })();
  });
}

function stopDemo() {
  demo.setDemoStatus(false);
}

const doDateSort = (function() {
  let toSort = [];
  let flip = 1;
  /** Change the direction of the sort on each function call
   * @function flipSort
   * @param  {Element} a first element for comparison
   * @param  {Element} b second  element for comparison
   * @return {Number} Decision on whether [1] or not [-1] the element is correctly sorted
   */
  function flipSort(a, b) {
    // flip bool value for different sort on same button click
    return (b > a ? 1 : -1) * flip;
  }

  return {
    sort() {
      /* check if user ever entered a todo 
             since demo storage is cleared when user makes
             a new entry
            */
      toSort =
        demo.getDemoStorage().length > 1
          ? demo.getDemoStorage()
          : manageCreatedTodos.show();

      toSort.sort((x, y) => {
        const a = x.date;
        const b = y.date;

        return flipSort(a, b);
      });
      // toggle sort direction
      flip *= -1;

      demo.getDemoStorage().length > 1
        ? demo.setDemoStorage(toSort)
        : manageCreatedTodos.set(toSort);
    },
  };
})();

const doCategorySort = (function() {
  let toSort = [];
  let flip = 1;
  /** Change the direction of the sort on each function call
   * @function flipSort
   * @param  {Element} a first element for comparison
   * @param  {Element} b second  element for comparison
   * @return {Number} Decision on whether [1] or not [-1] the element is correctly sorted
   */
  function flipSort(a, b) {
    return (b > a ? 1 : -1) * flip;
  }

  return {
    sort() {
      toSort =
        demo.getDemoStorage().length > 1
          ? demo.getDemoStorage()
          : manageCreatedTodos.show();

      toSort.sort((x, y) => {
        const a = x.category.toLowerCase();
        const b = y.category.toLowerCase();

        return flipSort(a, b);
      });
      // toggle sort direction
      flip *= -1;
      demo.getDemoStorage().length > 1
        ? demo.setDemoStorage(toSort)
        : manageCreatedTodos.set(toSort);
    },

    getSortedTodos() {
      return toSort;
    },
  };
})();

// function demoConversation() {
//     if (demo.getDemoStatus()) {
//         preparedConversationDemo();
//     }
// }

function fadeAndDelete(s, id) {
  return async function() {
    await fadeOut(s);
    // remove from db
    manageCreatedTodos.remove(id);
    // removes li from ul
    UI.clearTodos();
    // populate ul with li's pulled from db
    UI.showTodos();
  };
}
// fade out an element
function fadeOut(s) {
  return new Promise(resolve => {
    s.opacity = 1;
    (function fade() {
      if ((s.opacity -= 0.1) < 0) {
        s.display = 'none';
        return resolve('fadeOver');
      }
      setTimeout(fade, 40);
    })();
  });
}

function checkForUserInput() {
  if (!demo.getDemoStatus()) {
    throw new Error('Demo Interrupted');
  }
}

/**
 * @function fadeOutToggle
 * @param  {DOM Element} s any element captured with document.querySelector
 * @return {Promise} allows for use inside async functions so that adjacent functions wait for fade to complete before running
 */

function fadeOutToggle(s) {
  return new Promise(resolve => {
    // set opacity based on the current state of the element
    s.opacity =
      window.getComputedStyle(s).getPropertyValue('display') == 'none' ? 0 : 1;

    if (s.opacity == 1) {
      // opacity goes from 1-0
      (function fade() {
        if ((s.opacity -= 0.1) < 0) {
          s.display = 'none';
          return resolve();
        }
        setTimeout(fade, 40);
      })();
    } else {
      // opacity goes from 0-1
      (function fade() {
        if ((s.opacity += 0.1) > 1) {
          s.style.display = 'inline-block';
          return resolve();
        }
        setTimeout(fade, 40);
      })();
    }
  });
}

const listenForUpdate = function() {
  let mouseDownId = null;
  let time = 0;
  document.addEventListener('mouseup', function clearTimer(event) {
    if (event.target.matches('.app-container ul>li')) {
      if (mouseDownId != null) {
        clearInterval(mouseDownId);
        mouseDownId = null;
        time = 0;
      }
    }
  });
  document.addEventListener('mousedown', function howLongMouseDown(event) {
    if (event.target.matches('.app-container ul>li')) {
      if (mouseDownId === null) {
        mouseDownId = setInterval(() => {
          time += 200;
          updateIF2Seconds(event);
        }, 200);
      }
      // group data to update
      itemToUpdate.domElement = event.target;
      itemToUpdate.id = Number(event.target.getAttribute('data-id'));
      const text = event.target.textContent;
      itemToUpdate.text = event.target.textContent;

      // check for the presence of categories
      if (text.indexOf('[') !== -1) {
        itemToUpdate.category = text.match(/\[(.*)\]/).pop();
        // remove category from being included in a todo body
        itemToUpdate.text = text.replace(
          `[${itemToUpdate.category}]`,
          `(${itemToUpdate.category})`
        );
        //  message += escapeHtml(message);
      }
    }
  });

  // store data to be updated
  const itemToUpdate = {};
  function updateIF2Seconds(event) {
    if (time >= 800) {
      clearInterval(mouseDownId);
      // change li to input
      const parent = event.target.parentNode;
      const input = document.createElement('input');
      // add data to input value
      input.setAttribute('value', `${itemToUpdate.text}`);
      parent.replaceChild(input, event.target);
      // focus cursor to input box
      input.focus();
      input.select();
      const allInputs = document.querySelectorAll('.app-container ul>input');
      allInputs.forEach(element => {
        element.addEventListener('keyup', event => {
          // if enter is pressed
          if (event.which === 13) {
            // check for the presence of categories
            const updatedText = event.target.value;
            itemToUpdate.text = updatedText;
            if (updatedText.indexOf('(') !== -1) {
              itemToUpdate.category = updatedText.match(/\((.*)\)/).pop();
              // remove category from being included in a todo body
              itemToUpdate.text = updatedText.replace(
                `(${itemToUpdate.category})`,
                ''
              );
              //  message += escapeHtml(message);
            }

            manageCreatedTodos.update(
              itemToUpdate.id,
              itemToUpdate.text,
              itemToUpdate.category
            );
            // update ui
            UI.clearTodos();
            UI.showTodos();
          }
        });
      });
    }
  }
};
document.addEventListener('DOMContentLoaded', listenForUpdate);

// easter egg: hit my head ten times and i'll talk
new Todo("dssd").