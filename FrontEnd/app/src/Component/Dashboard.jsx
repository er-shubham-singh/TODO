
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask, updateTask, deleteTask } from '../Features/taskSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const token = useSelector((state) => state.auth.token);
  const [formData, setFormData] = useState({ title: '', description: '', dueDate: '', status: 'Pending' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (token) dispatch(fetchTasks(token));
  }, [dispatch, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateTask({ id: editingId, updates: formData, token }));
    } else {
      dispatch(createTask({ task: formData, token }));
    }
    setFormData({ title: '', description: '', dueDate: '', status: 'Pending' });
    setEditingId(null);
  };

  const handleEdit = (task) => {
    setFormData(task);
    setEditingId(task._id);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask({ id, token }));
  };

  const handleToggleDone = (task) => {
    dispatch(updateTask({ id: task._id, updates: { ...task, status: task.status === 'Done' ? 'Pending' : 'Done' }, token }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Tasks</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          className="w-full p-2 border rounded"
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          className="w-full p-2 border rounded"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        ></textarea>
        <input
          className="w-full p-2 border rounded"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        />
        <select
          className="w-full p-2 border rounded"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" type="submit">
          {editingId ? 'Update Task' : 'Add Task'}
        </button>
      </form>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task._id} className="p-4 border rounded shadow-sm bg-white">
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-sm">Due: {task.dueDate?.slice(0, 10)}</p>
                <p className={task.status === 'Done' ? 'text-green-600' : 'text-yellow-600'}>
                  Status: {task.status}
                </p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(task)} className="text-blue-500">Edit</button>
                <button onClick={() => handleToggleDone(task)} className="text-green-500">{task.status === 'Done' ? 'Undo' : 'Mark Done'}</button>
                <button onClick={() => handleDelete(task._id)} className="text-red-500">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
