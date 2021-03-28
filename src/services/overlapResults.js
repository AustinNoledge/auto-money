import axios from 'axios'

const baseUrl = 'http://localhost:3001/overlapResult'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newOverlapResult) => {
    const request = axios.post(baseUrl, newOverlapResult)
    return request.then(response => response.data)
}

const update = (id, changedOverlapResult) => {
    const request = axios.put(`${baseUrl}/${id}`, changedOverlapResult)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    update,
    remove
}