// Array to store tasks
let tasks = [];

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value;
    if (taskText.trim() !== "") {
        const task = {
            text: taskText,
            completed: false,
            timestamp: new Date().toLocaleString(), // Add timestamp
            priority: "Medium" // Default priority is set to "Medium"
        };
        tasks.push(task);
        saveTasks(); // Save tasks to local storage
        renderTasks();
        taskInput.value = "";
    }
}

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById("taskList");
    const taskCount = document.getElementById("taskCount");
    taskList.innerHTML = "";
    taskCount.textContent = tasks.length;

    tasks.forEach(function (task, index) {
        const li = document.createElement("li");
        li.className = "task-item";

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.className = "task-delete";
        deleteButton.addEventListener("click", function () {
            deleteTask(index);
        });

        const timestamp = document.createElement("span");
        timestamp.innerText = task.timestamp;
        timestamp.className = "task-timestamp";

        const taskText = document.createElement("span");
        taskText.innerText = task.text;
        taskText.className = "task-text";
        if (task.completed) {
            taskText.classList.add("completed");
        }

        const prioritySelect = document.createElement("select");
        prioritySelect.className = "task-priority";
        prioritySelect.addEventListener("change", function () {
            changePriority(index, prioritySelect.value);
        });

        const priorities = ["High", "Medium", "Low"];
        priorities.forEach(function (priority) {
            const option = document.createElement("option");
            option.value = priority;
            option.textContent = priority;
            if (priority === task.priority) {
                option.selected = true;
            }
            prioritySelect.appendChild(option);
        });

        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.className = "task-edit";
        editButton.addEventListener("click", function () {
            editTask(index);
        });

        li.appendChild(deleteButton);
        li.appendChild(timestamp);
        li.appendChild(taskText);
        li.appendChild(prioritySelect);
        li.appendChild(editButton);
        taskList.appendChild(li);
    });
}

// Function to toggle task completion
function toggleCompleted(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks(); // Save tasks to local storage
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks(); // Save tasks to local storage
    renderTasks();
}

// Function to edit a task
function editTask(index) {
    const newTaskText = prompt("Enter new task text:");
    if (newTaskText && newTaskText.trim() !== "") {

        tasks[index].text = newTaskText;
        saveTasks(); // Save tasks to local storage
        renderTasks();
    }
}
function downloadTasks() {
    const tasksText = tasks.map(task => {
        return `${task.text},${task.completed},${task.timestamp},${task.priority}`;
    }).join('\n');

    const element = document.createElement('a');
    const file = new Blob([tasksText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'tasks.txt';
    element.click();
}
function importTasks(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const tasksText = e.target.result;
        const tasksArray = tasksText.split('\n').map(line => line.split(','));
        tasks = tasksArray.map(taskData => {
            return {
                text: taskData[0],
                completed: taskData[1] === 'true',
                timestamp: taskData[2],
                priority: taskData[3]
            };
        });
        saveTasks(); // Save imported tasks to local storage
        renderTasks();
    };
    reader.readAsText(file);
}
// Function to change priority
function changePriority(index, newPriority) {
    tasks[index].priority = newPriority;
    saveTasks(); // Save tasks to local storage
    renderTasks();
}

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to retrieve tasks from local storage
function retrieveTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

// Retrieve tasks from local storage on page load
retrieveTasks();

// Sort tasks by name
function sortByName() {
    tasks.sort(function (a, b) {
        return a.text.localeCompare(b.text);
    });
    renderTasks();
}

// Sort tasks by date
function sortByDate() {
    tasks.sort(function (a, b) {
        return new Date(a.timestamp) - new Date(b.timestamp);
    });
    renderTasks();
}

// Sort tasks by priority
function sortByPriority() {
    const priorityOrder = {
        "High": 1,
        "Medium": 2,
        "Low": 3
    };
    tasks.sort(function (a, b) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    renderTasks();
}

renderTasks();

// Add event listener for Enter key press
const taskInput = document.getElementById("taskInput");
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});