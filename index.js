document.addEventListener('DOMContentLoaded', () => {
  // Get the element object
  const form = document.getElementById('todoForm');
  const ul = document.getElementById('todoList');
  const empty = document.getElementById('emptyState');


  // load items from the LocalStorage
  const loadToDos = () => {
    // getting todos from the LS
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    // start working on our ul
    if (todos.length === 0) {
      empty.style.display = 'block';
    } else {
      empty.style.display = 'none';
    }

    // handle Delete
    const handleDelete = (id) => {
      console.log('Item to be delete is of id:', id);
    };

    // display the items in the ul element
    todos.forEach((todo) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${todo.title}</span>
        <button class='delete' onclick="handleDelete(${todo.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
        `;
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

    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    const id = todos.length + 1;

    const data = {
      id: id,
      title: inputValue
    };

    // push/unshift our data into the todos array
    todos.unshift(data);

    // store todos in the localStorage
    localStorage.setItem('todos', JSON.stringify(todos));

    // reset the form
    form.reset();
    // load updated data
    loadToDos();

  };

  // create an event listener to our submit
  form.addEventListener('submit', addNote);

  // invoke loadToDos function
  loadToDos();
});