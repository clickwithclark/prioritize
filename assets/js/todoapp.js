// quickly build array of list items to populate UI as default
const getLiList = (...listItems) => {
    let list = '';
    listItems.forEach((element) => {
        let listItem = document.createElement('li');

        listItem.innerHTML = `<span><i class="far fa-check-square"></i></span> ${element} <span class="grip"><i class="fas fa-arrows-alt-v"></i></span>`;

        list += listItem.outerHTML;
    });
    return list;
};;

// demo data

const example = getLiList(
    'Eg. Call The Caterers',
    'Eg. Order Flower Arrangements',
    'Eg. Mail Guest Lists (Urgent)'
);

// UI Class
class UI {
    static showNotes() {
        let storedNotes = getNotes();;

        if (storedNotes.length === 0) {
            storedNotes = example;
        }
        let list = document.querySelector('.app-container ul');
        $(list).append(storedNotes);
    }

    static addNoteToList() {
        document
            .querySelector("input[type='text']")
            .addEventListener('keyup', (event) => {
                // when enter is pressed
                if (event.which === 13) {
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

                    // remove default values if it's the first submission
                    let notes = getNotes();
                    if (notes.length === 0) {
                        $('.app-container ul').empty();
                        $('.app-container ul').append(
                            getLiList(escapeHtml(event.target.value))
                        );
                        saveState();
                        // UI.showNotes();
                        return;
                    }
                    // if not first note, append list at once

                    $('.app-container ul').append(
                        getLiList(escapeHtml(event.target.value))
                    );
                    saveState();
                    $('.app-container ul').empty();
                    UI.showNotes();

                    /* clear field after enter*/

                    event.target.value = '';
                }
            });
    }
}

// Storage

const getNotes = () => {
    let notes;
    if (localStorage.getItem('notes') != null) {
        notes = localStorage.getItem('notes');
    } else {
        notes = [];
    }

    return notes;
};;

const saveState = () => {
    let notes = $('.app-container ul')
        .html()
        .trim();;

    localStorage.setItem('notes', notes);
};;
// sortable List Items us Jquery UI
$(() => {
    $('.list-group').sortable({
        handle: '.grip',
        forcePlaceholderSize: true,
        placeholder: 'place-holder'
    });
    $('.list-group').disableSelection();
});
// using TouchPunch to get sortable list on moblie devices
// prevents click events button added to enable/disable sorting
//

$('.save-button').on('click', (event) => {
    saveState();
});

// Event:Display Note
document.addEventListener('DOMContentLoaded', UI.showNotes);

// '+'  toggle button pressed, show input field
$('.drop-down-entry').click(() => {
    $("input[type='text']").fadeToggle();;
    // prevent animation from repeating
    // when input field is hidden
    $("input[type='text']").removeClass('shake');;
});;

// Event: Add Note
UI.addNoteToList();

// Event: clicked Notes
$('.app-container ul').on('click', 'li', (event) => {
    let strikedListItem = $(event.target);
    $(event.target.querySelector('span')).toggleClass('clickedLi');
    saveState();
    event.stopPropagation();;
});

// Event: Remove Note
$('.app-container ul').on('click', 'span', (event) => {
    // multi-delete feature
    // add strikeout before deleting list item

    $(' ul > li > span.clickedLi')
        .parent()
        .toggleClass('completed');
    $(' ul > li > span.clickedLi')
        .parent()
        .fadeOut(800, () => {
            // add check to see if any li exist in ui
            // then if none add default this way
            // you  must save after deleting

            $(' ul > li > span.clickedLi')
                .parent()
                .remove();
            saveState();
            let notes = getNotes();
            //ensure default notes are present if
            // no notes are saved
            if (notes.length === 0) {
                // prevent list made of default notes when they are deleted
                $('.app-container ul').empty();
                UI.showNotes();
            }
        });;
    event.stopPropagation();;
});;

// Event: Validate incorrect values

// prevent HTML injection

const escapeHtml = (text) => {
    let map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) {
        return map[m];
    });
};;

// display information messages to user

const info = (message) => {
    $("input[type='text']").addClass('shake');;
    $('#logo').attr('src', 'assets/img/oops.png');;
    $('#info-message').text(message);
    $(document).scrollTop(0);
    $('#info-bubble').css('visibility', 'visible');
    // hide message after 3 seconds
    setTimeout(() => {
        $('#info-bubble').css('visibility', 'hidden');
        $('#logo').attr('src', 'assets/img/cwc.svg');
    }, 3000);
};;

// easter egg: hit my head ten times and i'll talk
