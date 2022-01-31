const {users,MovieList}=require("../FakeData")
const _=require("lodash")

const resolvers={
    Query:{
        //User Resolver
        getAllUsers(){
        return users
        },
        user(parent,args){
            const id=args.id
            const user =_.find(users,{id:Number(id)})
            console.log(user)
            return user

                    },
        //Movie Resolvers
         movies:()=>{
            return MovieList
                    },

        movie:(parent,args)=>{

            const name=args.name
            console.log(name)
            const movie =_.find(MovieList,{name})
            console.log(movie)
            return movie
        },                    
    },
    
    Mutation:{
        createUser(parent,args){
            const newUser=args;
            users.push(newUser)
            return newUser;
        }
    },
      
};



module.exports={resolvers}