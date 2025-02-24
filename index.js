// Get the element object
const form = document.getElementById('todoForm');
const ul = document.getElementById('todoList');
const empty = document.getElementById('emptyState');
const modal = document.getElementById('modal');
const modalForm = document.querySelector('#modal form');
const modalInput = document.querySelector('#modal form input');

// getting todos from the LS
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// load items from the LocalStorage
const loadToDos = () => {
  console.log('Loading todos:', todos); // Debugging line

  // Clear the ul element
  ul.innerHTML = "";

  // start working on our ul
  if (todos.length === 0) {
    empty.style.display = 'block';
  } else {
    empty.style.display = 'none';
  }

  // display the items in the ul element
  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${todo.title}</span>
      <div class='btns'>
        <button class='edit' onclick="openModal(${todo.id})">
          <i class="fa-solid fa-edit"></i>
        </button>
        <button class='delete' onclick="handleDelete(${todo.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      `;
    console.log('Appending todo:', todo); // Debugging line
    // append created lists into ul
    ul.appendChild(li);
  });
};

// add note function
const addNote = (e) => {
  // prevent form defaults
  e.preventDefault();

  const input = document.getElementById('todoInput');
  const inputValue = input.value;

  const id = todos.length + 1;

  const data = {
    id: id,
    title: inputValue
  };

  console.log('Adding todo:', data); // Debugging line
  // push/unshift our data into the todos array
  todos.unshift(data);

  // store todos in the localStorage
  localStorage.setItem('todos', JSON.stringify(todos));

  // reset the form
  form.reset();
  // load updated data
  loadToDos();
};

// handle Delete
const handleDelete = (id) => {
  // ensure that the todo is surely wanted to be deleted
  if (confirm("Are you sure you want to delete this todo?")) {
    console.log('Deleting todo with id:', id); // Debugging line
    // remove deleted todo from todos and update todos
    todos = todos.filter(todo => todo.id !== id)
    localStorage.setItem('todos', JSON.stringify(todos))

    // load updated data
    loadToDos();
  }
};

// handle Update
const handleUpdate = (id) => {
  // find todo by id
  const todo = todos.find(t => t.id === id);

  console.log('Updating todo with id:', id) // Debugging line

  // update todo
  todo.title = modalInput.value;
  localStorage.setItem('todos', JSON.stringify(todos))

  // close Modal
  closeModal()

  // load updated data
  loadToDos();

  // alert
  alert("Todo updated successfully.")
};


const openModal = (id) => {
  modal.style.display = "flex";
  const todo = todos.find(t => t.id === id);
  modalInput.value = todo.title;
  modalForm.dataset.id = todo.id;
};

const closeModal = () => {
  modal.style.display = "none";
};

modalForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const todoId = parseInt(modalForm.dataset.id)
  handleUpdate(todoId)
})


// close modal whenever esc button pressed
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // create an event listener to our submit
  form.addEventListener('submit', addNote);

  // invoke loadToDos function
  loadToDos();
});