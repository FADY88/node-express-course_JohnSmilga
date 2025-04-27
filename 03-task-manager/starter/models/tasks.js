const mongoose = require("mongoose");

// create schema with validation
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
    maxlength: [30, "name can not be more than 30 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// export model with the schema
module.exports = mongoose.model("Task", TaskSchema);
