// prevent HTML injection

const escapeHtml = (text) => {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) {
        return map[m];
    });
};
/* eslint-disable require-jsdoc */
/**
 *quickly build array of list items to populate UI as default
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
        setDemoStatus: function(currentState) {
            isDemo = currentState;
        },
        /**
         * Retrieves the demo status
         * @function getDemoStatus
         * @return {Boolean} The current demo status
         */
        getDemoStatus: function() {
            return isDemo;
        },
        getDemoStorage: function() {
            return demoStorage;
        },
        setDemoStorage: function(list) {
            demoStorage = list;
        },
        /**
         * Populates UI with default todos as a demo of the app
         * if no todos are found in storage
         * @function runDemo
         * @param  {Array} ...listOfDemoTodos Takes a list of todos
         * @return {undefined}
         */
        runDemo: function(...listOfDemoTodos) {
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
                document
                    .querySelector('.date-sort > svg')
                    .classList.add('intro');
                checkForUserInput();
                await sayToUser('The First button lets you sort by date', 5000);
                checkForUserInput();
                document
                    .querySelector('.category-button > svg')
                    .classList.add('intro');
                checkForUserInput();
                await sayToUser(
                    'The Second button lets you sort by category',
                    5000
                );
                checkForUserInput();
                document
                    .querySelector('.drop-down-entry > svg')
                    .classList.add('intro');

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
        }
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
        let storedTodos = manageCreatedTodos.show();
        if (storedTodos.length !== 0) {
            demolist = storedTodos;
        }
        if (demolist !== undefined) {
            const ul = document.querySelector('.app-container ul');
            demolist.forEach((todo) => {
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
            .addEventListener('keyup', (event) => {
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
                    } else {
                        $("input[type='text']").removeClass('shake');
                    }

                    // remove demo values if valid submission is being entered
                    demo.setDemoStatus(false);
                    // clear UI
                    UI.clearTodos();

                    manageCreatedTodos.getInput(
                        escapeHtml(event.target.value.trim())
                    );
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

class Todo {
    constructor(note, category = undefined) {
        category = category === undefined ? '' : `[${category}]`;
        let generatedId = idTracker.getNewID();

        Object.defineProperties(this, {
            id: {
                value: generatedId,
                writable: false,
                configurable: false
            },
            date: { value: new Date() },
            formattedDate: {
                value: `${new Date().getDate()}-${new Date().getMonth() +
                    1}-${new Date().getFullYear()}`
            },
            note: {
                // eslint-disable-next-line max-len

                value: note = `<span><i class="far fa-check-square"></i></span> ${category} ${note} <span class="grip"><i class="fas fa-arrows-alt-v"></i></span>`
            },
            category: {
                value: category
            }
        });
    }

    get summary() {
        const aTodo = {
            id: this.id,
            note: this.note,
            formattedDate: this.formattedDate,
            date: this.date,
            category: this.category
        };
        return aTodo;
    }
}

/**
 * @function manageCreatedTodos
 *
 * @return {Object}  Object with closure on an array called list
 */
const manageCreatedTodos = (function() {
    let list = [];

    return {
        /**
         *Add a todo to storage by retrieving data from localStorage store in manageCreatedTodos's
         * list array, appends new Todo to the list, saves updated list to localStorage
         * @param  {Todo} message accepts the content of the todo
         * @return {Boolean} success as true and failure as false
         */
        create: function(message) {
            let category = undefined;

            // check for the presence of categories
            if (message.indexOf('(') !== -1) {
                category = message.match(/\((.*)\)/).pop();
                // remove category from being included in a todo body
                message = message.replace(`(${category})`, '');
                //  message += escapeHtml(message);
            }

            const todo = new Todo(message, category);
            list.push(todo.summary);

            return this.save();
        },
        createManyTodos: function(note) {
            const list = note.split(',');
            list.forEach((listItem) => {
                manageCreatedTodos.create(listItem);
            });
        },

        /**
         *@return {Number} the number of todo NOT committed to storage
         */
        count: function() {
            return list.length;
        },

        /**
         * Serializes the list of Todos that are NOT committed
         * to storage to JSON format
         * @return {String} JSON String
         */
        formatForLocalStorage: function() {
            return JSON.stringify(list);
        },
        /**
         * Remove a todo from storage
         * @param  {Number} id The ID number of the Todo item to remove
         * @return {Boolean} success as true and failure as false
         */
        remove: function(id) {
            let idDoesExist = false;
            this.show();
            list.filter((listObject) => {
                if (listObject.id == id) {
                    return (idDoesExist = true);
                }
            });

            if (idDoesExist) {
                list = list.filter((listObject) => {
                    return listObject.id != id;
                });
                return this.save();
            }
            return false;
        },
        removeAll: function() {
            localStorage.removeItem('todos');
            list = [];
        },
        /**
         * @return {Array} An array of all todos
         */
        show: function() {
            list = JSON.parse(localStorage.getItem('todos')) || [];
            // when all todo's are deleted, reset id number generator
            if (list.length === 0) {
                idTracker.reset();
            }

            return list;
        },
        /**
         * Stores whatever todos are in list array to localStorage
         * @return {Boolean} success as true and failure as false
         */
        save: function() {
            localStorage.setItem('todos', this.formatForLocalStorage(list));
            const aList = this.show();

            if (aList.length > 0) {
                return true;
            }

            return false;
        },
        getInput: function(note) {
            if (note.indexOf(',') !== -1) {
                // check if input is a string or a comma seperated list
                // if list detected, pass to function to create a list of todos from one input instead

                return this.createManyTodos(note);
            }
            this.create(note);
        },

        set: function(newList) {
            /* if its a demo, use demo storage not main storage */

            if (newList.length < 1) {
                // throw new Error('The list passed is empty');
                // use demo items since there is nothing in storage
                list = demo.getDemoStorage();
                return;
            }
            list = newList;
            this.save();

            const aList = this.show();

            if (aList.length > 0) {
                return true;
            }

            return false;
        },
        update: function(id, note, category = undefined) {
            let updateCategory = category == undefined ? '' : `[${category}]`;

            let newNote = `<span><i class="far fa-check-square"></i></span> ${updateCategory} ${note} <span class="grip"><i class="fas fa-arrows-alt-v"></i></span>`;
            let idDoesExist = false;
            this.show();
            list.filter((listObject) => {
                if (listObject.id == id) {
                    return (idDoesExist = true);
                }
            });

            if (idDoesExist) {
                list.map((listObject) => {
                    if (listObject.id === id) {
                        listObject.category = category;
                        listObject.note = newNote;
                    }
                });
                return this.save();
            }
            return false;
        },
        setCompletedState: function(id) {
            /* ignore if in demo mode */
            if (demo.getDemoStorage() > 1) {
                return;
            }
            let idDoesExist = false;
            this.show();
            list.filter((listObject) => {
                if (listObject.id == id) {
                    return (idDoesExist = true);
                }
            });

            if (idDoesExist) {
                list.map((listObject) => {
                    if (listObject.id === id) {
                        listObject.isCompleted =
                            !listObject.isCompleted && true;
                    }
                });
                return this.save();
            }
        }
    };
})();

const idTracker = (() => {
    let id = 1;
    return {
        getNewID: function() {
            this.retrieveStoredId();
            id++;
            this.storeId();
            return id;
        },

        storeId: function() {
            localStorage.setItem('noteIds', id);
        },
        retrieveStoredId: function() {
            id = localStorage.getItem('noteIds') || 0;
        },
        reset: function() {
            id = 0;
            this.storeId();
        }
    };
})();

// sortable List Items use Jquery UI
$(() => {
    $('.list-group').sortable({
        handle: '.grip',
        forcePlaceholderSize: true,
        placeholder: 'place-holder',
        stop: function(event, ui) {
            /* ignore if no todos are stored */
            if (demo.getDemoStorage().length > 1) {
                return;
            }
            if (event.type == 'sortstop') {
                /* store todo id's in the order they are sorted, 
                when sorting is done */
                let positions = [];
                let elements = document.querySelectorAll(
                    '.app-container ul>li'
                );
                elements.forEach((element) => {
                    /* populate new array with id's in new sorted order */
                    positions.push(Number(element.getAttribute('data-id')));
                });

                let todosFromStorage = manageCreatedTodos.show();

                let todoIdsAndTheirPositions = {};
                let todosInStorage = {};
                let newList = [];

                /* store todos by their id */
                for (const todo of todosFromStorage) {
                    todosInStorage[todo.id] = todo;
                }
                /* store todo id as property and array index position in sorted list as value  */
                for (const todoId of positions) {
                    todoIdsAndTheirPositions[todoId] = positions.indexOf(
                        todoId
                    );
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
        }
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
            let id = Number(event.target.getAttribute('data-id'));
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
            let selectedTodos = document.querySelectorAll(
                '.app-container ul>li> span.clickedLi'
            );
            selectedTodos.forEach((element) => {
                let id = Number(element.parentNode.getAttribute('data-id'));
                // fadeOut & delete todo from storage
                let s = element.parentNode.style;
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
const unEscapeHtml = (text) => {
    const map = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'"
    };

    return text.replace(/[&amp;&lt;&gt;&quot;&#039;]/g, function(m) {
        return map[m];
    });
};

// display information messages to user

const info = (message) => {
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
    return new Promise((resolve) => {
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

let doDateSort = (function() {
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
        sort: function() {
            /* check if user ever entered a todo 
             since demo storage is cleared when user makes
             a new entry
            */
            toSort =
                demo.getDemoStorage().length > 1
                    ? demo.getDemoStorage()
                    : manageCreatedTodos.show();

            toSort.sort((x, y) => {
                let a = x.date;
                let b = y.date;

                return flipSort(a, b);
            });
            // toggle sort direction
            flip *= -1;

            demo.getDemoStorage().length > 1
                ? demo.setDemoStorage(toSort)
                : manageCreatedTodos.set(toSort);
        }
    };
})();

let doCategorySort = (function() {
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
        sort: function() {
            toSort =
                demo.getDemoStorage().length > 1
                    ? demo.getDemoStorage()
                    : manageCreatedTodos.show();

            toSort.sort((x, y) => {
                let a = x.category.toLowerCase();
                let b = y.category.toLowerCase();

                return flipSort(a, b);
            });
            // toggle sort direction
            flip *= -1;
            demo.getDemoStorage().length > 1
                ? demo.setDemoStorage(toSort)
                : manageCreatedTodos.set(toSort);
        },

        getSortedTodos: function() {
            return toSort;
        }
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
    return new Promise((resolve) => {
        s.opacity = 1;
        (function fade() {
            if ((s.opacity -= 0.1) < 0) {
                s.display = 'none';
                return resolve('fadeOver');
            } else {
                setTimeout(fade, 40);
            }
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
    return new Promise((resolve) => {
        // set opacity based on the current state of the element
        s.opacity =
            window.getComputedStyle(s).getPropertyValue('display') == 'none'
                ? 0
                : 1;

        if (s.opacity == 1) {
            // opacity goes from 1-0
            (function fade() {
                if ((s.opacity -= 0.1) < 0) {
                    s.display = 'none';
                    return resolve();
                } else {
                    setTimeout(fade, 40);
                }
            })();
        } else {
            // opacity goes from 0-1
            (function fade() {
                if ((s.opacity += 0.1) > 1) {
                    s.style.display = 'inline-block';
                    return resolve();
                } else {
                    setTimeout(fade, 40);
                }
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
            let text = event.target.textContent;
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
    let itemToUpdate = {};
    function updateIF2Seconds(event) {
        if (time >= 800) {
            clearInterval(mouseDownId);
            // change li to input
            let parent = event.target.parentNode;
            let input = document.createElement('input');
            // add data to input value
            input.setAttribute('value', `${itemToUpdate.text}`);
            parent.replaceChild(input, event.target);
            // focus cursor to input box
            input.focus();
            input.select();
            let allInputs = document.querySelectorAll(
                '.app-container ul>input'
            );
            allInputs.forEach((element) => {
                element.addEventListener('keyup', (event) => {
                    // if enter is pressed
                    if (event.which === 13) {
                        // check for the presence of categories
                        let updatedText = event.target.value;
                        itemToUpdate.text = updatedText;
                        if (updatedText.indexOf('(') !== -1) {
                            itemToUpdate.category = updatedText
                                .match(/\((.*)\)/)
                                .pop();
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
