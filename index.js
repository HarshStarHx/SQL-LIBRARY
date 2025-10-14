const { faker } = require('@faker-js/faker');

let getRandomUser = () => {
    return {
        Id: faker.string.uuid(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        ava: faker.image.avatar(),
        password: faker.internet.password()
    };
}
for (let i = 0; i <= 10; i++) {
    console.log(getRandomUser());
}