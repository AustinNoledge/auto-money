import axios from 'axios'

const baseUrl = '/api/watchResult'

const getOne = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const update = (changedWatchResult) => {
    return axios.put(baseUrl, changedWatchResult).then(response => response.data)
}

export default { getOne, update }