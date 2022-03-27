const dbError = (error,req,res) => {
    console.error(error);
    res.status(500).json({error:`code ${error.code}`});
}