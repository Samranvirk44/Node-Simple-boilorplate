// Packages
const logger = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const http = require('http');

// Express object
const app = express();

// env import
require('dotenv').config();

//Add files
require('./models/index');
const constant = require('./constants')
//Add particular function from file
const {  authenticate } = require('./middlewares/auth');

const authRoutes = require('./routes/v1')(express);

app.use(logger('dev'));
app.use(cors());
//Middleware for parsing json objects
app.use(bodyParser.json());
//Middleware for parsing bodies from URL
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/auth', authRoutes.auth);    //For sign up or login
//Authenticaion middleware
app.use('/api/v1', authenticate);
Object.keys(authRoutes).map((route) => {
    if (route !== 'auth') app.use(`/api/v1/${route}`, authRoutes[route]);   //this line is used for routing
});

const port = parseInt(process.env.PORT, 10) || 5000;
app.set('port', port);

const server = http.createServer(app);
require('./services/socket.io').init(server);
server.listen(port, () => {
    console.log(constant.strings.server.success, port);
});
