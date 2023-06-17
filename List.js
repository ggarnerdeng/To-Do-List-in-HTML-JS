// Array to store tasks
let tasks = [];

// Object to track the current sorting order
const sortOrders = {
  name: "asc",
  date: "asc",
  priority: "asc"
};

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value;
  if (taskText.trim() !== "") {
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Add leading zero if month is single digit
    const day = String(currentDate.getDate()).padStart(2, "0"); // Add leading zero if day is single digit
    const year = currentDate.getFullYear();
    const timestamp = new Date(); // Store the complete date and time information

    const task = {
      text: taskText,
      completed: false,
      timestamp: timestamp,
      priority: "Medium" // Default priority is set to "Medium"
    };

    // Add the task at the beginning of the tasks array
    tasks.unshift(task);

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

  const searchInput = document.getElementById("searchInput");
  const searchQuery = searchInput.value.toLowerCase();

  // Create the header row
  const headerRow = document.createElement("li");
  headerRow.className = "task-header";

  const headerDelete = document.createElement("span");
  headerDelete.textContent = "Delete";
  headerDelete.className = "header-delete";

  const headerTimestamp = document.createElement("span");
  headerTimestamp.textContent = "Date Created";
  headerTimestamp.className = "header-timestamp";

  const headerText = document.createElement("span");
  headerText.textContent = "Task Name";
  headerText.className = "header-text";

  const headerPriority = document.createElement("span");
  headerPriority.textContent = "";
  headerPriority.className = "header-priority";

  const headerEdit = document.createElement("span");
  headerEdit.textContent = "";
  headerEdit.className = "header-edit";

  headerRow.appendChild(headerDelete);
  headerRow.appendChild(headerTimestamp);
  headerRow.appendChild(headerText);
  headerRow.appendChild(headerPriority);
  headerRow.appendChild(headerEdit);

  taskList.appendChild(headerRow);

  const filteredTasks = tasks.filter(function (task) {
    return task.text.toLowerCase().includes(searchQuery);
  });

  filteredTasks.forEach(function (task, index) {
    const li = document.createElement("li");
    li.className = "task-item";

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "task-delete";
    deleteButton.addEventListener("click", function () {
      deleteTask(index);
    });

    const timestamp = document.createElement("span");
    const dateOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    };

    const formattedTimestamp = new Date(task.timestamp).toLocaleDateString(undefined, dateOptions);
    timestamp.innerText = formattedTimestamp;
    timestamp.className = "task-timestamp";

    const taskText = document.createElement("span");
    taskText.innerText = task.text;
    taskText.className = "task-text";
    if (task.completed) {
      taskText.classList.add("completed");
    }

    // Highlight search query in task name
    if (searchQuery.length > 0) {
      const searchIndex = task.text.toLowerCase().indexOf(searchQuery);
      if (searchIndex !== -1) {
        const highlightedText = document.createElement("mark");
        highlightedText.innerText = task.text.substr(searchIndex, searchQuery.length);
        const beforeText = document.createElement("span");
        beforeText.innerText = task.text.substr(0, searchIndex);
        const afterText = document.createElement("span");
        afterText.innerText = task.text.substr(searchIndex + searchQuery.length);
        taskText.innerHTML = "";
        taskText.appendChild(beforeText);
        taskText.appendChild(highlightedText);
        taskText.appendChild(afterText);
      }
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
  const searchInput = document.getElementById("searchInput");
  const searchQuery = searchInput.value.toLowerCase();

  const filteredTasks = tasks.filter(function (task) {
    return task.text.toLowerCase().includes(searchQuery);
  });

  const originalIndex = tasks.indexOf(filteredTasks[index]);

  const taskName = tasks[originalIndex].text;
  const confirmation = confirm(`Are you sure you want to delete the task: ${taskName}`);
  if (confirmation) {
    tasks.splice(originalIndex, 1);
    saveTasks(); // Save tasks to local storage
    renderTasks();
  }
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
  const defaultOrder = "asc";
  const isDefaultOrder = sortOrders.name === defaultOrder;

  tasks.sort(function (a, b) {
    const order = isDefaultOrder ? -1 : 1;
    const result = a.text.localeCompare(b.text);
    return result * order;
  });

  sortOrders.name = isDefaultOrder ? "desc" : defaultOrder;
  renderTasks();
}

// Sort tasks by date
function sortByDate() {
  const defaultOrder = "desc";
  const isDefaultOrder = sortOrders.date === defaultOrder;

  tasks.sort(function (a, b) {
    const order = isDefaultOrder ? -1 : 1;
    const result = new Date(b.timestamp) - new Date(a.timestamp);
    return result * order;
  });

  sortOrders.date = isDefaultOrder ? "asc" : defaultOrder;
  renderTasks();
}

// Sort tasks by priority
function sortByPriority() {
  const defaultOrder = "desc";
  const isDefaultOrder = sortOrders.priority === defaultOrder;

  tasks.sort(function (a, b) {
    const priorityOrder = {
      High: 1,
      Medium: 2,
      Low: 3
    };

    const order = isDefaultOrder ? -1 : 1;
    const result = priorityOrder[a.priority] - priorityOrder[b.priority];
    return result * order;
  });

  sortOrders.priority = isDefaultOrder ? "asc" : defaultOrder;
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

// Event listener for search function
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
  renderTasks();
});