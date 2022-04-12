const service = require('./users.service');

// Validates request parameters
const doParamsExist = (req, res, next) => {
    const requiredProperties = ['username', 'password', 'email'];
    const missingParameters = [];
    const {data} = req.body;
    if (!data) {
        next({
            status: 400,
            message: 'Request body is malformed'
        })
    }
    requiredProperties.forEach(property => {
        if (!data[property]) {
            missingParameters.push(property)
        }
    })
    return missingParameters.length
        ? next({status: 400, message: `Missing parameters: ${missingParameters.join(', ')}`})
        : next();
}

const isUsernameValid = (req, res, next) => {
    const {username} = req.body.data;
    if (username.length < 3 || username.length > 10) {
        return next({
            status: 400,
            message: 'Your username must be between 3 and 10 characters.'
        })
    }
    next();
}

const isEmailValid = (req, res, next) => {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    //  console.log(req.body.data.email)
    if (!req.body.data.email.match(pattern)) {
        return next({
            status: 400,
            message: 'That email is invalid.'
        })
    }
    next();
}

const isPasswordValid = (req, res, next) => {
    if (req.body.data.password.length < 6) {
        return next({
            status: 400,
            message: 'Your password must be at least 6 characters in length.'
        })
    }
    next();
}

// Returns a list of all users
const list = (req, res, next) => {
    service.list()
        .then(data => {
            res.json({data});
        })
        .catch((err) => {
            console.error(err);
            next({
                status: 500,
                message: 'There was an error retrieving users from the database.'
            })
        })
}

// Registers a new user
const create = async (req, res, next) => {
    await service.create(req.body.data)
        .then((data) => {
            res.json({
                data: {
                    message: 'success',
                    userId: data[0].id
                }
            })
        })
        .catch((err) => {
            if (err.detail.includes('username')) {
                return next({
                    status: 400,
                    message: 'That username is taken. Please choose a different one.'
                })
            } else if (err.detail.includes('email')) {
                return next({
                    status: 400,
                    message: 'That email is taken. Please use a different one.'
                })
            }
            next({
                status: 500,
                message: 'There was an error creating your account.'
            })
        })
}

// Returns a user's data
const read = (req, res, next) => {
    const {userId} = req.params;
    service.read(userId)
        .then(data => {
            if (!data.length) {
                return next({
                    status: 404,
                    message: 'User not found'
                });
            }
            res.json({data});
        })
        .catch(() => {
            next({
                status: 500,
                message: 'There was an error retrieving this user from the database.'
            })
        })
}

const login = async (req, res, next) => {
    const {username, password} = req.body.data;
    if (!username || !password) {
        return next({
            status: 400,
            message: 'Invalid request'
        })
    }
    const validate = await service.validatePassword(username, password);
    if (validate) {
        return res.json({
            data: {
                token: validate
            }
        })
    } else {
        return next({
            status: 401,
            message: 'There was an error logging in'
        })
    }


}

module.exports = {
    login: login,
    list: list,
    create: [
        doParamsExist,
        isUsernameValid,
        isEmailValid,
        isPasswordValid,
        create
    ],
    read: read
}