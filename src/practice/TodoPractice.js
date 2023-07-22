import React, { useState } from 'react';
import "../App.css"
import delt from './images/delete.svg';
import tick from './images/tick-green.svg';
import revert from './images/revert.svg';

export default function TodoPractice() {
  const [task, setTask] = useState('');
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [serialNumber, setSerialNumber] = useState(1);

  const addTask = () => {
    if (task) {
      const newTask = {
        name: task,
        id: serialNumber
      };
      setPendingTasks([...pendingTasks, newTask]);
      setTask('');
      setSerialNumber(serialNumber + 1);
    }
  };

  const handleTaskCompletion = (taskId) => {
    const taskToComplete = pendingTasks.find((task) => task.id === taskId);
    if (taskToComplete) {
      setPendingTasks(pendingTasks.filter(task => task.id !== taskId));
      setCompletedTasks([...completedTasks, taskToComplete]);
    }
  };

  const handleTaskReversion = (taskId) => {
    const taskToRevert = completedTasks.find(task => task.id === taskId);
    if (taskToRevert) {
      setCompletedTasks(completedTasks.filter(task => task.id !== taskId));
      setPendingTasks([...pendingTasks, taskToRevert]);
    }
  };

  const removeItem = (taskId) => {
    setPendingTasks(pendingTasks.filter(task => task.id !== taskId));
    setCompletedTasks(completedTasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="content">
      <h1>To Do List</h1>
      <h3>Things to be done</h3>
      <ul>
        {pendingTasks.map((task) => (
          <li className="element" key={task.id}>
            <input type="checkbox" onChange={() => handleTaskCompletion(task.id)} />
            <label>{task.id}. {task.name}</label>
            <button onClick={() => removeItem(task.id)}>
              <img src={delt} alt="dltbut" />
            </button>
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="+ Type new tasks..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="add" onClick={addTask}>
        Add New
      </button>

      <h3>Completed</h3>
      <ul>
        {completedTasks.map((task) => (
          <li className="element" key={task.id}>
            <span className="tk">
              <img src={tick} alt="tick" className="tick" />
            </span>
            <label className="completed">{task.id}. {task.name}</label>
            <button onClick={() => handleTaskReversion(task.id)}>
              <img src={revert} alt="rvtbut" className="revert" />
            </button>
            <button onClick={() => removeItem(task.id)}>
              <img src={delt} alt="dltbut" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
