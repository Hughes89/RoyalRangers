const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 1337;

app.use(express.static('./build'));
app.use('/node_modules', express.static('node_modules'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE', 'PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});
require('./config/routes')(app, express);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.database ,() => {
  app.listen(port, () => console.log(`Listening on port: ${port}`));
});