if (typeof Storage !== "undefined") {
  let createTask;

  window.addEventListener("DOMContentLoaded", () => {
    createTask = document.getElementById("createTask");
    if (createTask) {
      createTask.addEventListener("submit", (e) => {
        e.preventDefault();
        addTaskToDB();
      });
    }
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
    taskBlock["taskPriority"] = parseInt(taskPriority);
    taskBlock["completed"] = false;

    if (taskDB.length == 0) {
      taskBlock["taskId"] = 1;
    } else {
      const sortedByTaskId = taskDB.sort((a, b) => {
        return a.taskId - b.taskId;
      });
      taskBlock["taskId"] = sortedByTaskId[sortedByTaskId.length - 1] + 1;
    }

    taskDB.push(taskBlock);
    setTaskinStorage(taskDB);
    window.location.href = "pending.html";
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
} else {
  alert(
    "Sorry, your browser does not support Web storage. Try again with a better one"
  );
}
