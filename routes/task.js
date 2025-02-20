const express = require("express");
const router = express();
const Task = require("../models/task")



// Add Task
router.post('/create', async (req, res) => {
    const { user_id, task_name, status } = req.body;
    await Task.query().insert({ user_id, task_name, status });
    res.redirect('/dashBoard');
  });


//  Tasks by User ID
router.get('/:user_id', async (req, res) => {
  try {
      const tasks = await Task.query().where('user_id', req.params.user_id);
      res.render("tasks", { tasks });
  } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).send("Internal Server Error");
  }
});








module.exports = router;