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
    console.log(tasks);
    
    clearInputs();
    displayTasks();
    closeModal();
}

// Clear inputs
function clearInputs() {
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDesc").value = "";
    document.getElementById("taskDueDate").value = "";
}

// Display tasks
function displayTasks() {
    document.querySelector(".ToDo").innerHTML = "";
    document.querySelector(".InProgress").innerHTML = "";
    document.querySelector(".Done").innerHTML = "";

    let todoCount = 0, inProgressCount = 0, doneCount = 0;

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.className = "p-4 rounded shadow bg-white mt-2";
        taskElement.style.borderColor = getPriorityColor(task.priority);

        taskElement.innerHTML = `
            <h3 class="text-lg font-semibold">${task.title}</h3>
            <p class="text-gray-600">${task.desc}</p>
            <p class="text-sm text-gray-500">Due: ${task.dueDate}</p>
            <p class="text-sm text-gray-500">Priority: ${task.priority}</p>
            <div class="flex space-x-2 mt-2">
                <button onclick="deleteTask(${index})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                <button onclick="editTask(${index})" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
            </div>
        `;

        if (task.status === "To Do") {
            document.querySelector(".ToDo").appendChild(taskElement);
            todoCount++;
        } else if (task.status === "Doing") {
            document.querySelector(".InProgress").appendChild(taskElement);
            inProgressCount++;
        } else {
            document.querySelector(".Done").appendChild(taskElement);
            doneCount++;
        }
    });

    updateCounts(todoCount, inProgressCount, doneCount);
}

// Update task counts
function updateCounts(todoCount, inProgressCount, doneCount) {
    document.getElementById("todoCount").textContent = todoCount;
    document.getElementById("inProgressCount").textContent = inProgressCount;
    document.getElementById("doneCount").textContent = doneCount;
}

// Get color by priority
function getPriorityColor(priority) {
    return priority === "P1" ? "red" : priority === "P2" ? "orange" : "green";
}

// Delete task
function deleteTask(taskIndex) {
    tasks.splice(taskIndex, 1);
    displayTasks();
}

// Edit task
function editTask(index) {
    const editedTask = tasks[index];
    document.getElementById("taskTitle").value = editedTask.title;
    document.getElementById("taskDesc").value = editedTask.desc;
    document.getElementById("taskStatus").value = editedTask.status;
    document.getElementById("taskDueDate").value = editedTask.dueDate;
    document.getElementById("taskPriority").value = editedTask.priority;

    openModal();

    const saveButton = document.querySelector(".modal-button");
    saveButton.textContent = "Update Task";
    saveButton.onclick = function () {
        tasks[index] = {
            title: document.getElementById("taskTitle").value,
            desc: document.getElementById("taskDesc").value,
            status: document.getElementById("taskStatus").value,
            dueDate: document.getElementById("taskDueDate").value,
            priority: document.getElementById("taskPriority").value,
        };

        displayTasks();
        closeModal();
        saveButton.textContent = "Add Task";
        saveButton.onclick = saveTask;
    };
}

// Open modal on button click
document.querySelector(".bg-blue-800").addEventListener("click", openModal);




