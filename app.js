// Packages
const logger = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const http = require('http');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

// Express object
const app = express();

// env import
//require('dotenv').config();

//Add files
//require('./models/index');
//const constant = require('./constants')
//Add particular function from file
//const {  authenticate } = require('./middlewares/auth');

//const authRoutes = require('./routes/v1')(express);

//app.use(logger('dev'));
//app.use(cors());
//Middleware for parsing json objects
//app.use(bodyParser.json());
//Middleware for parsing bodies from URL
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use('/api/v1/auth', authRoutes.auth);    //For sign up or login
//Authenticaion middleware
// app.use('/api/v1', authenticate);
// Object.keys(authRoutes).map((route) => {
//     if (route !== 'auth') app.use(`/api/v1/${route}`, authRoutes[route]);   //this line is used for routing
// });
// app.use('getTest',async(req,res)=>{
//     res.send( { status: true, code: 200, message: "call make successfully" });
// })


const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require("./Schema/TypeDefs")
const { resolvers } = require("./Schema/Resolvers")

// app.use(
//     expressJwt({
//         secret: "SUPER_SECRET",
//         algorithms: ["HS256"],
//         credentialsRequired: false
//     })
// )
const HASH_SALT = 'ABCD';

async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({
        typeDefs, 
        resolvers, 
        context: ({req}) => {
         const token=req.headers.authorization;
         return {
             token
         };
        }
    })
    await server.start();
    server.applyMiddleware({ app });

    let PORT = 8080
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    })
}

startApolloServer(typeDefs, resolvers);




















// require('./services/socket.io').init(server);

