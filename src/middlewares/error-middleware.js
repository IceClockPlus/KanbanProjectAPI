const errorHadlerMiddleware = (err, req, res, next) => {
    res.status(500).json({
        error: 'Internal Server Error'
    });
};

module.exports = errorHadlerMiddleware;