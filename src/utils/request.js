import axios from 'axios'
var instance = axios.create({
    baseURL:"http://127.0.0.1/heimamm/public",
})
export default instance