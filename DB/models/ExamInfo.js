const mongoose = require('mongoose');
const examInfoSchema = new mongoose.Schema({
    examDate: {
        type: Date,
        default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
        required: true
    },
    examName: {
        type: String,
        required: true
    },
    examType: {
        type: String,
        enum: ['CAT', 'JEE'],
        default: 'CAT',
        required:true
    },
});

const ExamInfo = mongoose.model("ExamInfo", examInfoSchema);

async function getExamInfo(examName, examType, examDate) {
    const data = await ExamInfo.findOne({ examName: examName, examType: examType, examDate: examDate });
    return data;
}

async function createExamInfo(examName, examType, examDate) {
    // const examDate_date = new Date(examDate);
    const data = await ExamInfo.create({
        examDate: new Date(examDate),
        examName: examName,
        examType: examType
    })
    return data;
}

module.exports = {
    getExamInfo,
    createExamInfo,
    ExamInfo
}