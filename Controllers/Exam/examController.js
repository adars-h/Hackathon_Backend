/*
hadnles db connections reagrding exam model
*/

const { json } = require("body-parser");
const {
    createExamInfo,
    getExamInfo,
} = require("../../DB/models/ExamInfo");


/**
 * POST  /examInfo
 * if exists update? return that exam already exists
 * if examName doesnt exist, create one
 * the output will be { “message”: "Exam Succesffuly created” } when the Accept header field is set to ‘application/json’ 
 */
async function HandleExamInfoCreation(req, res, next) {
    const {
        examName,
        examType,
        examDate,
    } = req.body;

    console.log('HandleExamCreation')
    const result = await getExamInfo(examName, examType, examDate)
    console.log(result);
    if (result === undefined || result === null) {
        try {
            const data = await createExamInfo(examName, examType, examDate);
            res.format({
                json: () => {
                    res.send({
                        "status": 200,
                        "message": `New exam created with id: ${data._id}`
                   })
                }
            })
        } catch (err) {
            next(err);
        }
    } else {
        console.log("Exam already exists")
        const err = new Error("Exam already exists");
        err.code = 400;
        next(err);
    }
}



module.exports = {
    HandleExamInfoCreation
};

