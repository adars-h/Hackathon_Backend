const { Router } = require('express');
const {
    HandleQuestionInfoRequest,
    HandleQuestionCreation,
    HandleAllQuestionsRequest
} = require('../Controllers/Question/questionControlller');

const questionRouter = Router();

questionRouter.post('/question', HandleQuestionCreation);
questionRouter.get('/question', HandleQuestionInfoRequest); 
questionRouter.get('/all', HandleAllQuestionsRequest); 
// TODO
// questionRouter.post('/answers', HandleAnswerSubmission);


module.exports = questionRouter;