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
//require('./models/index');
const constant = require('./constants')
//Add particular function from file
//const {  authenticate } = require('./middlewares/auth');

//const authRoutes = require('./routes/v1')(express);

app.use(logger('dev'));
app.use(cors());
//Middleware for parsing json objects
app.use(bodyParser.json());
//Middleware for parsing bodies from URL
app.use(bodyParser.urlencoded({ extended: false }));
//app.use('/api/v1/auth', authRoutes.auth);    //For sign up or login
//Authenticaion middleware
// app.use('/api/v1', authenticate);
// Object.keys(authRoutes).map((route) => {
//     if (route !== 'auth') app.use(`/api/v1/${route}`, authRoutes[route]);   //this line is used for routing
// });






// const { ApolloServer, gql } = require('apollo-server');

// // A schema is a collection of type definitions (hence "typeDefs")
// // that together define the "shape" of queries that are executed against
// // your data.
// const typeDefs = gql`
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     title: String
//     author: String
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     book: [Book]
//   }
// `;

// const Books = [
//     {
//       title: 'The Awakening',
//       author: 'Kate Chopin',
//     },
//     {
//       title: 'City of Glasss',
//       author: 'Paul Auster',
//     },
//   ];


//   const resolvers = {
//     Query: {
//       book: () => Books,
//     },
//   };

//   const server2 = new ApolloServer({ typeDefs, resolvers });

//   server2.listen().then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`);
//   });



const { ApolloServer } =require('apollo-server-express');
const {typeDefs}=require("./Schema/TypeDefs")
const{resolvers}=require("./Schema/Resolvers")





 async function startApolloServer(typeDefs, resolvers){
    const server = new ApolloServer({typeDefs, resolvers})
    const app = express();
    await server.start();
    server.applyMiddleware({app});
    let PORT=8080
    app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
}

startApolloServer(typeDefs, resolvers);


















// const port = parseInt(process.env.PORT, 10) || 8080;
// app.set('port', port);




// require('./services/socket.io').init(server);

