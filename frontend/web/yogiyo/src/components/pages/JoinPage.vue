<template>
  <v-container>
    <v-layout>
      <p class="info-text">회원정보 입력</p>
    </v-layout>
    <v-layout mt-2>
      <input
              type="text"
              class="Login"
              v-model="email"
              autocomplete="off"
              placeholder="(필수)이메일 주소 입력"
              required
      />
    </v-layout>
    <v-layout>
      <input
              type="password"
              class="Login"
              v-model="password"
              autocomplete="new-password"
              placeholder="(필수)비밀번호 입력"
              required
      />
    </v-layout>
    <v-layout>
      <input
              type="password"
              name="password"
              class="Login"
              v-model="passwordCheck"
              autocomplete="off"
              placeholder="(필수)비밀번호 재확인"
              required
      />
    </v-layout>
    <v-layout>
      <input
              type="text"
              name="nickname"
              class="Login"
              autocomplete="off"
              v-model="username"
              placeholder="(선택)닉네임 입력"
              required
      />
    </v-layout>
    <v-layout>
      <p class="info-text">휴대폰 인증</p>
    </v-layout>
    <v-layout mt-2>
      <div class="in-line">
        <input class="inputt" type="text" name="phonenumber" v-model="phone_num" placeholder="(필수)휴대폰 전화번호 입력(-제외)" required>
        <input class="inputt" type="button" name="name" @click="certification" value="인증">
      </div>
    </v-layout>
    <v-layout>
      <p class="info-text">약관동의</p>
    </v-layout>
    <v-layout>

    </v-layout>
    <v-layout>
      <button v-if="email&&password&&passwordCheck&&phone_num" @click="join" class="login-btn">회원가입완료</button>
      <button v-else disabled @click="join" class="login-btn-disable">회원가입완료</button>
    </v-layout>
  </v-container>
</template>

<script>
  import Swal from 'sweetalert2'
  import api from '@/api'
  export default {
    name: "join",
    data: () => ({
      email: '',
      password:'',
      passwordCheck:'',
      username: '',
      phone_num:'',
      code:'',
      joinCheck: false,
      message: '',
    }),
    watch: {
      email() {
        this.check()
      },
      password() {
        this.check()
      },
      phone_num() {
        this.check()
      }
    },
    methods: {
      check() {
        const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        const passwordRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;  // 특수문자 / 문자 / 숫자 포함 형태의 8~15자리
        if (!emailRegex.test(this.email)) {
          this.joinCheck = false;
          this.message = '올바른 이메일을 입력해주세요.'
        } if (!passwordRegex.test(this.password)) {
          this.joinCheck = false;
          this.message = '비밀번호 형식은 특수문자 / 문자 / 숫자를 포함 형태의 8~15자리입니다.'
        } if (!emailRegex.test(this.email) && !passwordRegex.test(this.password)) {
          this.joinCheck = false;
          this.message = '올바른 이메일 형식과 비밀번호 형식을 지켜주세요. 비밀번호 형식은 특수문자 / 문자 / 숫자를 포함 형태의 8~15자리입니다.'
        } if (this.password !== this.passwordCheck) {
          this.joinCheck = false;
          this.message = '비밀번호가 일치하지않습니다.'
        }
      },
      async join() {
        this.check();
        if (!this.joinCheck) {
          Swal.fire({
            text: this.message
          })
        } else {
          const data = {
            "email": this.email,
            "password": this.password,   // 특수문자, 숫자, 문자를 모두 포함한 8~15자리
            "phone_num": this.phone_num,
            "username": this.username // 없을 경우 이메일 @ 앞부분으로 대체
          }
          // Todo 회원가입 하자마자 로그인 (완료!)
          await api.join(data).then(async res => {
            console.log(res);
            if (res.data.status) {
              this.$session.start();
              this.$session.set('token', res.data.token);
              this.getUser()
              return this.$router.push({name:'MainPage'});
            } else {
              Swal.fire({
                text: res.data.message
              })
            }
          }).catch(e => {
            console.log(e);
          })
        }
      },
      getUser() {
        let token = this.$session.get("token");
        // parseJwt
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        this.user = jsonPayload;
        localStorage.setItem('currentUser', this.user);
        this.$store.state.currentUser = localStorage.getItem('currentUser');
        return JSON.parse(jsonPayload);
      },
      async certification() {
        const data = {
          "phone_num": this.phone_num,
        };
        await api.certificationPhoneNum(data).then(res => {
          if(res.data.status) {
            this.verification()
          }
          else {
            Swal.fire({
              title: res.data.message
            })
          }
        })
      },
      async verification() {
        let timerInterval;
        Swal.fire({
          title: '인증번호를 입력해주세요',
          html: '<b>5분 00초</b> 안에 인증을 완료해주세요',
          input: 'text',
          confirmButtonText: '인증하기',
          showCancelButton: true,
          timer: 1000*60*5 + 1000,
          preConfirm: async (code) => {
            let data = {
              "code": code,
              "phone_num": this.phone_num
            };
            return await api.verificationPhoneNum(data)
              .then(async res => {
                if (res.data.status) {
                  await Swal.fire({
                    text: res.data.message,
                  })
                  console.log(res)
                  clearInterval(timerInterval)
                }
                else {
                  await Swal.fire({
                    text: '인증번호를 다시 입력해주세요',
                  })
                }
                clearInterval(timerInterval)
              })
              .catch(error => {
                Swal.showValidationMessage(
                  `Request failed: ${error}`
                )
              })
          },
          onBeforeOpen: () => {
            timerInterval = setInterval(() => {
              let second = String(Math.floor((Swal.getTimerLeft()/1000) % 60));
              Swal.getContent().querySelector('b')
                .textContent = `${Math.floor((Swal.getTimerLeft()/1000/60) << 0)}분 ${(second).length < 2 ? '0'+second : second}초`
            },1000)
          },
          allowOutsideClick: () => !Swal.isLoading(),
          onClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.timer
          ) {
            Swal.fire({
              text: '인증시간이 만료되었습니다',
            })
          }
        })
      }
    },
  }
</script>

<style scoped>
  .info-text {
    margin: 1% auto 0 auto;
    min-width: 480px;
    width: 800px;
    font-size: 14px;
    font-weight: 800;
    padding-left: 3px;
  }
    .login-btn-disable {
    margin: 3% auto 0 auto;
    background-color: #b0b0b0;
    color: #ffffff;
    font-size: 15px;
    font-weight: bold;
    min-width: 480px;
    width: 800px;
    height: 40px;
    opacity: 0.8;
  }
  .in-line{
    background-color: #fff;
    margin: auto;
    min-width: 480px;
    width: 800px;
    border: 1px solid #d9d9d9;
    height: 44px;
    padding: 10px 15px;
    font-size: 14px;
    font-weight: 500;
    box-sizing: border-box;
    }
    .inputt{
      margin:0;
    }
    .inputt[type="text"]{
      width:94%;
      height:100%;
      border:none;
      font-size:1em;
      padding-left: 5px;
      font-style: oblique;
      display:inline;
      outline:none;
      box-sizing: border-box;
      color:black;

    }
    .inputt[type=button]{
      width:6%;
      height:100%;
      border:none;
      font-size:1em;
      outline:none;
      display:inline;
      margin-right: 0;
      box-sizing: border-box;
    }

</style>