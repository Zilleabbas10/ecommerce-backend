const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
//import routes here
const userRoutes = require("./routes/user")

//app
const app = express();

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("DB Connected Successfully"))

//routes middleware
app.use("/api", userRoutes)

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is listing on port ${port}`)
})

