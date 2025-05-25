import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todo from '../Todo';

// Simple test to verify Jest is working
test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

describe('Todo Component', () => {
  const mockTodo = {
    _id: '1',
    text: 'Test Todo',
    done: false,
  };

  test('renders todo text', () => {
    render(<Todo todo={mockTodo} onToggle={() => {}} />);
    expect(screen.getByTestId('todo-text')).toHaveTextContent('Test Todo');
  });

  test('shows "Mark as done" button when todo is not done', () => {
    render(<Todo todo={mockTodo} onToggle={() => {}} />);
    expect(screen.getByTestId('toggle-button')).toHaveTextContent('Mark as done');
  });

  test('shows "Mark as undone" button when todo is done', () => {
    const doneTodo = { ...mockTodo, done: true };
    render(<Todo todo={doneTodo} onToggle={() => {}} />);
    expect(screen.getByTestId('toggle-button')).toHaveTextContent('Mark as undone');
  });

  test('calls onToggle when toggle button is clicked', () => {
    const mockOnToggle = jest.fn();
    render(<Todo todo={mockTodo} onToggle={mockOnToggle} />);
    
    const toggleButton = screen.getByTestId('toggle-button');
    fireEvent.click(toggleButton);
    
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  test('applies line-through style when todo is done', () => {
    const doneTodo = { ...mockTodo, done: true };
    render(<Todo todo={doneTodo} onToggle={() => {}} />);
    
    const todoText = screen.getByTestId('todo-text');
    expect(todoText).toHaveStyle('text-decoration: line-through');
  });

  test('does not apply line-through style when todo is not done', () => {
    render(<Todo todo={mockTodo} onToggle={() => {}} />);
    
    const todoText = screen.getByTestId('todo-text');
    expect(todoText).not.toHaveStyle('text-decoration: line-through');
  });
});
