const fetch = require('node-fetch')

module.exports = {
    name: 'quiz',
    async execute ( ) {
        fetch('https://quizapi.io/api/v1/questions',{ method: 'get', headers: { 'Content-Type': 'application/json', "X-Api-Key" : process.env.QUIZ_TOKEN } })
        .then(res => res.text()).then(console.log)
    }
}