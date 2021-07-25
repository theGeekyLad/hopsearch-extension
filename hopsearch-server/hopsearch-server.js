const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    console.log('Got a request.');
    res.send(JSON.stringify([{
        'stackoverflow.com': '.s-input',
        'www.linkedin.com': '.search-global-typeahead__input',
        'www.windy.com': '#q',
        'www.vocabulary.com': '#search',
        'www.hdfcbank.com': '.dummy-input',
        "developer.chrome.com": ".search-box__input",
        "www.amazon.in": "#twotabsearchtextbox",
        "www.flipkart.com": "._3704LK",
        "www.quora.com": ".q-input",
        "www.reddit.com": "#header-search-bar"
    }]));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})