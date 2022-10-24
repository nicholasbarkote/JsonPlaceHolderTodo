const complete = document.getElementById("complete");
const incomplete = document.getElementById("incomplete");
const submit = document.getElementById("submitTodo");
const result = document.getElementById("TodoInput");

var todo;

window.addEventListener("load", (ev) => {
    callList();
});

submit.addEventListener('click', (e) => {
    let todoMsg;
    let todoValid;
    if (result.value === '' || result.value == null) {
        alert("Input field cannot be empty");
        todoValid = false;
    } else {
        todoMsg = result.value;
        todoValid = true;
    }
    if (todoValid) {
        result.value = "";
        addToDo(todoMsg);
        alert("Success new To Do added");

    }
});

function addToDo(Msg) {
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify({
            title: Msg,
            completed: false,
            userId:1,
            id:1 
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log("This "+json.id);
            console.log("This "+json.userId);
            console.log("This "+json.title);
            console.log("This "+json.completed);
            todo.push(json);
            showTodo();
        });

}


function callList() {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then((response) => {
            return response.json();
        }).then((json) => {
            todo = json;
            showTodo();
        }).catch(err => {
            console.log(err);
        });
}

function showTodo() {

    showPage();

    complete.replaceChildren();
    incomplete.replaceChildren();

    todo.forEach((element, index) => {
        if (element.completed) {
            let todo_span = document.createElement("span");
            todo_span.className = 'complete';
            todo_span.innerText = element.title;
            complete.appendChild(todo_span);
        } else {
            let todo_span = document.createElement("div");
            todo_span.className = 'incomplete';
            todo_span.innerHTML =
                `
            <span>${element.title}</span>
            <input type="checkbox" id="checkboxtrue" onclick="checkTrue(${index})"/>
            `;
            incomplete.appendChild(todo_span);
        }
    });



}
function checkTrue(index) {

    console.log("This is the index " + index);  
    document.getElementById("loadercomplete").style.display = "block";
    document.getElementById("loaderincomplete").style.display = "block";
    document.getElementById("complete").style.display = "none";
    document.getElementById("incomplete").style.display = "none";

    let currentTodo = todo[index];
    let id;
    if(currentTodo.id != 1){
        id = 1
    }
    let url = "https://jsonplaceholder.typicode.com/todos/" + id;

    fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            userId: currentTodo.userId,
            id: currentTodo.id,
            title: currentTodo.title,
            completed: true,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            todo[index] = json;
            showTodo();
        });
}


function showPage() {
    document.getElementById("loadercomplete").style.display = "none";
    document.getElementById("loaderincomplete").style.display = "none";
    document.getElementById("complete").style.display = "block";
    document.getElementById("incomplete").style.display = "block";
}