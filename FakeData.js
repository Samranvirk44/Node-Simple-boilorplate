let MovieList=[
    {
        id:1,
        name:"ABC",
        yearOfPublication:2019,
        isInTheaters:true
    },
    {
        id:2,
        name:"CDE",
        yearOfPublication:2022,
        isInTheaters:false
    },
    {
        id:2,
        name:"FGH",
        yearOfPublication:2025,
        isInTheaters:false
    },

]

let user=[
    {
        id:1,
        name:"Pedro",
        age:19,
        married:false
    },
    {
        id:2,
        name:"Paulo",
        age:15,
        married:true
    },
    {
        id:3,
        name:"Angel",
        age:20,
        married:false,
        wifes:[{name:"samra",age:21},{name:"fatima",age:22}]
    }

]


module.exports={users:user,MovieList:MovieList}