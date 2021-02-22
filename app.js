const express = require("express");
const mongoose = require("mongoose");

// very friendly for development
// whatever the routes are requested will be shown on console
const morgan = require("morgan");

// sending data from client as a request body
// and then will be able to grab that from request body
const bodyParser = require("body-parser");

// for saving any data in cookies
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

require("dotenv").config();
// import routes here
const userRoutes = require("./routes/user")

// app
const app = express();

// db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("DB Connected Successfully"))

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())

// routes middleware
app.use("/api", userRoutes)

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is listing on port ${port}`)
})

