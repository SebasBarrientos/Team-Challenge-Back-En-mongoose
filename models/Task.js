const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please complete the name field"],
      }
  ,
    description: {
        type: String,
        required: [true, "Please complete the description field"],
      }
  ,
    completed: {
        type: Boolean,
      }
  
}, { timestamps: true });

TaskSchema.index({
    name: "text",
  });
  
  
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;