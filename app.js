

// Selectors 
const doInput = document.querySelector(".do-input");
const doButton = document.querySelector(".do-button");
const doList = document.querySelector(".do-list");
const filterOption = document.querySelector(".filter-todo")

// Event Listener
document.addEventListener('DOMContentLoaded',getTodos)
doButton.addEventListener('click', addTodo);
doList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

// Functions

function addTodo(event) {
    // Prevent form submitting submite tıkladığımızda sayfanın yenilenmesini engelliyor
    event.preventDefault();
    // Todo DIV
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");
    // Create LI
    const newToDo = document.createElement("li");
    newToDo.innerText = doInput.value;
    if (doInput.value == ""){
        alert("Boş Bırakılmaz");
        doList.appendChild(toDoDiv) = false
    }
    newToDo.classList.add("todo-item")
    toDoDiv.appendChild(newToDo);
    // ADD TODO TO LOCALSTORAGE
    saveLocalTodos(doInput.value);
    // Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn");
    toDoDiv.appendChild(completedButton)
    // Delete button
    const removeButton = document.createElement("button");
    removeButton.innerHTML = '<i class="fas fa-trash"></i>'
    removeButton.classList.add("trash-btn");
    toDoDiv.appendChild(removeButton)
    // APPEND TO LİST
    doList.appendChild(toDoDiv);
    // Clear Todo INPUT VALUE input valuenın içi sıfırlanacak
    doInput.value = ""
}

function deleteCheck(event){
    event.preventDefault()
    const item = event.target;
    //Delete Todo
    if (item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add("fall"); // animasyon kullanıldı
        removeLocalTodo(todo);
        todo.addEventListener("transitionend",function(){
            todo.remove(); // animasyon kullanım sonrası silme işlemi için
        });
    }

    //Check mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }  
}

function filterTodo(event){
    const todos = doList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case "All":
                todo.style.display = "flex"
                break;
            case "Completed":
            if (todo.classList.contains("completed")){
                todo.style.display = "flex";
            } else{
                todo.style.display = "none"
            }
                break;
            case "Uncompleted":
                if (!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}

function saveLocalTodos(todo){
    let uct;
    if(localStorage.getItem('uct') === null){
        uct = [];
    } else {
        uct = JSON.parse(localStorage.getItem('uct'));
    }
    uct.push(todo);
    localStorage.setItem('uct',JSON.stringify(uct));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
    // Todo DIV
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");
    // Create LI
    const newToDo = document.createElement("li");
    newToDo.innerText = todo;
    newToDo.classList.add("todo-item")
    toDoDiv.appendChild(newToDo);  
    // Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn");
    toDoDiv.appendChild(completedButton)
    // Delete button
    const removeButton = document.createElement("button");
    removeButton.innerHTML = '<i class="fas fa-trash"></i>'
    removeButton.classList.add("trash-btn");
    toDoDiv.appendChild(removeButton)
    // APPEND TO LİST
    doList.appendChild(toDoDiv);
    });
}

function removeLocalTodo(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos",JSON.stringify(todos))
}
