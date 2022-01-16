const users = [];
const socketio = require('socket.io');
const models = require('../models/index');
let io;
module.exports = {
    init: (server) => {
         io = socketio(server);
        io.on('connection', (socket) => {
            socket.on('disconnect', () => {
               
            }); 
        });
      },
};
