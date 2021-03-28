import axios from 'axios'

const baseUrl = 'http://localhost:3001/watchDetails'

const getOne = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const update = (changedWatchResult) => {
    return axios.put(baseUrl, changedWatchResult).then(response => response.data)
}

export default { getOne, update }