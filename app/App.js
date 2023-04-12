const express = require('express');
const adminRouter = require('../routes/staff/AdminRouter');
const {globalErrorHandler, notFoundErr} = require('../middlewares/globalErrorHandler');
const { academicYearRoute } = require('../routes/academics/academicYearRoute');
const academicTermRoute = require('../routes/academics/academicTermRoute');
const classLevelRoute = require('../routes/academics/classLevelRoute');
const programRoute = require('../routes/academics/programRoute');
const subjectRoute = require('../routes/academics/subjectRoute');
const yearGroupRoute = require('../routes/academics/yearGroupRoute');
const teacherRoute = require('../routes/staff/TeacherRoute');
const examRoute = require('../routes/academics/examRoute');

const app = express();

app.use(express.json());

//Routes
app.use('/api/v1/admins', adminRouter)
app.use('/api/v1/academic-year', academicYearRoute);
app.use('/api/v1/academic-term', academicTermRoute);
app.use('/api/v1/class-level', classLevelRoute);
app.use('/api/v1/programs', programRoute);
app.use('/api/v1/subjects', subjectRoute);
app.use('/api/v1/year-group', yearGroupRoute);
app.use('/api/v1/teachers', teacherRoute);
app.use('/api/v1/exam', examRoute);

//MIDDLEWARES
app.use(notFoundErr);
app.use(globalErrorHandler);

module.exports = app;