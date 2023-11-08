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
    taskBlock["taskPriority"] = taskPriority;
    taskBlock["completed"] = false;
    taskBlock["taskId"] = taskDB.length + 1;

    taskDB.push(taskBlock);
    setTaskinStorage(taskDB);
    window.location.href = "pending.html";
  }
} else {
  alert(
    "Sorry, your browser does not support Web storage. Try again with a better one"
  );
}
