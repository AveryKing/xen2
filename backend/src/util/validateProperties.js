const validateProperties = (...properties) => {
    return function (res, req, next) {
        const { data  } = req.body;
            properties.forEach((property) => {
                console.log(property)
                const value = data[property];
                if (!value) {
                    res.status(400).json({error:`Required parameter '${property} is missing.`})
                }
                next();
            });
    };
}

module.exports = validateProperties;