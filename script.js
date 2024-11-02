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




