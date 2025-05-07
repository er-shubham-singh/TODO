import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controller/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const taskRoute = express.Router();

taskRoute.use(protect);

taskRoute.get('/gettask', getTasks);
taskRoute.post('/sendtask', createTask);
taskRoute.put('/updatetask/:id', updateTask);
taskRoute.delete('/deletetask/:id', deleteTask);

export default taskRoute;
