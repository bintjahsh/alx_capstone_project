/* The Edit page is opened when users click the edit button available
on a pending task. Users can change any, multiple or all the details
of the selected task including whether the task has been completed or
not. The task is then updated with the new details and sent back to the
database.
*/

if (typeof Storage !== "undefined") {
  let taskToEdit;
  let todayDate;
  let editTask;
  let cancelEdit;

  window.addEventListener("DOMContentLoaded", () => {
    const query = new URLSearchParams(window.location.search);
    /* Variable query stores the url which contains the taskId
    of the task selected for editing.
    */
    const taskId = query.get("taskId");
    if (!taskId) {
      /* If selected task is not available, navigate back to
      the dashboard */
      window.location.href = "dashboard.html";
    }
    populateEditForm(taskId);
    todayDate = document.getElementById("todayDate");
    editTask = document.getElementById("editTask");
    cancelEdit = document.getElementById("cancelEdit");
    if (editTask) {
      editTask.addEventListener("submit", (e) => {
        /*Prevents default form submission behaviour. Instead, if user
        submits task editing, update the database with new task details
        */
        e.preventDefault();
        updateTaskToDB();
      });
      cancelEdit.addEventListener("click", () => {
        /* If user cancels editing, navigate back to pending task page.
         */
        window.location.href = "pending.html";
      });
    }
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

  function updateTaskToDB() {
    /* Updates the specific task's details and updates the list of tasks
    with the new details, then calls setTaskInStorage to set the tasks
    list back to the database.
    */
    const taskDB = getTaskFromStorage();
    const taskName = document.getElementById("taskName").value;
    const taskDesc = document.getElementById("taskDesc").value;
    const taskDate = document.getElementById("taskDueDate").value;
    const taskTime = document.getElementById("taskDueTime").value;
    const taskPriority = document.getElementById("taskPriority").value;
    const taskStatus = document.getElementById("taskStatus").checked;
    taskToEdit["taskName"] = taskName;
    taskToEdit["taskDesc"] = taskDesc;
    taskToEdit["taskDate"] = taskDate;
    taskToEdit["taskTime"] = taskTime;
    taskToEdit["taskPriority"] = parseInt(taskPriority);
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
    /* Gets the sepcified task from the task database using its taskId
    and populates the edit form with the tasks details
    */
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
