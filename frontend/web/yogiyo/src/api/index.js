import axios from 'axios'
const apiUrl = 'http://70.12.247.65:3000';

export default {
    login(data) {
        return axios.post(`${apiUrl}/api/auth/login/`, {
        data,
    })
    },
}
