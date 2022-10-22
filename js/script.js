const complete = document.getElementById("complete");
const incomplete = document.getElementById("incomplete");

var todo;

window.addEventListener("load", (ev) => {
    callList()
  
})

function callList() {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=15')
        .then((response) => {
            return response.json();
        }).then((json) => {
            todo = json;
            showTodo(todo);
        }).catch(err => {
            console.log(err);
        });
}

function showTodo(todos){
    var completedTodo = todos.filter(todo => todo.completed);
    var incompletedTodo = todos.filter(todo => !todo.completed);

    complete.replaceChildren();
    incomplete.replaceChildren();
    completedTodo.forEach(element => {
        let todo_span = document.createElement("span");
        todo_span.className = 'complete';
        todo_span.innerText = element.title;
        complete.appendChild(todo_span);
    });

    incompletedTodo.forEach(element => {
        let todo_span = document.createElement("span");
        todo_span.className = 'incomplete';
        todo_span.innerText = element.title;
        incomplete.appendChild(todo_span);
    });



}


