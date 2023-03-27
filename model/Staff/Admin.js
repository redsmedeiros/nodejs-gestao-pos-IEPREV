const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    name: {
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
    role: {
        type: String,
        default: "admin"
    },
    academicTerms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicTerms"
    }],
    academicYears: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicYear"
    }],
    classLevels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassLevel"
    }],
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }],
    program: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program"
    }],
    yearGroup: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "YearGroup"
    }]
}, { timestamps: true}); 

//hash password antes de salvar no db
adminSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//verify password
adminSchema.methods.verifyPassword = async function(enteredPassword){
  
    return await bcrypt.compare(enteredPassword, this.password);
};

//model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;