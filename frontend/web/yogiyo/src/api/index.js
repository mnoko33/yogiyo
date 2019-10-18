import axios from 'axios'
const apiUrl = 'url = http://70.12.247.65:3000';

export default {
    login(params) {
        return axios.post(`${apiUrl}/api/auth/login/`, {
        params,
    })
    }
}
