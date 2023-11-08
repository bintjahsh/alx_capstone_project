if (typeof Storage !== "undefined") {
  let createTask;
  let taskItem;
  let viewPending;

  window.addEventListener("DOMContentLoaded", () => {
    createTask = document.getElementById("createTask");
    taskItem = document.getElementById("task-item");
    viewPending = document.getElementById("viewPending");
    if (createTask) {
      createTask.addEventListener("submit", (e) => {
        e.preventDefault();
        addTaskToDB();
      });
    }
    if (taskItem) {
      taskItem.addEventListener("click", () => {
        displayTask();
      });
    }
    viewPending.addEventListener("click", () => {
      window.location.href = "pending.html";
    });
    displayPendingTasks();
  });

  function setTaskinStorage(taskDB) {
    /* Creates a new task in local storage */
    localStorage.setItem("taskDB", JSON.stringify(taskDB));
  }

  function getTaskFromStorage() {
    /* Returns content of the taskDB stored in local storage.
      If taskDB is empty, returns an empty object
    */
    let taskDB = localStorage.getItem("taskDB");
    if (taskDB) {
      let allTasks = JSON.parse(taskDB);
      return allTasks;
    } else {
      return [];
    }
  }

  function addTaskToDB() {
    /* Adds a new taskBlock to list of pendingTasks
     */
    const taskDB = getTaskFromStorage();
    let taskBlock = {};
    const taskName = document.getElementById("taskName").value;
    const taskDesc = document.getElementById("taskDesc").value;
    const taskDate = document.getElementById("taskDueDate").value;
    const taskTime = document.getElementById("taskDueTime").value;
    const taskPriority = document.getElementById("taskPriority").value;
    taskBlock["taskName"] = taskName;
    taskBlock["taskDesc"] = taskDesc;
    taskBlock["taskDate"] = taskDate;
    taskBlock["taskTime"] = taskTime;
    taskBlock["taskPriority"] = taskPriority;
    taskBlock["completed"] = false;
    taskBlock["taskId"] = taskDB.length + 1;
    console.log("i am here");

    taskDB.push(taskBlock);
    setTaskinStorage(taskDB);
  }

  function displayTask() {
    const taskDB = getTaskFromStorage();
    const pendingTasks = taskDB.filter((task) => task.completed == false);

    pendingTasks.forEach((task) => {
      const taskContainer = document.getElementById("task-container");
      const taskCard = document.createElement("div");
      const taskH2 = document.createElement("h2");
      const taskDescription = document.createElement("p");
      const taskDueDate = document.createElement("p");
      const taskPrior = document.createElement("h4");
      const taskAction = document.createElement("div");
      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button");

      taskCard.class = "task-card";
      taskH2.class = "task-name";
      taskDescription.class = "task-desc";
      taskDueDate.class = "task-dateTime";
      taskPrior.class = "task-priority";
      taskAction.class = "task-action";
      editButton.class = "med-btn light-btn";
      deleteButton.class = "med-btn light-btn";

      taskH2.innerHTML = task.taskName;
      taskDescription.innerHTML = task.taskDesc;
      taskDueDate.innerHTML = `${task.taskDate} at ${task.taskTime}`;
      taskPrior.innerHTML = task.taskPriority;
      editButton.innerHTML = "Edit";
      deleteButton.innerHTML = "Delete";
    });
  }

  function displayPendingTasks() {
    const taskDB = getTaskFromStorage();
    console.log(taskDB);
    const pendingTasks = taskDB.filter((task) => task.completed == false);
    console.log(pendingTasks);
    const taskContainer = document.getElementById("task-table");
    while (taskContainer.firstChild) {
      taskContainer.removeChild(taskContainer.firstChild);
    }
    pendingTasks.forEach((task) => {
      const taskRow = document.createElement("tr");
      const taskNameCell = document.createElement("td");
      const taskPriorCell = document.createElement("td");
      const taskDueDateCell = document.createElement("td");
      const taskName = document.createElement("p");
      const taskPrior = document.createElement("p");
      const taskDueDate = document.createElement("p");

      taskRow.setAttribute("class", "task-item");
      taskName.setAttribute("class", "task-name");
      taskPrior.setAttribute("class", "task-priority");
      taskDueDate.setAttribute("class", "date-time");

      taskName.innerHTML = task.taskName;
      taskPrior.innerHTML = task.taskPriority;
      if (task.taskPriority == "high") {
        taskPrior.style.color = "red";
      } else if (task.taskPriority == "medium") {
        taskPrior.style.color = "orange";
      } else {
        taskPrior.style.color = "blue";
      }

      taskDueDate.innerHTML = `${task.taskDate} | ${task.taskTime}`;
      taskNameCell.appendChild(taskName);
      taskPriorCell.appendChild(taskPrior);
      taskDueDateCell.appendChild(taskDueDate);
      taskRow.appendChild(taskNameCell);
      taskRow.appendChild(taskPriorCell);
      taskRow.appendChild(taskDueDateCell);
      taskContainer.appendChild(taskRow);
    });
  }
} else {
  alert(
    "Sorry, your browser does not support Web storage. Try again with a better one"
  );
}
