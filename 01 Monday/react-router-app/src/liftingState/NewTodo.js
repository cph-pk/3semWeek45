import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function NewTodo(props) {
  const [todo, setTodo] = useState(props.nextTodo);

  const handleSubmit = evt => {
    if (todo.todoText === "") {
      return;
    }
    props.addTodo(todo);
    evt.preventDefault();
  };
  const cancel = evt => {
    evt.preventDefault();
    props.setNewTodo({ id: "", todoText: "" })
  };

  useEffect(() => setTodo({ ...props.nextTodo }), [props.nextTodo]);

  const onChange = evt => {
    const val = evt.target.value;
    todo.todoText = val;
    setTodo({ ...todo });
  };
  const title = todo.id==="" ?"Add new person" : "Edit person"
  return (
    <div>
      <h3>{title}</h3>
      <form onSubmit={handleSubmit}>
        <input value={todo.todoText} onChange={onChange} />
        <div style={{ marginTop: 5 }}>
          <button onClick={handleSubmit} className="btn btn-success">Save</button>&nbsp;
          <button onClick={cancel} className="btn btn-danger">Clear</button>
        </div>
      </form>

      {todo.id !== "" && <p>Editing Person</p>}
    </div>
  );
}

NewTodo.propTypes = {
  setNewTodo: PropTypes.func,
  nextTodo: PropTypes.object,
  addTodo: PropTypes.func,
  title: PropTypes.string
};

export default NewTodo;