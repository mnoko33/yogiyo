import axios from 'axios'


const apiUrl = 'url = http://70.12.247.65:3000';
const headers = {
    "headers": {
        "x-access-token":  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzc2F1ZHkiLCJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VybmFtZSI6ImFkbWluIiwiYWRkcmVzcyI6bnVsbCwibG9jYXRpb24iOm51bGwsInBob25lX251bWJlciI6IjAxMC0xMjM0LTU2NzgiLCJpYXQiOjE1NzEzNjE4Nzh9.5yguUpQMAiq7vitLMZhyWFWgHNbzUQmNxbFQdRy7_7Y'
    }
}

export default {
    login(params) {
        return axios.post(`${apiUrl}/api/auth/login/`, {
        params,
    })
    },
    getCategoryList(idx) {
        return axios.get(`${apiUrl}/api/restaurants/categories/${idx}`, {headers: headers})
    }
}
