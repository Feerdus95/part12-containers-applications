import PropTypes from 'prop-types';

const Todo = ({ todo, onToggle }) => {
  return (
    <div className="todo" data-testid="todo-item">
      <span 
        style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
        data-testid="todo-text"
      >
        {todo.text}
      </span>
      <button 
        onClick={onToggle}
        data-testid="toggle-button"
        type="button"
      >
        {todo.done ? 'Mark as undone' : 'Mark as done'}
      </button>
    </div>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    _id: PropTypes.string,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Todo;
