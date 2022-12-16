
// import { GroupQuestions } from "../../Helpers/Question/GroupQuestons";
const mongoose = require('mongoose');
const GroupBy = require("../../Helpers/Question/GroupQuestons");
const examInfo = require('../models/ExamInfo');
const QuestionSchema = new mongoose.Schema({
    subjectType: {
        type: String,
        enum: ['Maths', 'Physics', 'Chemistry'],
        required:true
    },
    questionDesc: {
        type: String,
        required: true
    },
    answer: {
        type: [Boolean],
        required: true
    },
    options: {
        type: [String],
        required: true
    }
});

const ExamSchema = new mongoose.Schema({
    examName: {
        type: String,
        required: true
    },
    examType: {
        type: String,
        enum: ['CAT', 'JEE'],
        default: 'JEE',
        required: true
    },
    examDate: {
        type: Date,
        required: true,
        default: () => Date.now() + 7 * 24 * 60 * 60 * 1000
    },
    questions: [QuestionSchema]
})

const Question = mongoose.model("Question", QuestionSchema);

const Exam = mongoose.model('Exam', ExamSchema);


// CRUD

async function createExam(examName, examType, examDate) {
    const data = await Exam.create({
        examName: examName,
        examType: examType,
        examDate: new Date(examDate)
    })
    return data;
}

async function getExam() {
    const data = await ExamInfo.findOne({
        examName: examName,
        examType: examType,
        examDate: examDate
    });
    return data;
}

async function updateExam() {
    const data = await ExamInfo.findOne({
        examName: examName,
        examType: examType,
        examDate: examDate
    });
    return data;
}

async function createQuestion(examId, subjectType, questionDesc, answer, options) {
    const data = await Question.create({
        examId: examId,
        subjectType: subjectType,
        questionDesc: questionDesc,
        answer: answer,
        options: options
    })
    return data;
}

async function getQuestion(examId, subjectType, questionDesc) {
    const data = await Question.findOne({
        examId: examId,
        subjectType: subjectType,
        questionDesc: questionDesc,
    });
    return data;
}

// TODO getQuestionBySybject using aggregate functions
async function getAllQuestions(examId) {
    // const data = await Question.find({
    //     examId: examId,
    // }).populate('examId')
    const data = await Question.find().populate('examId')
    console.log('data', data)
    return GroupBy.GroupBy(data);
}

module.exports = {
    getQuestion,
    createQuestion,
    getAllQuestions,
    Question
}