const Task = require("../models/tasks");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/customError");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) {
    // to make catch handle this error
    // throw new Error(`No task with id: ${req.params.id}`);
    // ---------
    // const error = new Error("Not found");
    // error.status = 404;
    // return next(error);
    // -------
    return next(createCustomError(`No task with id: ${req.params.id}`, 404));
    return res
      .status(404)
      .json({ success: false, msg: `No task with id: ${req.params.id}` });
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  // findOneAndDelete returns the deleted
  // deleteOne does NOT return the deleted record
  const task = await Task.findOneAndDelete({ _id: req.params.id });
  if (!task) {
    return next(createCustomError(`No task with id: ${req.params.id}`, 404));
  }
  res.status(200).json({ task });
  // res.status(200).send();
  // res.status(200).json({ success: true, task: null });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
    // to be used with put method aks replace while patch is edit or update
    // overWritten: true
  });
  if (!task) {
    return next(createCustomError(`No task with id: ${req.params.id}`, 404));
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
