import React from 'react';
import { Button, Card } from 'antd';

const Task = ({ task, index, editTask, confirmDeleteTask, moveTask }) => {
          return (
                    <Card title={task.name} bordered={true} style={{ marginBottom: '16px' }}>
                              <p>{task.description}</p>
                              <p>Deadline: {task.deadline}</p>
                              <p>Priority: {task.priority}</p>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Button type="primary" onClick={() => editTask(index)}>Edit</Button>

                                        {task.state === 'IN PROGRESS' && (
                                                  <>
                                                  <Button onClick={() => moveTask(index, 'PENDING')}>←</Button>
                                                  <Button onClick={() => moveTask(index, 'COMPLETED')}>→</Button>
                                                  </>
                                        )}

                                        {task.state === 'PENDING' && (
                                                  <Button onClick={() => moveTask(index, 'IN PROGRESS')}>→</Button>
                                        )}

                                        {task.state === 'COMPLETED' && (
                                                  <Button onClick={() => moveTask(index, 'IN PROGRESS')}>←</Button>
                                        )}

                                        <Button type="danger" onClick={() => confirmDeleteTask(index)}>Delete</Button>
                              </div>
                    </Card>
          );
};

export default Task;
