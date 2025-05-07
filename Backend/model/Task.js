import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  description: String,
  status: { type: String, default: 'Pending' },
  dueDate: Date,
});

export default mongoose.model('Task', taskSchema);
