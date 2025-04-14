"use-strict";

let defaultTimeValue = ""
let noteList = []
const noteContentTB = document.getElementById("noteContentTB")
const noteTimeTB = document.getElementById("noteTimeTB")

setDefaultTime()

function addNote() {

    pushNote()
    displayNoteList()
    clearForm()
}

function pushNote() {

    const content = noteContentTB.value
    const time = noteTimeTB.value
    const noteColor = getColor()
    const note = {content, time, noteColor}
    if (isValidFields(note)) {
        noteList.push(note)
    }
    saveAndUpdateNote()
}

function displayNoteList() {
    const containerDiv = document.getElementById("containerDiv")


    let dynamicNoteCardDiv = ""
    for (let i = 0; i < noteList.length; i++) {
        const randColor = noteList[i].noteColor
        const noteCard =
            `
            <div class="card" style="background-color: ${randColor}">
            <span class="bi bi-trash" onclick="deleteNote(${i})"></span>
           
            <div class="noteContent">${noteList[i].content}</div>
           
           <p class="timeContainer"> ${parseTime(noteList[i].time)} </p>
        
</div> 
            `
        dynamicNoteCardDiv += noteCard
    }
    containerDiv.innerHTML = dynamicNoteCardDiv
}

if (noteList.length === 0) {
    addEmptyNoteMessage()
}

function deleteNote(note) {
    noteList.splice(note, 1)
    saveAndUpdateNote()
    displayNoteList()
}


function clearForm() {
    noteContentTB.value = ""
    noteTimeTB.value = ""
    setDefaultTime()
    noteContentTB.focus()
}

function saveAndUpdateNote() {
    const json = JSON.stringify(noteList)
    localStorage.setItem("noteList", json)
}

function loadNote() {
    const json = localStorage.getItem("noteList")
    if (json) {
        noteList = JSON.parse(json)
    }
    displayNoteList()
}

function isValidFields(note) {
    return note.content !== "" && note.time.toString().trim() !== ""&& note.time !== defaultTimeValue
}

loadNote();

function parseTime(time) {
    return time.replace('T', ' ')
}

function getColor() {
    const colorNames = [
        `lavenderblush`,
        `salmon`,
        `lightsalmon`,
        `lightcoral`,
        `gold`,
        `khaki`,
        `palegreen`,
        `mediumaquamarine`,
        `powderblue`,
        `lightsteelblue`,
        `skyblue`,
        `plum`,
        `thistle`,
        `lightpink`,
        `peachpuff`,
        `honeydew`
    ]

    let i = Math.floor(Math.random() * 16)
    return colorNames[i]
}

function setDefaultTime() {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset()
    const localTime = new Date(now.getTime() - (timezoneOffset * 60000))
    const formattedTime = localTime.toISOString().slice(0, 16)
    noteTimeTB.value = formattedTime
    defaultTimeValue = formattedTime
}

function addEmptyNoteMessage() {

}
