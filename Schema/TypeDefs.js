const {gql}=require("apollo-server-express")

const typeDefs=  gql`
type User{
    id:ID!
    name:String!
    age:Int!
    married:Boolean!,
    email:String!,
    password:String!
    wifes:[User]
}
type Movie{
    id:ID!
    name:String
    yearOfPublication:Int!
    isInTheaters:Boolean!
} 


# Queries
type Query{
    getAllUsers:[User!]!
    getAllUsersDB:[User!]!

    user(id:ID!):User
    viewer:User!
    movies:[Movie]
    movie(name:String!):Movie
}


 

#Mutations

type Mutation{
    createUser(name:String!,age:Int!,married:Boolean!):User!
    RegisterUserDB(name:String!,email:String!,password:String!):User!
    login(email:String!,password:String):String
        VerifyUser(email:String!,password:String):String

}
`
module.exports ={typeDefs}