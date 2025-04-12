"use-strict";


let noteList = []
const taskTextBox = document.getElementById("taskTextBox")
const timeTextBox = document.getElementById("timeTextBox")

function addToDo() {

    pushToDo()
    displayToDoList()
    clearForm()
}

function pushToDo() {

    const task = taskTextBox.value
    const time = timeTextBox.value
    const noteColor = getColor()
    const note = {task, time, noteColor}
    if (isValidFields(note)) {
        noteList.push(note)
    }
    saveData()
}

function displayToDoList() {

    const containerDiv = document.getElementById("containerDiv")
    let dynamicDivInstance = ""
    for (let i = 0; i < noteList.length; i++) {
        const randColor = noteList[i].noteColor
        const noteCard =
            `
            <div class="card" style="background-color: ${randColor}">
            <span onclick="deleteMe(${i})">❌</span>
            <div class="noteContent">${noteList[i].task}</div>
           
           <p class="timeContainer"> ${parseTime(noteList[i].time)} </p>
            
</div> 
            `
        dynamicDivInstance += noteCard
    }
    containerDiv.innerHTML = dynamicDivInstance
}

function deleteMe(index) {
    noteList.splice(index, 1)
    displayToDoList()
}

function clearForm() {
    taskTextBox.value = ""
    timeTextBox.value = ""
    taskTextBox.focus()
}

function saveData() {
    const json = JSON.stringify(noteList)
    localStorage.setItem("todolist", json)
    console.log(json)
}

function loadData() {
    const json = localStorage.getItem("todolist")
    if (json) {
        noteList = JSON.parse(json)
    }
    displayToDoList()
}

function isValidFields(todo) {
    return todo.task !== "" && todo.time.toString().trim() !== ""
}

loadData();

function parseTime(todoItemTime) {
    return todoItemTime.replace('T', ' ')
}

function getColor() {
    const colorNames = [
        `lavender`,
        `thistle`,
        `plum`,
        `lightpink`,
        `mistyrose`,
        `honeydew`,
        `mintcream`,
        `aliceblue`,
        `seashell`,
        `floralwhite`,
        `lightyellow`,
        `powderblue`,
        `lightblue`,
        `lightcyan`,
        `palegreen`,
        `peachpuff`
    ]

    let i = Math.floor(Math.random() * 16)
    return colorNames[i]
}
