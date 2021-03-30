import axios from 'axios'

const baseUrl = 'https://financialmodelingprep.com'
const apikey  = process.env.REACT_APP_FINANCIALKEY

const getSectorsPerformance = () => {
    return axios.get(`${baseUrl}/api/v3/sectors-performance?apikey=${apikey}`)
        .then(response => response.data)
}

const getETFHoldings = (fund) => {
    return axios.get(`${baseUrl}/api/v3/etf-holder/${fund}?apikey=${apikey}`)
        .then(response => response.data.map(each => each.asset))
}

const getETFHolders = (symbol) => {
    return axios.get(`${baseUrl}/api/v3/mutual-fund-holder/${symbol}?apikey=${apikey}`)
        .then(response => response.data.map(each => {
            return ({holder: each.holder, change:each.change})
        }))
}

const getQuote = (symbol) => {
    return axios.get(`${baseUrl}/api/v3/quote/${symbol}?apikey=${apikey}`)
        .then(response => response.data.map(each => {
            return ({
                symbol:each.symbol,
                price:each.price, change:each.change, volume:each.volume,
                dayLow: each.dayLow, dayHigh: each.dayHigh
            })
        }))
}

export default {
    getSectorsPerformance,
    getETFHoldings, getETFHolders,
    getQuote
}