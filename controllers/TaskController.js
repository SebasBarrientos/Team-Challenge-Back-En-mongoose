const Task = require("../models/Task")

const jwt = require('jsonwebtoken');
const { authentication } = require("../middleware/authentication")

const TaskController = {
    async create(req, res) {
        try {
            const task = await Task.create({ ...req.body, completed: "false" })
            res.status(201).send(task)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'There´s been a problem creating the task', error })
        }
    },
    async getAll(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const tasks = await Task.find()
                .limit(parseInt(limit))
                .skip((page - 1) * parseInt(limit))
            res.send(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async getById(req, res) {
        try {
            const task = await Task.findById(req.params._id)
            res.send(task)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    async delete(req, res) {
        try {
            console.log(req.params._id);
            const task = await Task.findByIdAndDelete(req.params._id);
            res.send({ message: "Task deleted", task });
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ message: "there was a problem trying to remove the task" });
        }
    },
    async getTaskByName(req, res) {
        try {
          const tasks = await Task.find({
            $text: {
              $search: req.params.name,
            },
          });
          res.send(tasks);
        } catch (error) {
          console.log(error);
        }
      },

    async update(req, res) {
        try {
          const task = await Task.findByIdAndUpdate(
            req.params._id,
            {
              new: true,
            }
          );
          res
            .status(201)
            .send({ msg: "Task updated", task });
        } catch (error) {
          console.log(error);
          res.status(500).send(error);
        }
      },

}

module.exports = TaskController

//importar secreto