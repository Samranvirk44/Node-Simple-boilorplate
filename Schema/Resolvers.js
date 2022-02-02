const { users, MovieList } = require("../FakeData")
const _ = require("lodash")
const libs = require("../libs")
const jwt = require('jsonwebtoken');
const models = require('../models')

const resolvers = {
    Query: {
        //User Resolver
        getAllUsers() {
            return users
        },
        getAllUsersDB() {
            let users_db = libs.User.getAll()
            console.log(users_db)
            return users_db
        },
        user(parent, args) {
            console.log()
            const id = args.id
            const user = _.find(users, { id: Number(id) })
            console.log(user)
            return user

        },
        //Movie Resolvers
        movies: () => {
            return MovieList
        },

        movie: (parent, args) => {

            const name = args.name
            console.log(name)
            const movie = _.find(MovieList, { name })
            console.log(movie)
            return movie
        },
    },

    Mutation: {
        createUser(parent, args, token) {
            const newUser = args;
            users.push(newUser)
            return newUser;
        },
        RegisterUserDB(parent, args) {
            let newUser = libs.User.createUser(args)
            return newUser;
        },
        login: async (parent, args,token ) => {
            let result = await libs.Auth.loginUser(args)    
            console.log(result)
            console.log(result.token)        
            // console.log("token abc",token);
            return result.token
           

        },
        VerifyUser: async (parent, args,token ) => {
            let result = await libs.Auth.VerifyUser(args,token)    
          //  console.log("-----",token)        
            // console.log("token abc",token);
            return result.token
           

        }
    },

};



module.exports = { resolvers }