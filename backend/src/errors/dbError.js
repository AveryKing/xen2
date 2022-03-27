const dbError = (error,res) => {
    console.error(error);
    res.status(500).json({error});
}

module.exports = dbError;