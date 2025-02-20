const express = require("express");
const app = express();
require("dotenv").config();
const {engine} = require("express-handlebars");
const cors = require("cors");
const initDB = require("./utils/db")

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Database
initDB().then(() => console.log('DB Connected'));










// Routes
app.use("/",require("./routes/index"))
app.use("/api/user",require("./routes/user"))
app.use("/api/task",require("./routes/task"))




app.listen(process.env.PORT,()=>{
    console.log(`Server running on port:${process.env.PORT}`);
    
})