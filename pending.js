if (typeof Storage !== "undefined") {
  let createTask;
  let taskItem;

  window.addEventListener("DOMContentLoaded", () => {
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

  function displayPendingTasks() {
    const taskDB = getTaskFromStorage();
    console.log(taskDB);
    const pendingTasks = taskDB.filter((task) => task.completed == false);
    console.log(pendingTasks);
    const taskContainer = document.getElementById("task-container");
    while (taskContainer.firstChild) {
      taskContainer.removeChild(taskContainer.firstChild);
    }
    pendingTasks.forEach((task) => {
      const taskCard = document.createElement("div");
      const taskH2 = document.createElement("h2");
      const taskDescription = document.createElement("p");
      const taskDueDate = document.createElement("p");
      const taskPrior = document.createElement("h4");
      const taskAction = document.createElement("div");
      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button");

      taskCard.setAttribute("class", "task-card");
      taskH2.setAttribute("class", "task-name");
      taskDescription.setAttribute("class", "task-desc");
      taskDueDate.setAttribute("class", "task-dateTime");
      taskPrior.setAttribute("class", "task-priority");
      taskAction.setAttribute("class", "task-action");
      editButton.setAttribute("class", "med-btn light-btn");
      deleteButton.setAttribute("class", "med-btn dark-btn");

      taskH2.innerHTML = task.taskName;
      taskDescription.innerHTML = task.taskDesc;
      taskDueDate.innerHTML = `Due by: <b>${task.taskDate}</b> at <b>${task.taskTime}</b>`;
      taskPrior.innerHTML = task.taskPriority;
      editButton.innerHTML = "Edit";
      deleteButton.innerHTML = "Delete";
      deleteButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this task?")) {
          deleteTask(task.taskId);
          displayPendingTasks();
        }
      });
      editButton.addEventListener("click", () => {
        editTask(task.taskId);
      });
      taskAction.appendChild(editButton);
      taskAction.appendChild(deleteButton);
      taskCard.appendChild(taskH2);
      taskCard.appendChild(taskDescription);
      taskCard.appendChild(taskDueDate);
      taskCard.appendChild(taskPrior);
      taskCard.appendChild(taskAction);
      taskCard.appendChild(taskAction);
      taskContainer.appendChild(taskCard);
    });

    function deleteTask(taskId) {
      const taskDB = getTaskFromStorage();
      const taskIndex = taskDB.findIndex((task) => (task.taskId = taskId));
      taskDB.splice(taskIndex, 1);
      setTaskinStorage(taskDB);
    }

    function editTask(taskId) {
      window.location.href = `edit.html?taskId=${taskId}`;
      console.log("going to edit");
    }
  }
} else {
  alert(
    "Sorry, your browser does not support Web storage. Try again with a better one"
  );
}
