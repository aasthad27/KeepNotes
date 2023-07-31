const addTitle=document.getElementById('addTitle');
const addText=document.getElementById('addText');
const addNoteButton=document.getElementById('addNote');
const notesDiv=document.getElementById('notes');
const trashDiv=document.getElementById('trash');
// let notes=[];
//local storage vs session storage  -->api to store data i n browser

showNotes();
// document.getElementById('tb').addEventListener('click', function() {
//     // toggle the visibility of the trash div
//     trashDiv.classList.toggle('hidden');
    
//     // if the trash div is visible, show the trashed notes
//     if (!trashDiv.classList.contains('hidden')) {
//         showTrash();
//     }
// });
document.getElementById('tb').addEventListener('click', function() {
    trashDiv.style.display = trashDiv.style.display === 'none' ? 'block' : 'none'; // toggle visibility of trash div
    if(trashDiv.style.display === 'block') {
      showTrash(); // update display of trashed notes if the trash div is visible
    }
  });
  

function addNotes(){
   let notes =localStorage.getItem('notes'); //local scope return in form of string if exist alreay or not the notes array
   let trash =localStorage.getItem('trash');
   if(notes==null)  // not existing
   {
    notes=[];
   }
   else{
    notes=JSON.parse(notes);  // if present string notes to object
   }
   if(trash==null)  // not existing
   {
    trash=[];
   }
   else{
    trash=JSON.parse(trash);  // if present string notes to object
   }
   // console.log(title);
    if(addText.value=='') 
    {
        alert('Add your note')
        return;
    }
   // console.log(note);
   //add notes in array
   // create object 
   const noteObj={
    title:addTitle.value,
    text:addText.value,
    
   } // once added
   // make it empty
   addTitle.value='';
   addText.value='';
   notes.push(noteObj) // pushed in notes array
   localStorage.setItem('notes',JSON.stringify(notes));  // set as string in local storage
   localStorage.setItem('trash',JSON.stringify(trash));
   showNotes();
  
}
function showNotes(){
    let notesHTML = '';
    let notes =localStorage.getItem('notes'); //finding all notes 
    if(notes===null)
    {
        return;
    }
    else
    {
        notes=JSON.parse(notes); // string to array
    }
    for (let i = 0; i < notes.length; i++) {
        notesHTML += `
            <div class="note">
                <button class="deleteNote" id=${i} onclick="deleteNote(${i})"><i class="fas fa-trash"></i></button>
                <button class="deleteNote" id=${i} onclick="TrashNote(${i})"><i class="fas fa-trash-restore"></i></button>
                <div class="title">${notes[i].title === '' ? 'Note' : notes[i].title}</div>
                <div class="text">${notes[i].text}</div>
            </div>
        `;
    }
    notesDiv.innerHTML =notesHTML;
}

function deleteNote(ind){
    let notes =localStorage.getItem('notes'); //finding all notes 
    if(notes===null)
    {
        return;
    }
    else
    {
        notes=JSON.parse(notes); // string to array
    }
    notes.splice(ind,1); // particular index will be deleted ,that particular notes will be deleted 
    localStorage.setItem('notes',JSON.stringify(notes));  // set as string in local storage
    showNotes();
}
function TrashNote(ind){
    let notes = localStorage.getItem('notes'); // get all notes 
    if(notes === null) {
        return;
    } else {
        notes = JSON.parse(notes); // convert string to array
    }
    const deletedNote = notes.splice(ind, 1); // remove the note at the given index
    let trash = localStorage.getItem('trash'); // get all trashed notes 
    if(trash === null) {
        trash = []; // create an empty array if not present
    } else {
        trash = JSON.parse(trash); // convert string to array
    }
    trash.push(deletedNote[0]); // add the deleted note to trash array
    localStorage.setItem('notes', JSON.stringify(notes));  // update notes in local storage
    localStorage.setItem('trash', JSON.stringify(trash));  // update trash in local storage
    showNotes(); // update the display of notes
    //showTrash(); // update the display of trashed notes
}
function showTrash(){
    let trashHTML = '';
    let trash = localStorage.getItem('trash'); // get all trashed notes 
    if(trash === null) {
        return;
    } else {
        trash = JSON.parse(trash); // convert string to array
    }
    for(let i = 0; i < trash.length; i++) {
        trashHTML += `
            <div class="note">
                <button class="deleteNote" id="${i}" onclick="deleteTrashedNote(${i})"><i class="fas fa-trash"></i></button> 
                <div class="title">${trash[i].title === '' ? 'Note' : trash[i].title}</div>
                <div class="text">${trash[i].text}</div>
            </div>
        `;
    }
    trashDiv.innerHTML = trashHTML;
    //fixed icons
}
function deleteTrashedNote(ind){
    let trash =localStorage.getItem('trash'); //finding all notes 
    if(trash===null)
    {
        return;
    }
    else
    {
        trash=JSON.parse(trash); // string to array
    }
    trash.splice(ind,1); // particular index will be deleted ,that particular notes will be deleted 
    localStorage.setItem('trash',JSON.stringify(trash));  // set as string in local storage
    showTrash();
}

addNoteButton.addEventListener('click',addNotes);