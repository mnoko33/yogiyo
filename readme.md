[TOC]

:heavy_check_mark: : 현재 사용 가능 

:x: : 현재 사용 불가

**1. routes/auth.js**

​	:heavy_check_mark: ​`POST` url/api/auth/login (로그인)

​	:heavy_check_mark: ​`POST` url/api/auth/signup (회원가입)



**2. routes/user-info/js**

​	:heavy_check_mark: `GET` url/api/user-info/user (특정 유저 정보)

​	:heavy_check_mark: `POST` url/api/user-info/address (유저 위치 정보)

​	:heavy_check_mark: `GET` url/api/user-info/history (유저 주문 기록 보기)



**3. routes/restaurants.js**

​	:heavy_check_mark: ​`GET` url/api/restaurants/categories (카테고리 정보)

​	:heavy_check_mark: `GET` url/api/restaurants/categories/:categoryId (카테고리별 식당)

​	:heavy_check_mark: `GET` url/api/restaurants/:restaurantId (매장 정보 보기)

​	:heavy_check_mark: `GET` url/api/restaurants/:restaurantId/info (매장 상세 정보 보기)

​	:heavy_check_mark: `GET` url/api/restaurants/:restaurantId/menus (매장별 메뉴 보기) 

​	:heavy_check_mark: `POST` url/api/restaurants/:restaurantId/cart (카트에 메뉴 추가하기) 

​	:heavy_check_mark: `POST` url/api/restaurants/payment-request (주문요청) 

​	:heavy_check_mark: `POST` url/api/restaurants/payment-approval (주문승인) 



**4. routes/smsAuth.js**

​	:heavy_check_mark: ​`POST` url/api/sms-auth/certification (인증코드 발급받기)

​	:heavy_check_mark: ​`POST` url/api/sms-auth/verification (인증코드 검증하기)



**5. routes/info.js**

​	:heavy_check_mark: `GET` url/api/info/ad (광고 리스트)

​	:heavy_check_mark: `GET` url/api/info/ad/:adId (광고 페이지 html)



------

**AWS** `http://13.124.8.90:3000`

**주의**

`api/users` 와 `api/auth` 를 제외한 경우 모든 api 요청은 headers에 jwt token이 존재해야한다.

```json
// headers
{
    x-access-token: jwt
}
```



# 1. routes/auth.js

##### `POST` url/api/auth/signup (회원가입)

```json
// Body
{
    "data": {
                   "email": email,
                   "password": password,   // 특수문자, 숫자, 문자를 모두 포함한 8~15자리
                   "phone_num": 010-1234-5678,
                   "username": username // 없을 경우 이메일 @ 앞부분으로 대체
               }
 }   

// res
{
    "status": true,
    "message": "회원가입이 완료됐습니다.",
    "token": token
}
```



##### `POST` url/api/auth/login (로그인)

```json
// Body
{
       "data": {
                      "email": "admin@admin.com",
                      "password": "password!1"
              }
    }   

// res
{
    "status": true,
    "token": token
}
```



# 2. routes/userInfo.js

##### `GET` url/api/user-info/user (특정 유저 정보)

```
// res
{
    "status": true,
    "user": {
        "username": "admin",
        "email": "admin@admin.com",
        "address": "서울 종로구 명륜2가",
        "phone_num": "01012345678"
    },
    "numsOfCart": 1,
    "cart": [
        {
            "id": 1,
            "name": "국물 떡볶이",
            "count": "2",
            "restaurantId": 1,
            "label": "인기메뉴",
            "description": "사이즈 선택",
            "price": 4500
        }
    ]
}
```



##### `POST` url/api/user-info/address (위치 정보 저장 및 수정)

```js
// Body
{
    "data": {
                "lng": 127.1086228, // 경도
                "lat": 37.4012191,  // 위도
                    
                "address": "삼성동
    		}
}

// res
{
    "status": true,
    "address": "서울특별시 종로구 동숭동",
    "lng": 127.001867,
    "lat": 37.582302
}
```



##### `GET` url/api/user-info/history (유저 주문 기록 보기)

```js
// res
{
    "status": true,
    "historyList": [
        {
            "restaurantId": 1,
            "restaurantName": "인정국물떡볶이&눈꽃빙수",
            "orderedMenus": [
                {
                    "name": "국물 떡볶이",
                    "count": 2,
                    "price": 4500
                },
                {
                    "name": "세트1（국물떡볶이2인＋부산꼬지어묵3개＋인정김밥5줄＋쿨피스 500mL）",
                    "count": 3,
                    "price": 14500
                }
            ],
            "orderedPrice": 52500,
            "orderedDate": "2019-10-30T12:52:46.000Z",
            "orderedAddress": "서울 종로구 명륜2가"
        }
    ]
}
```



# 3. routes/restaurants.js

##### `GET` url/api/categories (카테고리 정보)

```json
// res
{
    "status": true,
    "categories": [
        {
            "id": 1,
            "name": "전체보기",
            "imgUrl": "path"
        },
        .
        .
        .
        {
            "id": 13,
            "name": "편의점",
            "imgUrl": "path"
        },
		{
            "id": 14,
            "name": "요기요플러스"
            "imgUrl": "path"
        }
    ]
}
```



##### `GET` url/api/restaurants/categories/:categoryId (카테고리별 식당)

