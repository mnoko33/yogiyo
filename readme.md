**현재 url** = `http://70.12.247.65:3000`

**주의**

`api/users` 와 `api/auth` 를 제외한 경우 모든 api 요청은 headers에 jwt token이 존재해야한다.

```json
// headers
{
    x-access-token: jwt
}
```



# routes/user.js

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
       "email": email,
       "password": password,   // 특수문자, 숫자, 문자를 모두 포함한 8~15자리
       "phone_num": 010-1234-5678,
       "username": username // 없을 경우 이메일 @ 앞부분으로 대체
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
       "email": email,
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



# routes/restaurant.js

1. 카테고리 별 식당보기

   `get` : url/api/restaurants/categories/:categoryIdx

   ```json
   categoryIdx = [
       "전체보기",      // 0
       "1인분주문",    // 1
       "프랜차이즈",    // 2
       "치킨",         // 3
       "피자양식",     // 4
       "중국집",       // 5
       "한식",         // 6
       "일식돈까스",   // 7
       "족발보쌈",     // 8
       "야식",        // 9
       "분식",        // 10
       "카페디저트",  // 11
       "편의점"      // 12
   ];
   
   // res
   {
       "status": true,
       "restaurants": [
           {
               "id": 2,
               "name": "쫄면주는 삼겹본능-강남점",
               "category": "야식::프랜차이즈::한식",
               "thumbnailUrl": "",
               "address": "역삼동",
               "lng": 127.029799209808,
               "lat": 37.4970170754811,
               "openTime": "11:00 - 01:00",
               "deliveryTime": 60,
               "representativeMenus": "구이삼겹 1인, 구이삼겹 2인",
               "deliveryFee": 2000,
               "minOrderAmount": 12000,
               "paymentMethods": "creditcard::online",
               "createdAt": "2019-10-15T13:48:47.000Z",
               "updatedAt": "2019-10-15T13:48:47.000Z"
           }
       ]
   }
   ```

   

2. 매장별 메뉴 보기

   `GET` : url/api/restaurants/:restaurantId/menus

   ```json
   //res 
   {
       "status": true,
       "menus": [
           {
               "id": 1,
               "name": "마라탕",
               "price": 7000,
               "restaurantId": 1,
               "createdAt": "2019-10-15T13:57:49.000Z",
               "updatedAt": "2019-10-15T13:57:49.000Z"
           }
       ]
   }
   ```

   