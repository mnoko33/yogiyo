import axios from 'axios'

const apiUrl = 'http://70.12.247.65:3000';
const headers = {
    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTcxNzA0MDk1LCJleHAiOjE1NzUzMDQwOTV9.WFPbwyhOKJa6r9jmlJE4Pq1VPG3lVDq4daMTiFH2yQs'
};



export default {
    login(data) {
        return axios.post(`${apiUrl}/api/auth/login/`, {
        data,
    })
    },
    async getCategoryList(idx) {
        return await axios.get(`${apiUrl}/api/restaurants/categories/${idx}`, {headers: headers})
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
        return axios.post(`${apiUrl}/api/sms-auth/certification`,{data}
        )
    },
    verificationPhoneNum(data) {
        return axios.post(`${apiUrl}/api/sms-auth/verification`,{data}

    )
    },
}
