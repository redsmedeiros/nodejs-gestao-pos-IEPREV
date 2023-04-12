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
        createdBy: req.userAuth?._id,
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

const getAllExams = expressAsyncHandler(async (req, res)=>{

    const exams = await Exam.find();

    res.json({
        status: 'success',
        message: 'Exams fetched success',
        data: exams
    });

});

const getSingleExam = expressAsyncHandler(async (req, res)=>{

    const exam = await Exam.findById(req.params.id);

    if(!exam){
        throw new Error('Exam not found');
    }

    res.json({
        status: 'success',
        message: 'Exam fetched success',
        data: exam
    })
});

const updateExam = expressAsyncHandler(async (req, res)=>{

    const { name, description, classLevel, subject, program, academicTerm, duration, examDate, examTime, examType, createdBy, academicYear } = req.body;

    const examExists = await Exam.findOne({ name });

    if(examExists){
        throw new Error('Exam already exits');
    }

    const examUpdate = await Exam.findByIdAndUpdate(req.params.id, {
        name, 
        description, 
        classLevel, 
        subject, 
        program, 
        academicTerm, 
        duration, 
        examDate, 
        examTime, 
        examType, 
        createdBy, 
        academicYear
    }, { new: true });

    res.json({
        status: 'success',
        message: 'Exam update success',
        data: examUpdate
    })
})

const deleteExam = expressAsyncHandler(async (req, res)=>{

    await Exam.findByIdAndDelete(req.params.id);

    res.json({
        status: 'success',
        message: 'Delete success'
    });
});

module.exports = {
    createExam,
    getAllExams,
    getSingleExam,
    updateExam,
    deleteExam
}