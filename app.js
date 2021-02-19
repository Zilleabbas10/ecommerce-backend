const express = require("express");
const app = express();
require("dotenv").config();

app.get('/', (req, res) => {
    res.send("Hello Node Server")
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is listing on port ${port}`)
})

