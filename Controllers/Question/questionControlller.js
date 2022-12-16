const { json } = require("body-parser");
const {
    getQuestion,
    createQuestion,
    getAllQuestions
} = require("../../DB/models/Question");

/**
 * GET  /Question for admin
 * if exists return in response
 * if question doesnt exist return error to next
 * the output will be { “message”: "Exam Succesffuly created” } when the Accept header field is set to ‘application/json’ 
 */
async function HandleQuestionInfoRequest(req, res, next) {
    const {
        examId,
        subjectType,
        questionDescription,
        answer,
        options
    } = req;

    const result = await getQuestion(examId, subjectType, questionDescription)
    const {answer: correctAnswer, ...noAnswerResult}=result;
    console.log(result);
    if (result !== undefined && result !== null) {
        console.log(`Question exists with: ${result._id}`)
        res.json().send(noAnswerResult)
    } else {
        console.log("Error Creating Question")
        const err = new Error(result);
        err.code = 400;
        next(err);
    }
}

/**
 * GET  /Question/all for client/user
 * if exists return in response
 * if question doesnt exist return error to next
 * the output will be { “message”: "Exam Succesffuly created” } when the Accept header field is set to ‘application/json’ 
 */
async function HandleAllQuestionsRequest(req, res, next) {
    const {
        examId
    } = req.query;
    console.log('req.query examId', req.query, examId)
    const result = await getAllQuestions(examId)
    console.log(result);
    if (result !== undefined && result !== null) {
        res.json().send(result)
    } else {
        console.log("Error Fetching Questions")
        const err = new Error(result);
        err.code = 400;
        next(err);
    }
}

/**
 * POST  /Question
 * if exists update?
 * if examName doesnt exist, create one
 * the output will be { “message”: "Exam Succesffuly created” } when the Accept header field is set to ‘application/json’ 
 */
async function HandleQuestionCreation(req, res, next) {
    const {
        examId,
        subjectType,
        questionDescription,
        answer,
        options
    } = req.body;
    console.log('req.body.examId', req.body.examId)
    const result = await getQuestion(examId, subjectType, questionDescription)
    console.log('get question fetched',result);
    if (result === undefined || result === null) {
        try {
            // console.log('e s q a o',examId, subjectType, questionDescription, answer, options)
            const data = await createQuestion(examId, subjectType, questionDescription, answer, options);
            // console.log(`New question created with id: ${data._id}`)
            res.format({
                json: () => {
                    res.send({
                        "status": 200,
                        "message": `New question created with id: ${data._id}`
                    })
                }
            })
        } catch (err) {
            next(err);
        }
    } else {
        console.log("error creating question")
        const err = new Error(result);
        err.code = 400;
        next(err);
    }
}

module.exports = {
    HandleQuestionInfoRequest,
    HandleQuestionCreation,
    HandleAllQuestionsRequest
}