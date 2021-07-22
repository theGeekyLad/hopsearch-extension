const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    console.log('Got a request.');
    res.send(JSON.stringify([{
        'stackoverflow.com': '.s-input',
        'www.linkedin.com': '.search-global-typeahead__input',
        'www.windy.com': '#q'
    }]));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})