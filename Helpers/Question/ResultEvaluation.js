const score = (chosenOptions, key) => {
    let s = 0
    const result = key.map((b, i) => {
        if (b && chosenOptions[i])
            s = s + 1
        return (b && chosenOptions[i])
    });
    return s;
}
async function calulateScore(answers, keys) {
    let totalScore=0
    
    await Promise.all(answers.map(async ({answer: chosenOptions, id}, i) => {
        const eachQuestionScore = score(chosenOptions, keys[i])
        totalScore = totalScore + eachQuestionScore
        console.log(`score: ${eachQuestionScore}`)
    }))

    return totalScore;
}
module.exports = {
    calulateScore
}