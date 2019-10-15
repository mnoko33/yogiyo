**현재 url** = `http://192.168.0.7:3000`

**주의**

`api/users` 와 `api/auth` 를 제외한 경우 모든 api 요청은 headers에 jwt token이 존재해야한다.

```json
// headers
{
    x-access-token: jwt
}
```



# routes/users.js

1. 유저 리스트

   `GET` : url/api/users

   ```json
   // res
   {
       "status": true,
       "users": [
           {
               "username": "mnoko",
               "phone_num": "010-1234-5678",
               "address": "구로동",
               "location": "126.8778766::37.4951124"
           }
       ]
   }
   ```

   

2. 특정 유저

   `GET` : url/api/user/:username

   ```json
   // params
   {
       "username": username
   }
   
   // res
   {
       "status": true,
       "username": "mnoko",
       "phone_num": "010-1234-5678",
       "address": "구로동",
       "location": "126.8778766::37.4951124"
   }
   ```

   

# routes/auth.js

1. 회원가입

   `POST` : url/api/auth/signup

   ```json
   // Body
   {
       "username": username,
       "password": password,
       "phone_num": 010-1234-5678
   }
   
   // res
   {
       "user": {
           "id": 2,
           "username": "lee",
           "phone_num": "010-1234-5678",
           "updatedAt": "2019-10-14T14:05:51.870Z",
           "createdAt": "2019-10-14T14:05:51.870Z"
       }
   }
   ```

2. 로그인

   `POST` : url/api/auth/login

   ```json
   // Body
   {
       "username": username,
       "password": password
   }
   
   // res
   {
       "jwt": jwt
   }
   ```




# routes/info.js

1. 주소저장

   `POST` : url/api/info/address

   ```json
   // Body
   {
       "user_id": 1,
       "x": 127.1086228, // 위도
       "y": 37.4012191, // 경도
   }
   
   // res
   {
       "status": true,
       "address": "구로동",
       "location": "126.8778766::37.4951124"
   }
   ```

