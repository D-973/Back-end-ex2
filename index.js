const express = require ('express')
const app = express();
const port =3000; 
const members = require('./members.js');
const users = require('./users.js');
const morgan = require('morgan');
const moment = require("moment");

app.use(morgan('tiny'));

app.get("/", (req,res) => {
    res.send("This is the home page")
});

app.get("/about", (req,res) => {
    res.json({
        Status: 'success',
        Message: 'response success',
        Description: 'Exercise #03',
        Date: moment().format('MMMM Do YYYY, h:mm:ss a\n'),
        Data: members,
    })
});

app.get("/users", (req,res) => {
    res.json({
        Status: 'success',
        Message: 'response success',
        Data: users,
    })
});

app.listen(port,() => 
    console.log(`Server running at http://localhost:${port}`)
);