const { faker } = require('@faker-js/faker');
// this is used to aquire the faker
// which is used the fake existing data about the real world
const mysql2 = require('mysql2');

const connection = mysql2.createConnection(
{
   host:'localhost',
   user:'root',
   database:'STARUX_DATA',
   password:"05012007"
});
try{
connection.query('SHOW TABLES', function(err, results) {
    if (err) 
    {
        throw err
    } 
    else{
        console.log(results);
    }
    console.log("the try and catch task is completed");
});
}
catch(e){
    console.log("the program is not executing " , e);

}
finally{
    console.log("finally the program is finshish");
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


