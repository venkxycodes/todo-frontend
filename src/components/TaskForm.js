import React, { useEffect } from 'react';
import { Form, Input, DatePicker, Select, Button } from 'antd';
import moment from 'moment';

const TaskForm = ({ addTask, closeForm, editingIndex, tasks, updateTask }) => {
  const [form] = Form.useForm();

  useEffect(() => {
  if (editingIndex !== null) {
    const taskToEdit = tasks[editingIndex];

    // Check if the deadline is a valid moment object or parse it accordingly
    const deadline = taskToEdit.deadline
      ? moment.isMoment(taskToEdit.deadline)
        ? taskToEdit.deadline
        : moment(taskToEdit.deadline) // If it's a valid date string, moment will handle it
      : null;

    console.log("Editing task:", taskToEdit, "Parsed deadline:", deadline); // Debugging

    form.setFieldsValue({
      name: taskToEdit.name,
      description: taskToEdit.description,
      deadline,
      priority: taskToEdit.priority,
    });
  } else {
    form.resetFields();
  }
}, [editingIndex, tasks, form]);

  const handleSubmit = (values) => {
    const { name, description, deadline, priority } = values;
    console.log("Submitted values:", values); // Debug: Check form submission values

    // Ensure the deadline is properly formatted and not null
    const formattedDeadline = deadline ? deadline.format('YYYY-MM-DD') : null;

    if (editingIndex !== null) {
      updateTask(editingIndex, { name, description, deadline: formattedDeadline, priority, state: tasks[editingIndex].state });
    } else {
      addTask({ name, description, deadline: formattedDeadline, priority, state: 'PENDING' });
    }
    resetForm();
  };

  const resetForm = () => {
    form.resetFields();
    closeForm();
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        label="Task Name"
        name="name"
        rules={[{ required: true, message: 'Please enter a task name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please enter a description' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Deadline"
        name="deadline"
        rules={[{ required: true, message: 'Please select a deadline' }]}
      >
        {/* Ensure DatePicker value is a valid moment object */}
        <DatePicker value={form.getFieldValue('deadline')} />
      </Form.Item>
      <Form.Item
        label="Priority"
        name="priority"
        initialValue="Low"
      >
        <Select>
          <Select.Option value="Low">Low</Select.Option>
          <Select.Option value="Medium">Medium</Select.Option>
          <Select.Option value="High">High</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Task
        </Button>
        <Button type="default" onClick={resetForm} style={{ marginLeft: '8px' }}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
