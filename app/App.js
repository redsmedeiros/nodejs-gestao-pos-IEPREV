const express = require('express');
const adminRouter = require('../routes/staff/AdminRouter');
const {globalErrorHandler, notFoundErr} = require('../middlewares/globalErrorHandler');
const { academicYearRoute } = require('../routes/academics/academicYearRoute');
const academicTermRoute = require('../routes/academics/academicTermRoute');
const classLevelRoute = require('../routes/academics/classLevelRoute');
const programRoute = require('../routes/academics/programRoute');

const app = express();

app.use(express.json());

//Routes
app.use('/api/v1/admins', adminRouter)
app.use('/api/v1/academic-year', academicYearRoute);
app.use('/api/v1/academic-term', academicTermRoute);
app.use('/api/v1/class-level', classLevelRoute);
app.use('/api/v1/programs', programRoute);

//MIDDLEWARES
app.use(notFoundErr);
app.use(globalErrorHandler);

module.exports = app;