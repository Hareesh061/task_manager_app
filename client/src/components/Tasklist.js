import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
  return (
    <ul className="list-group">
      {tasks.map(task => (
        <Task key={task._id} task={task} onToggleComplete={onToggleComplete} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default TaskList;
