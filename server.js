const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require('dotenv').config()

const port = process.env.SERVER_PORT || 2000;

app.listen(port)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const db = require('./db/mongodb')
db()

console.log(`Listening On http://localhost:${port}`)
app.use(cors())
app.use('/', require('./api/routers'))
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

// app.use('/assigns', require('./api/routers'))

module.exports = {
    app,
};
