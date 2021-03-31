const axios = require('axios')

const baseUrl = 'https://financialmodelingprep.com'
const apikey  = '435994ab89b96b3e3bfbf6d848d2bc06'
const symbol = 'AAPL'   

let promises = []
    let results  = {}
    let periods  = [5,10,20,60,120,200]
    let auxilary = ['rsi', 'adx']
    auxilary.forEach(each => {
        promises.push(
            axios.get(`${baseUrl}/api/v3/technical_indicator/daily/${symbol}?period=14&type=${each}&apikey=${apikey}`)    
                .then(response => {
                    results[`${each}14`] = response.data[0][`${each}`]
                })
                .catch(error => console.log('fail with rsi and adx with error', error.message))
        )
    })

    Promise.all(promises).then(() => {
        console.log(results);
    })