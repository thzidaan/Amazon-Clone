import axios from 'axios'

const instance = axios.create({
    baseURL: '...' //API Link for cloud function
})

export default instance;