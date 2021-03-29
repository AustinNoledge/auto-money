import axios from 'axios'
import cheerio from 'cheerio'

const baseUrl = 'https://swingtradebot.com'

const getOverlapHoldings = (fundOne, fundTwo) => {
    return (
        axios.get(`${baseUrl}/etf-comparison/${fundOne}-vs-${fundTwo}`)
            .then(response => {
                let $ = cheerio.load(response.data.toString())
                let table = $('#main-content > div.row > div > div:nth-child(6) > div > div > div.card-body > div > table > tbody')
                    .find('a').toArray()
                table = table.map(each => $(each).text())
                return table
            })
            .catch(error => console.log(error))
    )
    
}

export default { getOverlapHoldings }