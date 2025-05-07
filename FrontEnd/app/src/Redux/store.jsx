

import { configureStore } from '@reduxjs/toolkit';
import tasks from '../Features/taskSlice';
import authentication from '../Features/authSlice';

export const store = configureStore({
  reducer: {
    tasks,
    auth: authentication,
  },
});

