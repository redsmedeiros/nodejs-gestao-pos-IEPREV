const globalErrorHandler = //Error middleware
(err, req, res, next)=>{

    const stack = err.stack;
    const message = err.message;
    const status = err.status ? err.status : "failed";
    const statusCode = err.statusCode ? err.statusCode : 500;

    res.status(statusCode).json({
        message,
        stack,
        status
    })
};

const notFoundErr = (req, res, next)=>{
    const err = new Error(`Can not find ${req.originalUrl} on the server`);
    next(err);
}

module.exports = {globalErrorHandler, notFoundErr};