const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 1337;

app.use(express.static('./build'));
app.use('/node_modules', express.static('node_modules'));

//require('./config/routes')(app, express);

app.listen(port, () => console.log(`Listening on port: ${port}`, process.env.TEST));