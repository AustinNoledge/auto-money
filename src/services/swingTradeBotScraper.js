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
            .catch(error => {
                console.log(error)
                return []
            })
    ) 
}

const getSingleFundHoldings = (fund) => {
    return (
        axios.get(`${baseUrl}/equities/${fund}/etf-components`)
            .then(response => {
                let $ = cheerio.load(response.data.toString())
                let table = $('#main-content > div.row > div > div.card.pop-chart-width > div.card-body > div > table > tbody')
                    .find('a').toArray()
                table = table.map(each => $(each).text())
                return table
            })
            .catch(error => console.log(error))
    )
}

const getReverseETFs = (stock) => {
    return (
        axios.get(`${baseUrl}/etfs-holding/${stock}`)
            .then(response => {
                let $ = cheerio.load(response.data.toString())
                let table = $('#main-content > div.row > div > div.card.pop-chart-width > div.card-body > div > table > tbody')
                    .find('tr').toArray()
                table = table.map(each => $(each).find('td:nth-child(1)').text())
                return table
            })
            .catch(error => console.log(error))
    )
}

export default {
    getOverlapHoldings, getSingleFundHoldings, getReverseETFs
}