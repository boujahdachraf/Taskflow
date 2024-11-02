// Array to store tasks
let tasks = [];

// Modal open and close
function openModal() {
    document.getElementById("taskModal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("taskModal").classList.add("hidden");
}
// Save task functiion
function saveTask() {
    const title = document.getElementById("taskTitle").value;
    const desc = document.getElementById("taskDesc").value;
    const status = document.getElementById("taskStatus").value;
    const dueDate = document.getElementById("taskDueDate").value;
    const priority = document.getElementById("taskPriority").value;

    if (title === "" || desc === "" || dueDate === "") {
        alert("Please enter the title, description, and due date.");
        return;
    }

    tasks.push({ title, desc, status, dueDate, priority });
    clearInputs();
    displayTasks();
    closeModal();
}



