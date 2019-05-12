// striked through clicked todos
$(".app-container ul").on("click", "li", (event) => {
    $(event.currentTarget).toggleClass("completed")
    Storage.saveState();
});

//delete todos

$(".app-container ul").on("click", "span", (event) => {
    $(event.currentTarget).parent().fadeOut(500, () => {
        $(event.currentTarget).parent().remove();
        Storage.saveState();
    })
    event.stopPropagation()

})



$("input[type='text']").on("keyup", (event) => {
    //create new todos when enter is pressed

    if (event.which === 13) {
        let markup = "<li><span><i class='fas fa-trash-alt'></i></span> " + event.target.value + "</li>"

        $(".app-container ul").append(markup);
        Storage.saveState();


        /*clear field after enter*/
        event.target.value = "";

    }
})

//input toggler

$(".app-container h1 span").click(() => {
    $("input[type='text']").fadeToggle()
})

class UI {
    static displayTodos() {
        let todos = '';
        if (localStorage.getItem('todos') === null) {
            
            todos = `<li><span><i class="fas fa-trash-alt"></i></span>Call The Caterers</li>
            <li><span><i class="fas fa-trash-alt"></i></span> Order Flower Arrangements</li>
            <li><span><i class="fas fa-trash-alt"></i></span> Prepare Grocery List</li>`;

        } else if (!(localStorage.getItem('todos').trim())) {
            todos = `<li><span><i class="fas fa-trash-alt"></i></span>Call The Caterers</li>
            <li><span><i class="fas fa-trash-alt"></i></span> Order Flower Arrangements</li>
            <li><span><i class="fas fa-trash-alt"></i></span> Prepare Grocery List</li>`;
        } else {
            todos = localStorage.getItem('todos');
            console.log('todos Loaded')
        }

        $(".app-container ul").append(todos);

    }
}

addEventListener('DOMContentLoaded', UI.displayTodos)

class Storage {




    static saveState() {
        let todos = $(".app-container ul").html()
        localStorage.setItem('todos', todos);
    }
}

