import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5001/challenge-fe8f5/us-central1/api' //API Link for cloud function
})

export default instance;