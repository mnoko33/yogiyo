import axios from 'axios'
const apiUrl = 'http://70.12.247.65:3000';


export default {
    login(data) {
        return axios.post(`${apiUrl}/api/auth/login/`, {
        data,
    })
    },
    join(data) {
        return axios.post(`${apiUrl}/api/auth/signup/`, {
        data,
    })
    },
    setAddress(data) {
        return axios.post(`${apiUrl}/api/auth/address`,{data}, {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        }
    )
    },
    certificationPhoneNum(data) {
        return axios.post(`${apiUrl}/api/auth/address`,{data}, {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        }
    )
    },
    verificationPhoneNum(data) {
        return axios.post(`${apiUrl}/api/auth/address`,{data}, {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        }
    )
    },
}
