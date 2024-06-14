import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/tasks', {
        headers: { 'Authorization': token }
      });
      setTasks(res.data);
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await axios.post('/api/tasks', { name: taskName }, {
      headers: { 'Authorization': token }
    });
    setTasks([...tasks, res.data]);
    setTaskName('');
  };

  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/api/tasks/${id}`, {
      headers: { 'Authorization': token }
    });
    setTasks(tasks.filter(task => task._id !== id));
  };

  const handleToggleComplete = async (id) => {
    const token = localStorage.getItem('token');
    const task = tasks.find(task => task._id === id);
    const res = await axios.put(`/api/tasks/${id}`, { completed: !task.completed }, {
      headers: { 'Authorization': token }
    });
    setTasks(tasks.map(t => t._id === id ? res.data : t));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  }).filter(task => task.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <form onSubmit={handleAddTask}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Add a new task"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>
      <div className="form-group">
        <label>Filter</label>
        <select className="form-control" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks"
        />
      </div>
      <ul className="list-group">
        {filteredTasks.map(task => (
          <li key={task._id} className="list-group-item">
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.name}
            </span>
            <button className="btn btn-secondary" onClick={() => handleToggleComplete(task._id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button className="btn btn-danger" onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
