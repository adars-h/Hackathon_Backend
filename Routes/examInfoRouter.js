const { Router } = require('express');
const {
    HandleExamInfoCreation
} = require('../Controllers/Exam/examController');

const examRouter = Router();

examRouter.post('/examInfo', HandleExamInfoCreation);
// examRouter.get('/examInfo', HandleQuestionsRequest); more suitable in question router

module.exports = examRouter;