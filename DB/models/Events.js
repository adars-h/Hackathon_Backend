const RemoveAnswersObject = require('../../Helpers/Question/RemoveAnswers');
const ResultEvaluationObject = require('../../Helpers/Question/ResultEvaluation')

const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');

const QuestionSchema = new mongoose.Schema({
    subjectType: {
        type: String,
        enum: ['Maths', 'Physics', 'Chemistry'],
        required: true
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

const EventsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: () => Date.now() + 7 * 24 * 60 * 60 * 1000
    },
    date: {
        type: Number,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum:["discussion", "exam"],
        default: "discussion",
        required: true,
    },
    candidatesInfo: [
        {
            username: {
                type: String,
                required: true,
            },
            score: {
                type: Number,
                required: true,
            },
        },
    ], 
    questions: [
        QuestionSchema   
    ],

});

const Question = mongoose.model("Question", QuestionSchema);

const Events = mongoose.model("Events", EventsSchema);


async function createEvent(name, date, section, type, candidatesInfo, questions) {
    console.log(name, date, section, type);
    if (questions === undefined || questions === null) {
        const res = await Events.create({
            name: name,
            date: date,
            section: section,
            type: type,
        });
        return res
    }
    else if (questions !== undefined || questions !== null) {
        const res = await Events.create({
            name: name,
            date: date,
            section: section,
            type: type,
            candidatesInfo: candidatesInfo,
            questions: questions
        });
        return res
    }
    else {
        console.log('Invalid Args');
        return undefined;
    }
}

async function getEvents(section) {
    const data = await Events.find({ section: section });
    return data;
}

async function getQuestionsByExamId(examId) {
    const data = await Events.findOne({ _id: new ObjectId(examId) });
    return data;
}

// can cache results when an examid is requested
async function getEventsById(examId) {
    // console.log(`filter: {_id: ${new ObjectId(examId)}}`);
    const data = await getQuestionsByExamId(examId);

    // console.log(`data: ${data}`)
    const {
        questions: questionsWithAnswers,
        name: n,
        date: d,
        section: s, 
        type:t
    } = data;
    // console.log(`questiosns no answer: ${RemoveAnswersObject.RemoveAnswers(questionsWithAnswers) }`)
    // console.log(`questions: ${questionsWithAnswers}, `)
    const dataWithoutAnswers = {
        questions: RemoveAnswersObject.RemoveAnswers(questionsWithAnswers),
        name: n,
        date: d,
        section: s,
        type: t
    };

    // array.map(({ questions: questionsWithAnswers, ...keepAttrs }) => ({questions}))
    // console.log(`data without answers: ${dataWithoutAnswers}`)
    return dataWithoutAnswers;
}


// answers of form <id, chosenArr>
async function getScore(answers, examId) {
    const questions = await getQuestionsByExamId(examId)
    // console.log("questions : ", questions);
    const keys = questions.questions.map(({
        answer: ar,
        ...rest
    }) => ar)
    const totalScore=ResultEvaluationObject.calulateScore(answers,keys)
    return totalScore
}
async function addCandidate(eventID, username) {
    const res = await Events.updateOne(
        { _id: eventID },
        { $push: { candidatesInfo: { username: username } } }
    );
    return res;
}
async function removeCandidate(eventID, username) {
    const res = await Events.updateOne(
        { _id: eventID },
        { $pull: { candidatesInfo: { username: username } } }
    );
    return res;
}
async function updateScoreCandidate(eventID, username, score) {
    const res = await Events.updateOne(
        { _id: eventID, "candidatesInfo.username": username },
        { $set: { "candidatesInfo.$.score": score } }
    );
    return res;
}
module.exports = {
    getEvents,
    getEventsById,
    getScore,
    createEvent
    createEvent,
    addCandidate,
    updateScoreCandidate,
    removeCandidate,
};
