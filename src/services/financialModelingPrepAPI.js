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
            return response.data[0]
        })
}

const getDailyBasicIndicators = (symbol) => {
    let promises = []
    let results  = {}
    let periods  = [5,10,20,60,120,200]
    let auxilary = ['rsi', 'adx']
    periods.forEach((each, index) => {
        if (index === 0) {
            auxilary.forEach(each => {
                promises.push(
                    axios.get(`${baseUrl}/api/v3/technical_indicator/daily/${symbol}?period=14&type=${each}&apikey=${apikey}`)
                        .then(response => {
                            results[`${each}14`] = response.data[0][`${each}`]
                        })
                        .catch(error => console.log('fail with rsi and adx with error', error.message))
                )
            })
        }
        promises.push(
            axios.get(`${baseUrl}/api/v3/technical_indicator/daily/${symbol}?period=${each}&type=ema&apikey=${apikey}`)
                .then(response => {
                    if (index === 0) {
                        results ['price'] = response.data[0]['close']
                    }
                    results[`ema${each}`] = response.data[0]['ema']
                })
                .catch(error => console.log('fail with ema with error', error.message))
        )
    })
    
    return (
        Promise.all(promises).then(() => {
            let {price, ema5, ema10, ema20, ema60, ema120, ema200, rsi14, adx14} = results
            results = {price, ema5, ema10, ema20, ema60, ema120, ema200, rsi14, adx14}
            return results
        })
    )
}

export default {
    getSectorsPerformance,
    getETFHoldings, getETFHolders,
    getQuote, getRatios, getDailyBasicIndicators
}