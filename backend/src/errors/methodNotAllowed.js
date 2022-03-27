const methodNotAllowed = (req,res,next) => {
    next({
        status:405,
        message: `${req.method} is invalid for ${req.originalUrl}`
    })
}

module.exports = methodNotAllowed;