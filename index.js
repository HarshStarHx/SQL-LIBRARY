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
let new_para = ["1028@" , "J JIBLANI"  ,"jibdfalni2032@yahoo.com","23092654"];
let new_para1=["1020@" , "k JIBLANI"  ,"jidfbadfslni2033@yahoo.com","2309234"];
let new_para2 = ["102d@" , "jamala JIBLANI"  ,"jibasdfldfseni2035@yahoo.com","230923"];

let user = [ new_para, new_para1 , new_para2];
try{
connection.query(new_query , [user] , function(err ,result){
if(err) {console.log(err.message);}
console.log(result);
});
}
catch(e)
{
    console.log("this is the error that i have found " , e);
 
}
finally{

    connection.end();
}
let createRandomUser = () => {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
    };
};


