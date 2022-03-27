//TODO: fix the response
const dbError = (error,res) => {
    console.error(error);
    error ??= 'There was an error with your request';
    res.status(500).json({error});
}

module.exports = dbError;