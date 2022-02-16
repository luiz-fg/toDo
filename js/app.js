let cont = 0;
let tasksDo, todoEntry, id, array;
let myStorage = localStorage;

class toDo {
  constructor() {}

  setStorage(array) {
    myStorage.setItem("toDo", JSON.stringify(array));
  }

  getStorage() {
    return JSON.parse(localStorage.getItem("toDo") || "[]");
  }

  deleteTask(idd) {
    array = this.getStorage();
    for (let i in array) {
      if (array[i].idd == idd) {
        array.splice(i, 1);
      }
    }
    this.setStorage(array);
    this.showTask();
  }

  taskDone(idd, id) {
    let task = document.getElementById(idd);
    array = this.getStorage();

    for (let i in array) {
      if (array[i].idd == id && array[i].status == "done") {
        array[i].status = "toDo";
        task.style.color = "black";
      } else if (array[i].idd == id && array[i].status == "toDo") {
        array[i].status = "done";
        task.style.color = "lightgray";
      }
    }
    this.setStorage(array);
  }

  newTask() {
    todoEntry = document.getElementById("todo-entry").value;

    array = this.getStorage();
    array.push({
      idd: this.generateID(),
      task: todoEntry,
      status: "toDo",
    });

    this.setStorage(array);
    this.showTask();

    todoEntry = document.getElementById("todo-entry").value = "";
    todoEntry = document.getElementById("todo-entry").focus();
  }

  showTask() {
    array = this.getStorage();
    tasksDo = document.querySelector(".tasksDo");
    let cor;

    tasksDo.innerHTML = "";
    for (let i in array) {
      if (array[i].status == "done") {
        cor = "lightgray";
      } else if (array[i].status == "toDo") {
        cor = "black";
      }

      // style="color:white;padding:30px;"
      tasksDo.innerHTML += `
      <div class="task" >
      <span style="color:${cor}" class="taskText" id="id-${cont}" onclick="td.taskDone(this.id, ${array[i].idd})">${array[i].task}</span>
      <input type="button" class="btn-del" value="X" onclick="td.deleteTask(${array[i].idd})">
      </div>
      `;
      cont++;
    }
  }

  generateID() {
    return Number(Math.random(Math.random() * 1000));
  }
}

let td = new toDo();
