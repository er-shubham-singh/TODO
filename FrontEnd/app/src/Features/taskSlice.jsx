import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_HOST_URL;


export const fetchTasks = createAsyncThunk('gettask', async (token) => {
  const res = await axios.get(`${API_URL}/gettask`, {
    headers: { Authorization: `Bearer ${token}` }, 
  });
  return res.data;
});

export const createTask = createAsyncThunk('sendtask', async ({ task, token }) => {
  const res = await axios.post(`${API_URL}/sendtask`, task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

export const updateTask = createAsyncThunk('updatetask', async ({ id, updates, token }) => {
  const res = await axios.put(`${API_URL}/updatetask/${id}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

export const deleteTask = createAsyncThunk('deletetask', async ({ id, token }) => {
  await axios.delete(`${API_URL}/deletetask/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return id;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});




export default taskSlice.reducer;
