const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// DB config
require('./config/db');

const app = express();

const poll = require('./routes/poll');

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));

// Enable cors module
app.use(cors());

app.use('/poll', poll);

const port = 3000;

//Start server
app.listen(port, ()=>console.log(`server started on port ${port}`));


