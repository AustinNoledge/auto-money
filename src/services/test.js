const axios = require('axios')
const cheerio = require('cheerio')

const baseUrl = 'https://swingtradebot.com/'
const one = 'ARKK'
const two = 'VUG'
axios.get(`${baseUrl}/etf-comparison/${one}-vs-${two}`)
    .then(response => {
        let $ = cheerio.load(response.data.toString())
        let table = $('#main-content > div.row > div > div:nth-child(6) > div > div > div.card-body > div > table > tbody')
            .find('a').toArray()
        table = table.map(each => $(each).text())
        console.log(table);
    })