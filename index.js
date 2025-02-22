// Helper function to get todos
const getTodos = () => JSON.parse(localStorage.getItem('todos')) || [];

document.addEventListener('DOMContentLoaded', () => {
  loadTodos();

  // Handle form submissions
  document.getElementById('todoForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.getElementById('todoInput');
    const todoText = input.value.trim();

    if (todoText) {
      // Get current todos and add new one
      const todos = getTodos();
      const newTodo = {
        id: todos.length + 1,
        title: todoText
      };
      todos.push(newTodo);

      // Save and refresh
      localStorage.setItem('todos', JSON.stringify(todos));
      loadTodos();
      input.value = '';
    }
  });
});

// Main function to load and display todos
function loadTodos() {
  const todoList = document.getElementById('todoList');
  const emptyState = document.getElementById('emptyState');
  const todos = getTodos();

  // Clear current list
  todoList.innerHTML = '';

  // Show/hide empty state
  emptyState.style.display = todos.length === 0 ? 'block' : 'none';

  // Create and append todo items
  todos.forEach(todo => {
    const li = document.createElement('li');

    li.innerHTML = `
      <span>${todo.title}</span>
      <button class="delete" onclick="handleDelete(${todo.id})">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;

    todoList.appendChild(li);
  });
}

// Handle todo deletion
function handleDelete(todoId) {
  const todos = getTodos();
  const updatedTodos = todos.filter(todo => todo.id !== todoId);
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
  loadTodos();
}