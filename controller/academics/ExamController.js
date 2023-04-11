const Exam = require('../../model/Academic/Exam');
const Teacher = require('../../model/Staff/Teacher');
const expressAsyncHandler = require('express-async-handler');

const createExam = expressAsyncHandler(async (req, res)=>{

    const { name, description, classLevel, subject, program, academicTerm, duration, examDate, examTime, examType, createdBy, academicYear } = req.body;

    const teacherFound = await Teacher.findById(req.userAuth?._id);

    if(!teacherFound){
        throw new Error('Teacher not found');
    }

    const examExists = await Exam.findOne({ name });

    if(examExists){
        throw new Error('Exam already exists');
    }

    const examCreated = new Exam({
        name,
        description,
        academicTerm,
        academicYear,
        classLevel,
        createdBy,
        duration,
        examDate,
        examStatus,
        examTime,
        examType,
        subject,
        program
    })

    teacherFound.examsCreated.push(examCreated._id);

    await examCreated.save();

    await teacherFound.save();

    res.status(201).json({
        status: 'success',
        message: 'Exam created',
        data: examCreated
    })
});

module.exports = {
    createExam
}