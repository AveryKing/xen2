const genericError = (req, res) => {
    res.status(500).json({ error: 'Something went wrong!' });
}

module.exports = genericError;