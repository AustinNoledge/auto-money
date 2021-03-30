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
        .then(response => {
            const {name, changesPercentage, priveAvg50, priceAvg200, 
                exchange, earningsAnnouncement, timestamp, ...data} = response.data[0]
            return data
        })
}

const getRatios = (symbol) => {
                      
    return axios.get(`${baseUrl}/api/v3/ratios/${symbol}?period=quarter&limit=1&apikey=${apikey}`)
        .then(response => {
            Object.keys(response.data[0]).forEach(each => {
                let data = response.data[0][each]
                if ((typeof data) === 'number') {
                    response.data[0][each] = Math.round(data*10000)/10000
                }
            })
            return response.data[0]
        })
}

export default {
    getSectorsPerformance,
    getETFHoldings, getETFHolders,
    getQuote, getRatios
}