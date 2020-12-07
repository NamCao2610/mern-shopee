import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://nam-shopee-api.herokuapp.com'
})

export default instance;