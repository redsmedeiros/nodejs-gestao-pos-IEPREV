const express = require('express');
const adminRouter = require('../routes/staff/AdminRouter');
const {globalErrorHandler, notFoundErr} = require('../middlewares/globalErrorHandler');

const app = express();

app.use(express.json());

//Routes
app.use('/api/v1/admins', adminRouter)

//MIDDLEWARES
app.use(notFoundErr);
app.use(globalErrorHandler);

module.exports = app;