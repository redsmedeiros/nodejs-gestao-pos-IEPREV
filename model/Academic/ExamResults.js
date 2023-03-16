const mongoose = require('mongoose');

const { Schema } = mongoose;

const examResults = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    passMark: {
        type: Number,
        required: true,
        default: 50
    },
    status: {
        type: String,
        required: true,
        enum: ["failed", "passed"],
        default: "failed"
    },
    remarks: {
        type: String,
        required: true,
        enum: ["Excellent", "Good", "Poor"],
        default: "Poor"
    },
    position:{
        type: Number,
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    academicTerm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicTerm",
        required: true
    },
    classLevel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassLevel",
        required: true
    },
    academicYear: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicYear",
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const ExamResults = mongoose.model("ExamResults", examResults);

module.exports = ExamResults;