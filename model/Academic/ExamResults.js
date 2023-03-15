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
    }
});

const ExamResults = mongoose.model("ExamResults", examResults);

module.exports = ExamResults;