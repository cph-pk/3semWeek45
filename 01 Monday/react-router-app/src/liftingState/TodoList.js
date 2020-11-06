import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos, editTodo, deleteTodo }) => {
  // is not in use
  const del = (evt, id) => {
    debugger
    evt.preventDefault();
    deleteTodo(id)
  }
  // Create table instead off ul
  return (
    <React.Fragment>
      <h2>All Persons</h2>
      <table class="table table-striped align-left">
        <thead>
          <tr><th>Id</th><th>Name</th><th>&nbsp;</th></tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}><td style={{ fontSize: "smaller" }}>{todo.id}</td><td>{todo.todoText}</td><td><span style={{ fontSize: "smaller" }}>
              <a href="/#" onClick={(e) => { e.preventDefault(); deleteTodo(todo.id) }}>(delete,&nbsp;</a>
              <a href="/#" onClick={(e) => { e.preventDefault(); editTodo(todo.id) }}>edit)</a>
            </span>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array,
  editTodo: PropTypes.func,
  deleteTodo: PropTypes.func

}
export default TodoList;
