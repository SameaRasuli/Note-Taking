const input = document.querySelector("#input");
const clearBtn = document.querySelector("#clearBtn");
const addBtn = document.querySelector("#addBtn");
const notesList = document.querySelector("#notesList");
const notesCount = document.querySelector("#notesCount");

const notes = [];

// گرفتن Noteهای ذخیره‌شده
const savedNotes = localStorage.getItem("notes");

if (savedNotes) {
    notes.push(...JSON.parse(savedNotes));
}

function updateNotesCount(){
    notesCount.textContent = `Notes: ${notes.length}`;
}

// نمایش Noteها
function showNote(note) {
    const li = document.createElement("li");
    li.textContent = note;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
        const index = notes.indexOf(note);

        notes.splice(index, 1);

        localStorage.setItem("notes", JSON.stringify(notes));

        li.remove();
        updateNotesCount();
    });

    li.appendChild(deleteBtn);
    notesList.appendChild(li);
}


// نمایش Noteهای قبلی
notes.forEach(function (note) {
    showNote(note);
});
updateNotesCount();


// اضافه کردن Note جدید
addBtn.addEventListener("click", function () {
    const text = input.value.trim();

    if (text === "") {
        return;
    }

    notes.push(text);

    localStorage.setItem("notes", JSON.stringify(notes));

    showNote(text);

    input.value = "";

    updateNotesCount();
});

clearBtn.addEventListener("click", function(){
    notes.length = 0;
    notesList.innerHTML = "";
    localStorage.removeItem("notes");

    updateNotesCount();

});