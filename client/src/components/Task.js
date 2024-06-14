import React from 'react';

const Task = ({ task, onToggleComplete, onDelete }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span style={{ textDecoration: task.completed ? 'line-through' : '' }}>{task.name}</span>
      <div>
        <button className="btn btn-secondary btn-sm" onClick={() => onToggleComplete(task._id)}>
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button className="btn btn-danger btn-sm ml-2" onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </li>
  );
};

export default Task;
