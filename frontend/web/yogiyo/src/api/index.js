import axios from 'axios'

const apiUrl = 'http://13.124.8.90:3000';
const headers = {
  'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTcxNzA0MDk1LCJleHAiOjE1NzUzMDQwOTV9.WFPbwyhOKJa6r9jmlJE4Pq1VPG3lVDq4daMTiFH2yQs'
};

export default {
  // user 관련
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
  getUserInfo() {
    return axios.get(`${apiUrl}/api/user-info/user/`,{
      headers: {
        "x-access-token": localStorage.getItem('token')
      }})
  },
  setAddress(data) {
    return axios.post(`${apiUrl}/api/user-info/address`,{data}, {
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
  
  // restaurant
  async getCategoryList(idx) {
    return await axios.get(`${apiUrl}/api/restaurants/categories/${idx}`, {headers: headers})
  },
  async getDetailRestaurant(id) {
    return await axios.get(`${apiUrl}/api/restaurants/${id}/menus`, {headers: headers})
  },
  async getCategory() {
    return await axios.get(`${apiUrl}/api/restaurants/categories/`)
  },
  async postCart(data, restaurantId) {
    return await axios.post(`${apiUrl}/api/restaurants/${restaurantId}/cart/`, {data}, {
      headers: {
        "x-access-token": localStorage.getItem('token')
      }
    })
  },
  async requestPayment(data) {
    return await axios.post(`${apiUrl}/api/restaurants/payment-request/`, {data},{
      headers: {
        "x-access-token": localStorage.getItem('token')
      }
    })
  },
  async approvalPayment() {
    return await axios.post(`${apiUrl}/api/restaurants/payment-approval/`, {},{
      headers: {
        "x-access-token": localStorage.getItem('token')
      }
    })
  }
}