```json
categoryId = [
    "전체보기",      // 1
    "1인분주문",    // 2
    "프랜차이즈",    // 3
    "치킨",         // 4
    "피자양식",     // 5
    "중국집",       // 6
    "한식",         // 7
    "일식돈까스",   // 8
    "족발보쌈",     // 9
    "야식",        // 10
    "분식",        // 11
    "카페디저트",  // 12
    "편의점"      // 13
];

// res
{
    "status": true,
    "numsOfRestaurants": 570,
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
            "isPlus": false,  // 0: false, 1: true
            "paymentMethods": "creditcard::online",
            "createdAt": "2019-10-15T13:48:47.000Z",
            "updatedAt": "2019-10-15T13:48:47.000Z"
        }
    ]
}
```



`GET` url/api/restaurants/plus-categories/:categoryId (카테고리별 요기요 플러스 식당)

```json
// res
{
    "status": true,
    "numsOfRestaurants": 570,
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
            "isPlus": false,  // 0: false, 1: true
            "paymentMethods": "creditcard::online",
            "createdAt": "2019-10-15T13:48:47.000Z",
            "updatedAt": "2019-10-15T13:48:47.000Z"
        }
    ]
}
```



##### `GET` url/api/restaurants/:restaurantId (매장 정보 보기)

```json
//res
{
    "status": true,
    "restaurant": {
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
}
```



##### `GET` url/api/restaurants/:restaurantId/menus (매장별 메뉴 보기)

```json
//res 
{
    "status": true,
    "restaurant": {
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
        },
    "numsOfMenus": 55,
    "labels": [
        "인기메뉴",
        	.
        	.
        "음료 메뉴"
    ],
    "menus": [
           {
               "label": "인기메뉴",
               "dishes": [
                   {
                        "id": 1,
                        "name": "국물 떡볶이",
                        "restaurantId": 1,
                        "label": "인기메뉴",
                        "description": "사이즈 선택",
                        "price": 4500,
                        "createdAt": "2019-10-23T12:22:29.000Z",
                        "updatedAt": "2019-10-23T12:22:29.000Z"
                    }
               ]
           },
        	{
               "label": "음료메뉴",
               "dishes": [
                   {
                        "id": 2,
                        "name": "국물 떡볶이",
                        "restaurantId": 1,
                        "label": "인기메뉴",
                        "description": "사이즈 선택",
                        "price": 4500,
                        "createdAt": "2019-10-23T12:22:29.000Z",
                        "updatedAt": "2019-10-23T12:22:29.000Z"
                    }
               ] 
            }
        ]
}
```



##### `POST` url/api/restaurants/:restaurantId/cart (카트에 메뉴 추가하기) 

```json
// req
{
	"data": {
		"menus": "1::2"  // id::count::id::count:id::count ... (메뉴 아이디::해당메뉴갯수)
	}
}

// res
{
    "status": true,
    "menus": [
        {
            "name": "국물 떡볶이",
            "price": 4500
        },
        {
            "name": "후룩 떡복이",
            "price": 5500
        }
    ],
    "totalPrice": 10000
}
```



##### `POST` url/api/restaurants/payment-request(주문요청) 

```js
// res
{
    "status": true,
    "tid": "T2688296636022244891",
    "next_redirect_app_url": "https://mockup-pg-web.kakao.com/v1/690370ca8e18a4fc5b28c59d2b72e46aafb39f1d47392f73c1ed6b70ba2edf5d/aInfo",
    "next_redirect_pc_url": "https://mockup-pg-web.kakao.com/v1/690370ca8e18a4fc5b28c59d2b72e46aafb39f1d47392f73c1ed6b70ba2edf5d/info",
    "created_at": "2019-11-01T10:03:56"
}
```



##### `POST` url/api/restaurants/payment-approval (주문승인) 

```js
// res
{
    "status": true,
    "message": "결제가 완료됐습니다.",
    "history": {
        "id": 14,
        "orderedMenus": "1::1::2::2::3::3",
        "orderedDate": "2019-11-01T01:05:27.902Z",
        "orderedAddress": "서울 강남구 역삼동",
        "updatedAt": "2019-11-01T01:05:27.904Z",
        "createdAt": "2019-11-01T01:05:27.904Z"
    }
}
```



# 4. routes/smsAuth.js

##### `POST` url/api/sms-auth/certification (인증코드 발급받기)

```json
//body
{
    "data": {
        "phone_num": "01012345678"  // - 없이 11자리
    }
}

//res
{ "status": true }

// 문자로 4자리의 숫자 코드가 발송된다.
```



##### `POST` url/api/sms-auth/verification (인증코드 검증하기)

```json
//body
{
    "data": {
        "code": "1234"
        "phone_num": "01012345678"  // - 없이 11자리
    }
}

//res
{ "status": true }
```



# 5. routes/info.js

##### `GET` url/api/info/ad (광고 정보)

```json
// res
{
	"status": true,
    "ads": [
        {
            "id": 1,
            "name": "ad1",
            "imgUrl": "/images/ad1.jpg",
            "type": "mainAd",
            "startDate": "2019-10-22T01:30:19.000Z",
            "endDate": "2019-10-22T01:30:18.000Z",
            "createdAt": "2019-10-22T01:30:18.000Z",
            "updatedAt": "2019-10-22T01:30:18.000Z"
        }
    ]
}
```



##### `GET` url/api/info/ad/:adId (광고 페이지 html)

```html
<!DOCTYPE html>
<html>

<head>
	<title>임시 광고 페이지입니다.</title>
	<link rel="stylesheet" href="/stylesheets/style.css">
</head>

<body>
	<h1>임시 광고 페이지입니다.</h1>
</body>

</html>
```

