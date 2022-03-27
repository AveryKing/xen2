const notFound = (req,res) => {
    res.status(404).json({error:'The requested resource does not exist'});
}

module.exports = notFound;