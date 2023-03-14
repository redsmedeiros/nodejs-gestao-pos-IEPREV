const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');

const TeacherSchema = new moongose.Schema({

    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dataEmployed: {
        type: Date,
        default: Date.now
    },
    teacherId: {
        type: String,
        required: true,
        default: function(){
            return (
                "TEA" + Math.floor(100 + Math.random() * 900) + Date.now().toString().slice(2 ,4) + this.name.split(" ").map(name => name[0]).join("").toUpperCase()
            );
        }
    },
    isSuspended: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "teacher"
    },
    subject: {
        type: moongose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    applicationStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
        required: true
    },
    classLevel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassLevel",
        required: true
    },
    academicYear: {
        type: moongose.Schema.Types.ObjectId,
        ref: "AcademicYear",
        required: true
    },
    examsCreated: [
        {
            type: moongose.Schema.Types.ObjectId,
            ref: "exam"
       } 
    ],
    createdBy: {
        type: moongose.Schema.ObjectId,
        ref: "Admin",
        required: true
    },
    academicTerm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicTerm",
        required: true
    }
}, { timestamps: true});

const Teacher = moongose.model("teacher", TeacherSchema);

module.exports = Teacher;