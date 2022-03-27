const genericError = (error, request, response) => {
    const { status = 500, message = "Something went wrong!" } = error;
    response.status(status).json({ error: message });
}

module.exports = genericError;