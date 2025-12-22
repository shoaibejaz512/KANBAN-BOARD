let todosData = {};

let todos = document.querySelector("#Todos");
let progress = document.querySelector("#progress");
let done = document.querySelector("#done");
let allTodos = document.querySelectorAll(".todo");
let modelContainer = document.querySelector(".model-container");
let showModelButton = document.querySelector(".addBtn");
let inputVal = document.querySelector(".title");
let textAreaVal = document.querySelector(".description");
let todoAddBtton = document.querySelector(".addTaskButton");
let todoTitle = document.querySelector(".todo-title");
let todoDscription = document.querySelector(".todo-description");
let bg = document.querySelector(".bg");
let dragElement = null;
let timer = null;
let allColumns = [todos, progress, done];

if (localStorage.getItem("taskData")) {
    const data = JSON.parse(localStorage.getItem("taskData"));
    for (const col in data) {
        const column = document.querySelector(`#${col}`);
        data[col].forEach((task => {
            let todo = document.createElement("div");
            todo.classList.add("todo")
            todo.draggable = true;
            todo.addEventListener("drag", () => {
                dragElement = todo;
            })
            let template = `<div class="todo-title">
                            <h2 class="todo-title">${task.title}</h2>
                        </div>
                        <div class="todo-para">
                            <p class="todo-description">${task.description}</p>
                        </div>
                        <div class="del-button">
                            <button class="delButton">Deleted</button>
                        </div>`
            todo.innerHTML = template;
            todo.addEventListener("drag", () => {
                dragElement = todo;
            })
            column.appendChild(todo);

        }))
    }

    allColumns.forEach((col) => {
        let allTasks = col.querySelectorAll(".todo");
        let count = col.querySelector(".count")

        if (allTasks.length > 0) {
            count.innerText = allTasks.length;
        } else {
            count.innerText = 0
        }
    })

    //delted buttons 
    let deleteButtons = document.querySelectorAll(".delButton");
    deleTodos(deleteButtons);
}

allTodos.forEach((todo) => {
    todo.addEventListener("drag", (e) => {
        // console.log(e);
        dragElement = todo
    })
})

bg.addEventListener("click", () => {
    modelContainer.classList.remove("active");
})

showModelButton.addEventListener("click", () => {
    modelContainer.classList.add("active");
})

todoAddBtton.addEventListener("click", () => {
    let inputValue = inputVal.value;
    let textAreaValue = textAreaVal.value;
    let todo = document.createElement("div");
    todo.classList.add("todo")
    todo.draggable = true;
    todo.addEventListener("drag", () => {
        dragElement = todo;
    })
    let template = `<div class="todo-title">
                            <h2 class="todo-title">${inputValue}</h2>
                        </div>
                        <div class="todo-para">
                            <p class="todo-description">${textAreaValue}</p>
                        </div>
                        <div class="del-button">
                            <button class="delButton">Deleted</button>
                        </div>`
    todo.innerHTML = template;
    todos.appendChild(todo);
    inputValue = "";
    textAreaValue = "";
    inputVal.value = "";
    textAreaVal.value = ""
    //delted buttons 
    let deleteButtons = document.querySelectorAll(".delButton");
    deleTodos(deleteButtons);
    notify("todo added successfully");
    allColumns.forEach((col) => {
        let allTasks = col.querySelectorAll(".todo");
        let count = col.querySelector(".count")
        todosData[col.id] = Array.from(allTasks).map(t => {
            return {
                title: t.querySelector(".todo-title").innerText,
                description: t.querySelector(".todo-description").innerText
            }
        })

        localStorage.setItem("taskData", JSON.stringify(todosData));

        if (allTasks.length > 0) {
            count.innerText = allTasks.length;
        } else {
            count.innerText = 0
        }
    })

    modelContainer.classList.remove("active");
})

function addEventListeners(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    })

    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over")
    })

    column.addEventListener("dragover", (e) => {
        e.preventDefault()
    })

    column.addEventListener("drop", (e) => {
        e.preventDefault();

        column.classList.remove("hover-over");
        column.appendChild(dragElement);
        notify("todo drpped sccessfully")
        allColumns.forEach((col) => {
            let allTasks = col.querySelectorAll(".todo");
            let count = col.querySelector(".count")
            todosData[col.id] = Array.from(allTasks).map(t => {
                return {
                    title: t.querySelector(".todo-title").innerText,
                    description: t.querySelector(".todo-description").innerText
                }
            })

            localStorage.setItem("taskData", JSON.stringify(todosData));

            if (allTasks.length > 0) {
                count.innerText = allTasks.length;
            } else {
                count.innerText = 0
            }
        })
    })
}




addEventListeners(todos);
addEventListeners(progress);
addEventListeners(done)




function notify(msg) {
    let div = document.createElement("div");
    div.classList.add("notify-container");

    let heading = document.createElement("h2");
    heading.classList.add("notify");

    let loader = document.createElement("div");
    loader.classList.add("loader");
    div.appendChild(heading);
    div.appendChild(loader);
    document.body.appendChild(div);
    if (msg) {
        heading.innerText = msg;
        loader.classList.add("animate")
    }

    timer = setTimeout(() => {
        div.classList.add("remove");
    }, 2000)

}
function deleTodos(allbtns) {


    allbtns.forEach((del) => {
        del.addEventListener("click", (e) => {
            let todo = e.target.closest(".todo");
            let column = todo.parentElement;
            todo.remove();
            notify("todo deleted successfully")

            updateCountAndStorage();
        })
    })
}

function updateCountAndStorage() {
    allColumns.forEach((col) => {
        let allTasks = col.querySelectorAll(".todo");
        let count = col.querySelector(".count")
        todosData[col.id] = Array.from(allTasks).map(t => {
            return {
                title: t.querySelector(".todo-title").innerText,
                description: t.querySelector(".todo-description").innerText
            }
        })

        localStorage.setItem("taskData", JSON.stringify(todosData));

        if (allTasks.length > 0) {
            count.innerText = allTasks.length;
        } else {
            count.innerText = 0
        }
    })
}

