// import { removeAnswers } from "./RemoveAnswers";

const RemoveAnswers= require('./RemoveAnswers');

// TODO: use https://www.mongodb.com/docs/manual/aggregation/#single-purpose-aggregation-methods
// array of questions to be grouped
const GroupBy = (questions) => {
    if(questions !==null && questions !== undefined)
        return group(RemoveAnswers.removeAnswers(questions));
    else
        return null
}
const group = (questions) => {
    const maths = questions.filter(ques=>ques.subjectType=='Maths');
    const physics = questions.filter(ques => ques.subjectType =='Physics');
    const chemistry = questions.filter(ques => ques.subjectType == 'Chemistry')
    
    // returns an ovj with key: subject type and value as array of questions
    const res = {
        "Maths": maths,
        "Physics": physics,
        "Chemistry": chemistry
    }
    return res;
}

module.exports = {
    GroupBy
}