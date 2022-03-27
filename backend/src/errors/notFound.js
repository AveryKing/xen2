const notFound = (req,res,next) => {
    next({
        status:400,
        message: 'The requested resource was not found'
    })
}

module.exports = notFound;