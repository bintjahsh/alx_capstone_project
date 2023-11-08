if (typeof Storage !== "undefined") {
  let taskToEdit;

  window.addEventListener("DOMContentLoaded", () => {
    const query = new URLSearchParams(window.location.search);
    const taskId = query.get("taskId");
    if (!taskId) {
      window.location.href = "dashboard.html";
    }
    populateEditForm(taskId);
    const editTask = document.getElementById("editTask");
    const cancelEdit = document.getElementById("cancelEdit");
    if (editTask) {
      editTask.addEventListener("submit", (e) => {
        e.preventDefault();
        updateTaskToDB();
      });
      cancelEdit.addEventListener("click", () => {
        window.location.href = "pending.html";
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

  function updateTaskToDB() {
    /* Adds a new taskBlock to list of pendingTasks
     */
    const taskDB = getTaskFromStorage();
    const taskName = document.getElementById("taskName").value;
    const taskDesc = document.getElementById("taskDesc").value;
    const taskDate = document.getElementById("taskDueDate").value;
    const taskTime = document.getElementById("taskDueTime").value;
    const taskPriority = document.getElementById("taskPriority").value;
    const taskStatus = document.getElementById("taskStatus").value;
    taskToEdit["taskName"] = taskName;
    taskToEdit["taskDesc"] = taskDesc;
    taskToEdit["taskDate"] = taskDate;
    taskToEdit["taskTime"] = taskTime;
    taskToEdit["taskPriority"] = taskPriority;
    taskToEdit["completed"] = JSON.parse(taskStatus);

    const currentTaskIndex = taskDB.findIndex(
      (task) => task.taskId == taskToEdit.taskId
    );
    taskDB[currentTaskIndex] = taskToEdit;
    setTaskinStorage(taskDB);
    if (taskToEdit.completed == true) {
      window.location.href = "dashboard.html";
    }
    window.location.href = "pending.html";
  }

  function populateEditForm(taskId) {
    taskDB = getTaskFromStorage();
    taskToEdit = taskDB.find((task) => task.taskId == taskId);
    if (!taskToEdit) {
      window.location.href = "pending.html";
    }
    const taskName = document.getElementById("taskName");
    const taskDesc = document.getElementById("taskDesc");
    const taskDate = document.getElementById("taskDueDate");
    const taskTime = document.getElementById("taskDueTime");
    const taskPriority = document.getElementById("taskPriority");
    const taskStatus = document.getElementById("taskStatus");
    taskName.value = taskToEdit["taskName"];
    taskDesc.value = taskToEdit["taskDesc"];
    taskDate.value = taskToEdit["taskDate"];
    taskTime.value = taskToEdit["taskTime"];
    taskPriority.value = taskToEdit["taskPriority"];
    taskStatus.value = taskToEdit["completed"];
  }
} else {
  alert(
    "Sorry, your browser does not support Web storage. Try again with a better one"
  );
}
