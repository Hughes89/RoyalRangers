const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 1337;

app.use(express.static('./build'));
app.use('/node_modules', express.static('node_modules'));

//require('./config/routes')(app, express);

mongoose.connect(process.env.database ,() => {
  app.listen(port, () => console.log(`Listening on port: ${port}`));
});