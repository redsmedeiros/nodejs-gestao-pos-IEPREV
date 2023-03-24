const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProgramSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true,
        default: "4 years"
    },
    code: {
        type: String,
        default: function(){
            return(
                //essa expressão gera um ID aleatório composto pelas iniciais do nome em letras maiúsculas, seguidas por dois pares de números aleatórios
                this.name.split(" ").map(name => name[0]).join("").toUpperCase() + Math.floor(10 + Math.random() * 90) + Math.floor(10 + Math.random() * 90)
            )
        }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    teachers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Theacher",
            default: []
        }
    ],
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            default: []
        }
    ],
    subjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            default: []
        }
    ]
}, { timestamps: true});

const Program = mongoose.model("Program", ProgramSchema);

module.exports = Program;