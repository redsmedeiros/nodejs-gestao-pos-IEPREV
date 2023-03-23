const express = require('express');
const adminRouter = require('../routes/staff/AdminRouter');
const {globalErrorHandler, notFoundErr} = require('../middlewares/globalErrorHandler');
const { academicYearRoute } = require('../routes/academics/academicYearRoute');
const academicTermRoute = require('../routes/academics/academicTermRoute');

const app = express();

app.use(express.json());

//Routes
app.use('/api/v1/admins', adminRouter)
app.use('/api/v1/academic-year', academicYearRoute);
app.use('/api/v1/academic-term', academicTermRoute)

//MIDDLEWARES
app.use(notFoundErr);
app.use(globalErrorHandler);

module.exports = app;