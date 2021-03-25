const inputField = document.querySelector(".input-field input");
const saveBtn = document.querySelector(".input-field button");
const todoListUl = document.querySelector(".todo-list");
const deleteAllBtn = document.querySelector(".footer button");
const searchUl = document.querySelector(".search-item");

inputField.onkeyup = () => {
  let userInput = inputField.value;
  if (userInput.trim() != 0) {
    saveBtn.disabled = false;
  } else {
    saveBtn.disabled = true;
  }
};

saveBtn.onclick = () => {
  let userInput = inputField.value.trim();
  let localDb = localStorage.getItem("Todo App");

  if (localDb == null) {
    todoList = [];
  } else {
    todoList = JSON.parse(localDb);
  }

  todoList.push(userInput);
  localStorage.setItem("Todo App", JSON.stringify(todoList));
  saveBtn.disabled = true;
  showList();
};

showList();

function showList() {
  let localDb = localStorage.getItem("Todo App");

  if (localDb == null) {
    todoList = [];
  } else {
    todoList = JSON.parse(localDb);
  }

  const pendingTaskNo = document.querySelector(".pendingTasks");
  pendingTaskNo.textContent = todoList.length;

  if (todoList.length > 0) {
    deleteAllBtn.disabled = false;
  } else {
    deleteAllBtn.disabled = true;
  }

  let newLiTag = "";
  todoList.forEach((element, index) => {
    newLiTag += `<li>${element}<button onclick="deleteTask(${index})">delete</button><button onclick="editTask(${index})">edit</button><form><input type="text"></form></li>`;
  });
  todoListUl.innerHTML = newLiTag;
  inputField.value = "";
}

function deleteTask(index) {
  let localDb = localStorage.getItem("Todo App");
  todoList = JSON.parse(localDb);
  todoList.splice(index, 1); //delete or remove the li
  localStorage.setItem("Todo App", JSON.stringify(todoList));
  showList();
}

// edit function
function editTask(index) {
  let localDb = localStorage.getItem("Todo App");
  let editedText = document.querySelector(".todo-list input");
  let userInput = editedText.value;
  // let editFrom = document.querySelector(".todo-list input");
  todoList = JSON.parse(localDb);
  todoList[index] = userInput;
  //   todoList.splice(index, 1); //delete or remove the li
  localStorage.setItem("Todo App", JSON.stringify(todoList));
  showList();
}

// delete all tasks function
deleteAllBtn.onclick = () => {
  todoList = [];
  localStorage.setItem("Todo App", JSON.stringify(todoList));
  showList();
};

const searchForm = document.querySelector(".search-from");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let searchInput = document.querySelector(".search-from input").value.trim();

  let localStorageItem = localStorage.getItem("Todo App");

  if (localStorageItem.indexOf(searchInput) >= 0) {
    let searchTag = `<li>${searchInput}<button onclick="deleteTask(${JSON.parse(
      localStorageItem
    ).indexOf(
      searchInput
    )})">delete</button><button onclick="editTask(${JSON.parse(
      localStorageItem
    ).indexOf(searchInput)})">edit</button></li>`;
    searchUl.innerHTML = searchTag;
  } else {
    let searchTag = "item doesn't exist";
    searchUl.innerHTML = searchTag;
    // searchInput.value = "";
  }

  showList();
});
