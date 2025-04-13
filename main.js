"use-strict";


let noteList = []
const taskTextBox = document.getElementById("taskTextBox")
const timeTextBox = document.getElementById("timeTextBox")

function addNote() {

    pushToDo()
    displayNoteList()
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
    saveAndUpdateNote()
}

function displayNoteList() {

    const containerDiv = document.getElementById("containerDiv")
    let dynamicDivInstance = ""
    for (let i = 0; i < noteList.length; i++) {
        const randColor = noteList[i].noteColor
        const noteCard =
            `
            <div class="card" style="background-color: ${randColor}">
        
            <span class="bi bi-trash" onclick="deleteNote(${i})"></span>
           
            <div class="noteContent">${noteList[i].task}</div>
           
           <p class="timeContainer"> ${parseTime(noteList[i].time)} </p>
            
</div> 
            `
        dynamicDivInstance += noteCard
    }
    containerDiv.innerHTML = dynamicDivInstance
}

function deleteNote(note) {
    noteList.splice(note, 1)
    saveAndUpdateNote()
    displayNoteList()
}


function clearForm() {
    taskTextBox.value = ""
    timeTextBox.value = ""
    taskTextBox.focus()
}

function saveAndUpdateNote() {
    const json = JSON.stringify(noteList)
    localStorage.setItem("todolist", json)
}

function loadNote() {
    const json = localStorage.getItem("todolist")
    if (json) {
        noteList = JSON.parse(json)
    }
    displayNoteList()
}

function isValidFields(todo) {
    return todo.task !== "" && todo.time.toString().trim() !== ""
}

loadNote();

function parseTime(todoItemTime) {
    return todoItemTime.replace('T', ' ')
}

function getColor() {
    const colorNames = [
        `lavenderblush`, // soft pink
        `salmon`, // warm pink-orange
        `lightsalmon`, // orange tint
        `lightcoral`, // muted red
        `gold`, // warm yellow
        `khaki`, // dusty yellow
        `palegreen`, // fresh green
        `mediumaquamarine`, // teal green
        `powderblue`, // light blue
        `lightsteelblue`, // cool blue-gray
        `skyblue`, // clear light blue
        `plum`, // soft purple
        `thistle`, // light purple
        `lightpink`, // soft pink
        `peachpuff`, // peachy
        `honeydew` // pale mint
    ]

    let i = Math.floor(Math.random() * 16)
    return colorNames[i]
}
