const { faker } = require('@faker-js/faker');
// this is used to aquire the faker
// which is used the fake existing data about the real world
const mysql2 = require('mysql2');

const connection = mysql2.createConnection(
    {
       host:"localhost",
       database:"STARUX_DATA",
       user:"root",
       password:"05012007"
    }
);
let createRandomUser = () => {
    return [
        faker.string.uuid(),
         faker.internet.username(),
         faker.internet.email(),

         faker.internet.password()  ]
};

let query = "SHOW TABLES";
try{
connection.query(query,function(err , result){
    if(err)
    {
        console.log("there is an error which is happening inside of the window ");
    }else{
    let value =  result;
    console.log(value);
    console.log(value.length);
    console.log(value[0]);
    console.log(value[1]);
    
    }
});
}
catch(e){
    console.log("this is the error that i am getting ");
    
    
}


let new_query= "INSERT INTO USER(ID , USERNAME ,EMAIL, PASSWORD) VALUES ?";
let data = [];
for(let i =0;i<100;i++)
{
  data.push(createRandomUser());
}

try{
connection.query(new_query , [data], function(err ,result){
if(err) {console.log(err.message);}
console.log(result);
console.log(result.length)
});
}
catch(e)
{
    console.log("this is the error that i have found " , e);
 
}
finally{

    connection.end();
}



