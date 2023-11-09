if (typeof Storage !== "undefined") {
  let createTask;
  let taskItem;
  let viewPending;
  let todayDate;
  let sortBy;
  let hamburgerBtn;
  let navCloseBtn;
  let navSidebar;

  window.addEventListener("DOMContentLoaded", () => {
    createTask = document.getElementById("createTask");
    taskItem = document.getElementById("task-item");
    viewPending = document.getElementById("viewPending");
    todayDate = document.getElementById("todayDate");
    sortBy = document.getElementById("sortby");
    hamburgerBtn = document.querySelector("button.hamburger");
    navSidebar = document.querySelector("nav.nav-sidebar");
    navCloseBtn = document.querySelector("button.close");
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
    sortBy.addEventListener("change", (e) => {
      const sortby = e.target.value;
      if (sortby == "duedate") {
        sortByDueDate();
      } else {
        sortByPriority();
      }
    });
    hamburgerBtn.addEventListener("click", () => {
      navSidebar.classList.add("open");
    });
    navCloseBtn.addEventListener("click", () => {
      navSidebar.classList.remove("open");
    });
    displayPendingTasks();
    setTodayDate();
  });

  function setTaskinStorage(taskDB) {
    /* Sets task database in local storage
     */
    localStorage.setItem("taskDB", JSON.stringify(taskDB));
  }

  function getTaskFromStorage() {
    /* Returns content of the task database stored in local storage.
    If taskDB is empty, returns an empty list.
    */
    let taskDB = localStorage.getItem("taskDB");
    if (taskDB) {
      let allTasks = JSON.parse(taskDB);
      return allTasks;
    } else {
      return [];
    }
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

  function setTodayDate() {
    /* Gets the current date and returns it in specified format.
    The date is displayed at the top of the dashboard when the
    window loads.
    */
    const date = new Date();
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let today = weekday[date.getDay()];
    let currentDate = `${today}, ${day}/${month}/${year}`;
    todayDate.innerHTML = currentDate;
  }

  function appendToTable(taskList) {
    const taskContainer = document.getElementById("task-table");
    taskList.forEach((task) => {
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
      if (task.taskPriority == 1) {
        taskPrior.innerHTML = "Normal";
        taskPrior.style.color = "blue";
      } else if (task.taskPriority == 2) {
        taskPrior.innerHTML = "Medium";
        taskPrior.style.color = "orange";
      } else {
        taskPrior.innerHTML = "High";
        taskPrior.style.color = "red";
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

  function displayPendingTasks() {
    const taskDB = getTaskFromStorage();
    const pendingTasks = taskDB.filter((task) => task.completed == false);
    const taskContainer = document.getElementById("task-table");
    while (taskContainer.firstChild) {
      taskContainer.removeChild(taskContainer.firstChild);
    }
    appendToTable(pendingTasks);
  }

  function sortByDueDate() {
    const taskDB = getTaskFromStorage();
    const pendingTasks = taskDB.filter((task) => task.completed == false);
    const sortedByDueDate = pendingTasks.sort((a, b) => {
      let da = new Date(a.taskDate),
        db = new Date(b.taskDate);
      return da - db;
    });

    const taskContainer = document.getElementById("task-table");
    while (taskContainer.firstChild) {
      taskContainer.removeChild(taskContainer.firstChild);
    }
    appendToTable(sortedByDueDate);
  }

  function sortByPriority() {
    const taskDB = getTaskFromStorage();
    const pendingTasks = taskDB.filter((task) => task.completed == false);
    const sortedByPriority = pendingTasks.sort((a, b) => {
      let pa = a.taskPriority,
        pb = b.taskPriority;
      return pb - pa;
    });

    const taskContainer = document.getElementById("task-table");
    while (taskContainer.firstChild) {
      taskContainer.removeChild(taskContainer.firstChild);
    }
    appendToTable(sortedByPriority);
  }
} else {
  alert(
    "Sorry, your browser does not support Web storage. Try again with a better one"
  );
}
