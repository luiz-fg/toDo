let cont = 0;
let tasksDo, todoEntry, id, array, counter;
let myStorage = localStorage;
class toDo {
  constructor() {
    addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        td.newTask();
        td.char_count();
      }
    });
  }

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
    let doubleTask = false;

    for (let i in array) {
      let a = array[i].task;
      if (a.toUpperCase() == todoEntry.toUpperCase()) {
        doubleTask = true;
      }
    }

    if (todoEntry == "") {
      alert("Não aceita entradas vazias!");
    } else if (doubleTask) {
      alert(`tarefa já existe!`);
    } else {
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

      tasksDo.innerHTML += `
      <div class="task" >
      <span style="color:${cor}" class="taskText" id="id-${cont}" onclick="td.taskDone(this.id, ${array[i].idd})">${array[i].task}</span>
      <input type="button" class="btn-del" value="X" onclick="td.deleteTask(${array[i].idd})">
      </div>
      `;
      cont++;
    }
  }

  char_count() {
    counter = document.getElementById("counter");
    todoEntry = document.getElementById("todo-entry").value;

    if (todoEntry.length == 0) {
      counter.innerHTML = 82;
    }
    counter.innerHTML = 82 - todoEntry.length;
  }

  generateID() {
    return Number(Math.random(Math.random() * 1000));
  }
}

let td = new toDo();
