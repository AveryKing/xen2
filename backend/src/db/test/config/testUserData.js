const bcrypt = require('bcryptjs');

module.exports = [
    {username: 'amy', email: 'amy@gmail.com', password: bcrypt.hash('amy',10)},
    {username: 'adam', email: 'adam@gmail.com', password: bcrypt.hash('adam',10)},
    {username: 'kylie', email: 'kylie@gmail.com', password: bcrypt.hash('kylie',10)},
    {username: 'anna', email: 'anna@gmail.com', password: bcrypt.hash('anna',10)},
]