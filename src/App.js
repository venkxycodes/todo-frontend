import React, { useState } from 'react';
import { Button, Row, Col, Modal } from 'antd';
import TaskForm from './components/TaskForm';
import Task from './components/Task';
import ConfirmationPopup from './components/ConfirmationPopup';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [taskToDeleteIndex, setTaskToDeleteIndex] = useState(null);
  const [isZoomed, setIsZoomed] = useState(null);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    resetForm();
  };

  const editTask = (index) => {
    setEditingTaskIndex(index);
    setIsFormVisible(true);
  };

  const updateTask = (index, updatedTask) => {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
    resetForm();
  };

  const confirmDeleteTask = (index) => {
    setIsConfirmationVisible(true);
    setTaskToDeleteIndex(index);
  };

  const deleteTask = () => {
    if (taskToDeleteIndex !== null) {
      const newTasks = tasks.filter((_, i) => i !== taskToDeleteIndex);
      setTasks(newTasks);
      setIsConfirmationVisible(false);
      setTaskToDeleteIndex(null);
    }
  };

  const resetForm = () => {
    setIsFormVisible(false);
    setEditingTaskIndex(null);
  };

  const moveTask = (index, newState) => {
    setIsZoomed(index);
    setTimeout(() => {
      const newTasks = [...tasks];
      newTasks[index] = { ...newTasks[index], state: newState };
      setTasks(newTasks);
      setIsZoomed(null);
    }, 300);
  };

  return (
    <div className="app">
      <header>
        <h1>Mark you tasks, track your progress</h1>
      </header>
      <Row gutter={16} className="task-columns">
        {['PENDING', 'IN PROGRESS', 'COMPLETED'].map((status) => (
          <Col key={status} span={8}>
            <h2>{status}</h2>
            {tasks.filter(task => task.state === status).map((task, index) => (
              <div key={index} className={`task-container ${isZoomed === index ? 'zoom' : ''}`}>
                <Task
                  task={task}
                  index={index}
                  editTask={editTask}
                  confirmDeleteTask={confirmDeleteTask}
                  moveTask={moveTask}
                />
              </div>
            ))}
          </Col>
        ))}
      </Row>
      <Button
        type="primary"
        size="large"
        onClick={() => setIsFormVisible(true)}
        className = "add-button"
      >Add task</Button>
      <Modal
        open={isFormVisible}
        onCancel={resetForm}
        footer={null}
      >
        <TaskForm
          addTask={addTask}
          closeForm={resetForm}
          editingIndex={editingTaskIndex}
          tasks={tasks}
          updateTask={updateTask}
        />
      </Modal>
      {isConfirmationVisible && (
        <ConfirmationPopup
          confirmDelete={deleteTask}
          cancelDelete={() => setIsConfirmationVisible(false)}
        />
      )}
    </div>
  );
};

export default App;
