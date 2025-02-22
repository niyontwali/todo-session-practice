# Todo List Implementation Concepts

## DOMContentLoaded Event
This event runs only after the HTML document has been fully parsed.

### Importance
- Ensures HTML is fully loaded before JavaScript execution
- Prevents null errors when accessing DOM elements
- Improves performance by allowing HTML parsing to continue without waiting for scripts
- Encourages better code organization

## LocalStorage (LS)
Browser's built-in storage system that persists data across page reloads.

### Key Characteristics
- Data remains available even after the browser is closed
- Limited storage capacity (usually 5-10 MB per origin)
- Stores only strings (objects must be converted using JSON)
- Data is specific to the domain
- Operates synchronously, which can impact performance if overused

### Methods Used
- `localStorage.setItem(key, value)`: Stores key-value pairs
- `localStorage.getItem(key)`: Retrieves stored data
- `localStorage.removeItem(key)`: Deletes specific stored data
- `JSON.stringify()`: Converts objects to strings before storage
- `JSON.parse()`: Converts stored strings back into objects

## DOM Manipulation
Methods for dynamically interacting with HTML elements.

### Key Methods
- `document.getElementById()`: Retrieves an element by its ID
- `document.createElement()`: Creates new elements dynamically
- `element.innerHTML`: Sets or retrieves HTML content
- `element.appendChild()`: Adds new elements to the DOM
- `element.style.display`: Controls element visibility

## Event Handling
Manages user interactions.

### Events Used
- `submit`: Handles form submissions
- `click`: Handles button clicks
- `event.preventDefault()`: Prevents default form submission behavior

## Data Structure
Defines how todos are stored and managed.

### Todo Object Structure
```javascript
{
  id: number,      // Unique identifier (based on todos.length + 1)
  title: string    // Todo content
}
```

## Unique ID Generation
Instead of using timestamps, each todo gets an ID based on the array length plus one.

### Implementation:
```javascript
const todos = JSON.parse(localStorage.getItem('todos')) || [];
const newTodo = {
  id: todos.length + 1,  // Ensures each ID is unique and sequential
  title: "New Task"
};
todos.push(newTodo);
localStorage.setItem('todos', JSON.stringify(todos));
```

## Helper Functions
Utility functions for common operations.

### getTodos()
- Purpose: Fetches todos from LocalStorage
- Returns: Array of todo objects
- Handles: Missing data by returning an empty array

## Array Methods
Common JavaScript array operations used.

### Methods Used
- `filter()`: Removes todos when deleted
- `forEach()`: Iterates through todos to render them
- `push()`: Adds new todos to the array

## User Interface Elements
Key HTML elements in the application.

### Elements
- `todoForm`: Form for adding new todos
- `todoInput`: Input field for entering todo text
- `todoList`: Container where todos are displayed
- `emptyState`: Message displayed when no todos exist

## Error Prevention
Measures to avoid common issues.

### Implemented Checks
- Trimming input to prevent blank todos
- Defaulting to an empty array if no todos are found in LocalStorage
- Verifying DOM elements exist before accessing them

This implementation follows modern JavaScript practices while ensuring simplicity, efficiency, and maintainability.

