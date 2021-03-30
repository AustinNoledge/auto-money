const axios = require('axios')

const baseUrl = 'https://financialmodelingprep.com'
const apikey  = '435994ab89b96b3e3bfbf6d848d2bc06'

axios.get(`${baseUrl}/api/v3/mutual-fund-holder/TSLA?apikey=${apikey}`)
    .then(response => {
        console.log(response.data);
    })