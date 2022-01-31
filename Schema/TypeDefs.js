const {gql}=require("apollo-server-express")

const typeDefs=  gql`
type User{
    id:ID!
    name:String!
    age:Int!
    married:Boolean!,
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
    user(id:ID!):User
    
    movies:[Movie]
    movie(name:String!):Movie
}


 

#Mutations

type Mutation{
    createUser(name:String!,age:Int!,married:Boolean!):User!
}
`
module.exports ={typeDefs}