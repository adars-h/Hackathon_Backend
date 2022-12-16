const removeAnswer = (questionObject) => {
    const { answer: correctAnswer, ...rest } = questionObject;
    return rest;
}
 
// array of question objects
const removeAnswers = (questions)=>{
    const questionsWithoutAnswers = questions.map(question => removeAnswer(question))
    return questionsWithoutAnswers;
}

module.exports = {
    removeAnswers
};
