const express = require("express")
const TaskController = require("../controllers/TaskController")
const { authentication } = require("../middleware/authentication");

const router = express.Router()

router.post("/",TaskController.create)
router.get("/",TaskController.getAll)
router.get("/task/_:id", TaskController.getById)
router.get("/name/:name", TaskController.getTaskByName)
router.put("/id/:_id",authentication, TaskController.update)
router.delete("/:_id",authentication, TaskController.delete)

module.exports = router;