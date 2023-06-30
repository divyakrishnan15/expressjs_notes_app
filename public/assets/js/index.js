// const { response } = require("express");

let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;
let notelist1;

if (window.location.pathname === "/notes") {
  noteTitle = document.querySelector(".note-title");
  noteText = document.querySelector(".note-textarea");
  notePriority = document.querySelector(".note-priority");
  noteImage = document.querySelector(".note-image");

  saveNoteBtn = document.querySelector(".save-note");
  newNoteBtn = document.querySelector(".new-note");

  notelist1 = document.querySelector(".list-group");
  noteList = document.querySelectorAll(".list-container .list-group");
}

const emptyForm = () => {
  noteTitle.value = "";
  noteText.value = "";
};

// Show an element
const show = (elem) => {
  elem.style.display = "inline";
};

// Hide an element
const hide = (elem) => {
  elem.style.display = "none";
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};



// GETTTTTT
const getNotes = () =>
  fetch("/api/notes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("getNOTES() /GET: ALL NOTES =", data);
      return data;
    });


// GETTTTTT
const getNotesParams = (id) =>
  fetch("/api/notes/${id}", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("getNOTES() /GET: ALL NOTES =", data);
      return data;
    });




// POSTTTT
const saveNote = (note) =>
  fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Successful POST request:", data);

      // Empty the input fields
      emptyForm();
      return data;
    })
    .catch((error) => {
      console.error("Error in POST request:", error);
    });




// DELETE
const deleteNote = (id) => {
  console.log("NOOOOOOOOO", id);
  fetch(`/api/notes/${id}`, {
    method: "DELETE",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // body: JSON.stringify(id),
  }).then((res) => {
    console.log("res.json = ",res.json)
    // res.json
    if (!res.ok) {
      throw new Error('Failed to delete note');
    }
    console.log('Note deleted successfully')
  })
  // }).then((data) => {
  //     // console.log("DELETED DATA :", data);
  //     emptyForm();
  //     const data1 = {
  //       "title": "HAHHA",
  //       "text": "asfa",
  //       "note_id": "d0b4"
  //     }
  //     console.log("DELETED DATA :", data1);
  //     return data1;
  //   })
    .catch((err) => {
      console.log(err);
    });
};




// ------SAVE NOTE
const renderActiveNote = () => {
  hide(saveNoteBtn);

  if (activeNote.id) {
    noteTitle.setAttribute("readonly", true);
    noteText.setAttribute("readonly", true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    noteTitle.removeAttribute("readonly");
    noteText.removeAttribute("readonly");
    noteTitle.value = "";
    noteText.value = "";
  }
};

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value, // new post
    text: noteText.value, // new post
  };
  saveNote(newNote).then(() => {
    console.log("NEWWWW NOOOTEE = ", newNote);
    getAndRenderNotes();
    renderActiveNote();
  });
};
// ------SAVE NOTE









// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;// icon delete
  console.log(note)
  const noteId = JSON.parse(
    note.parentElement.getAttribute("data-note")
  ).note_id;
  console.log("noteId  DELETE ", noteId); // note id -> d0b4
  console.log("ACTIVE NOTE  DELEYE ", activeNote.note_id); // ACTIVEnote id -> d0b4
  console.log(activeNote.note_id === noteId)
  if (activeNote.note_id === noteId) {
    activeNote = {};
  }
  
  // deleteNote(noteId)

  // const newNote = {
  //   title: noteTitle.value, // new post
  //   text: noteText.value, // new post
  //   note_id:
  // };

  deleteNote(noteId)
    .then(() => {
      getAndRenderNotes();
      renderActiveNote();
    });
};










// POST save button Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute("data-note"));
  console.log("activeNote handleNoteView()", activeNote.note_id);
  renderActiveNote();
};








// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  console.log("------renderNoteList----");
  console.log("notes = ", notes);

  let jsonNotes = await notes;
  console.log("jsonNotes = ", jsonNotes);

  if (window.location.pathname === "/notes") {
    noteList.forEach((el) => (el.innerHTML = ""));
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement("li");
    liEl.classList.add("list-group-item");

    const spanEl = document.createElement("span");
    spanEl.classList.add("list-item-title");
    spanEl.innerText = text;
    spanEl.addEventListener("click", handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement("i");
      delBtnEl.classList.add(
        "fas",
        "fa-trash-alt",
        "float-right",
        "text-danger",
        "delete-note"
      );
      delBtnEl.addEventListener("click", handleNoteDelete);

      liEl.append(delBtnEl);

      notelist1.append(liEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi("No saved Notes", false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
    // console.log("noteListItems = ",noteListItems)
  });

  if (window.location.pathname === "/notes") {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
// getNotes = {json}
const getAndRenderNotes = () => getNotes().then(renderNoteList);

// const getAndRenderNotes = () => {
//                               // console.log("data = ",getNotes())
//                               getNotes().then((response)=>{
//                               console.log("response = ",response)
//                                 response.forEach((i)=>renderNoteList(i))
//                               })}

if (window.location.pathname === "/notes") {
  saveNoteBtn.addEventListener("click", handleNoteSave);
  newNoteBtn.addEventListener("click", handleNewNoteView);
  noteTitle.addEventListener("keyup", handleRenderSaveBtn);
  noteText.addEventListener("keyup", handleRenderSaveBtn);
}

getAndRenderNotes();
