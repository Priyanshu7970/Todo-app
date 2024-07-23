import './style.css';

const Addbtn = document.getElementById('Add') as HTMLButtonElement;
const container = document.getElementsByClassName('todos-container')[0] as HTMLDivElement;
const Title = document.getElementsByTagName('input')[0] as HTMLInputElement;

interface T {
  title: string,
  readonly id: string
}

let todos: T[] = [];
const Deletebutton = (id:string)=>{
   let btn = document.getElementById(id) as HTMLButtonElement;
   btn.onclick = function () {
    deleteTodo(id);
   }
}
const render = (a: T[]): void => {
  if (a.length === 0) {
    container.innerHTML = "<h4>Notes not found</h4>";
  } else {
    container.innerHTML = "";
    a.forEach((element) => {
      let div1 = document.createElement('div') as HTMLDivElement;
      div1.className = 'todo-card';
      div1.innerHTML = `
        <h3><span class="todo-title">${element.title}</span></h3>
        <p class="todo-description">Description goes here</p>
        <div class="button-container">
          <button class="edit-button">Edit</button>
          <button id="${element.id}" class="delete-button">Delete</button>
        </div>`;
      container.appendChild(div1); 
      Deletebutton(element.id);
    })
  }
}

const deleteTodo = (id: string): void => {
  let index = todos.findIndex((item) =>
    item.id === String(id));
  todos.splice(index, 1);
  container.innerHTML = "";
  render(todos);
  console.log(id + " This id element deleted from the todo");
  console.log("item left...");
  console.log(todos);
}

const addTodo = (obj: T) => {
  let newtodo: T = {
    title: obj.title,
    id: obj.id
  }
  todos.push(newtodo);
  render(todos);
}

render(todos);

Addbtn.addEventListener('click', (e) => {
  e.preventDefault();
  addTodo({
    title: Title.value,
    id: String(Math.random() * 100)
  });
  console.log(todos);
  let input = document.getElementsByTagName('input')[0];
  input.value = "";
});

