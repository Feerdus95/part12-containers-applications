import Todo from '../components/Todo';

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const handleToggle = (todo) => {
    // Toggle the todo's done state
    completeTodo(todo);
  };

  return (
    <div data-testid="todo-list">
      {todos.map((todo, index) => (
        <div key={todo._id || index} style={{ margin: '10px 0' }}>
          <Todo 
            todo={todo} 
            onToggle={() => handleToggle(todo)} 
          />
          <button 
            onClick={() => deleteTodo(todo)}
            style={{ marginLeft: '10px' }}
            data-testid="delete-button"
          >
            Delete
          </button>
          {index < todos.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
