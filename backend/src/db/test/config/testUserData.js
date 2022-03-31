const bcrypt = require('bcryptjs');
const service = require('../../../users/users.service');
const users = [
    {username: 'amy', email: 'amy@gmail.com', password: 'amy'},
    {username: 'adam', email: 'adam@gmail.com', password: 'adam'},
    {username: 'kylie', email: 'kylie@gmail.com', password: 'kylie'},
    {username: 'anna', email: 'anna@gmail.com', password: 'anna'},
]

users.forEach(user => {
    service.hashPassword(user.password)
        .then(hash => {
            user.password = hash;
        })
})

module.exports = users;