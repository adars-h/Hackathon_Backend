// import { removeAnswers } from "./RemoveAnswers";

// TODO: use https://www.mongodb.com/docs/manual/aggregation/#single-purpose-aggregation-methods
// array of questions to be grouped

const RemoveAnswers = (questions) => {
    if(questions !==null && questions !== undefined)
        return questions.map((
            {
                answer: a,
                quesDesc: q,
                subjectType: s,
                options: o,
                _id: i
            }) => (
            {
                quesDesc: q,
                subjectType: s,
                options: o,
                _id: i
            })
        );
        // return questions.map(({questions: qs, ...rest})=>({rest}))
    else
        return null
}

module.exports = {
    RemoveAnswers
}