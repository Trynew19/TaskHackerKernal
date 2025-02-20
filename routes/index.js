const express = require("express");
const router = express();
const User = require("../models/user")
const Task = require("../models/task")
const XLSX = require('xlsx');
const fs = require('fs');



// Home Page

router.get("/", (req,res)=>{
    res.render("index")
})

// Dashboard
router.get("/dashboard",async (req,res)=>{
    const users = await User.query();

    res.render("dashBoard",{users})
})
// add yusr page
router.get("/createuser",(req,res)=>{
    res.render("createUser")
})
// add task page
router.get("/addtask", async(req,res)=>{
    const users = await User.query();

    res.render("createTask",{users})
})
// exporst
router.get('/export', async (req, res) => {
    const users = await User.query();
    const tasks = await Task.query();
  
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(users), 'Users');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(tasks), 'Tasks');
  
    XLSX.writeFile(wb, 'data.xlsx');
    res.download('data.xlsx');
  });









module.exports = router;