import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './RegisterView.scss';

export default class RegisterFormView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      passwordMessage: '',
      phoneNumber: '',
      nickName: '',
      success: false,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleFieldChange(e, name) {
    // name 변수에 저장되어 있는 문자열을 그대로 속성 이름으로 사용하기
    this.setState({ [name]: e.target.value });
  }

  render() {
    const {
      username,
      password,
      passwordConfirm,
      phoneNumber,
      nickName,
      success,
    } = this.state;

    // username(이메일), 비밀번호, 휴대폰 번호 정규표현식으로 입력 형식 체크
    const regEmail = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/gim;
    const regPassword = /^(?=.*\d)(?=.*[\w])(?=.*[\W]).{8,}$/gm;
    const regPhoneNum = /^\d{2,3}\d{3,4}\d{4}$/;
    if (success) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div className="Register">
          <form
            className="Register__form"
            onSubmit={e => this.props.handleSubmit(e)}
          >
            <div className="Register__form__form">
              <div className="Register__form__form__sns-login">
                <span className="Register__form__form__sns-login__title">
                  SNS계정으로도 간편하게 가입하실 수 있습니다.
                </span>
                <button
                  type="button"
                  className="Register__form__form__sns-login__naver"
                >
                  <span />
                  네이버 아이디로 로그인
                </button>
              </div>
              <div className="Register__form__form__member-input">
                <span>회원정보 입력</span>
                <ul className="Register__form__form__member-input__list-group">
                  <li>
                    <input
                      type="text"
                      value={username}
                      id="username"
                      placeholder="(필수)이메일 주소 입력"
                      name="username"
                      required
                      onChange={e => this.handleFieldChange(e, 'username')}
                    />
                    {username === '' ? (
                      <span className="err-msg">
                        이메일 주소를 입력해주세요.
                      </span>
                    ) : !regEmail.test(username) ? (
                      <span className="err-msg">
                        유효한 이메일 주소 형식이 아닙니다.
                      </span>
                    ) : null}
                  </li>
                  <li>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      placeholder="(필수)비밀번호 입력"
                      name="password"
                      required
                      onChange={e => this.handleFieldChange(e, 'password')}
                    />
                    {password === '' ? (
                      <span className="err-msg">비밀번호를 입력해주세요.</span>
                    ) : !regPassword.test(password) ? (
                      <span className="err-msg">
                        비밀번호는 숫자,영문,특수문자를 포함하여야 합니다.
                      </span>
                    ) : password.length < 8 ? (
                      <span className="err-msg">
                        비밀번호는 8자 이상입니다.
                      </span>
                    ) : null}
                  </li>
                  <li>
                    <input
                      type="password"
                      placeholder="(필수)비밀번호 재확인"
                      name=" passwordConfirm"
                      required
                      onChange={e =>
                        this.handleFieldChange(e, 'passwordConfirm')
                      }
                    />
                    {passwordConfirm !== password ? (
                      <span className="err-msg">
                        비밀번호 재 입력해 주시기 바랍니다.
                      </span>
                    ) : !regPassword.test(passwordConfirm) ? (
                      <span className="err-msg">
                        비밀번호는 숫자,영문,특수문자를 포함하여야 합니다.
                      </span>
                    ) : passwordConfirm.length < 8 ? (
                      <span className="err-msg">
                        비밀번호는 8자 이상입니다.
                      </span>
                    ) : null}
                  </li>
                  <li>
                    <input
                      id="nickName"
                      type="text"
                      defaultValue={nickName}
                      placeholder="(선택)닉네임 입력"
                      name="nickName"
                    />
                  </li>
                </ul>
              </div>
              <div className="Register__form__form__verification">
                <span>휴대폰 인증</span>
                <ul className="Register__form__form__verification__list-group">
                  <li className="Register__form__form__verification__list-group-item">
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={phoneNumber}
                      placeholder="(필수)휴대폰 전화번호 입력(-제외)"
                      name="phoneNumber"
                      onChange={e => this.handleFieldChange(e, 'phoneNumber')}
                    />
                    <span className="err-msg">휴대폰번호를 입력해주세요.</span>
                    {!regPhoneNum.test(phoneNumber) ? (
                      <span className="err-msg">
                        휴대폰번호는 숫자만 입력해주세요.
                      </span>
                    ) : null}
                    <button>인증</button>
                  </li>
                  <li className="Register__form__form__verification__list-group-item">
                    <input
                      type="text"
                      placeholder="인증번호 입력"
                      name="smsVerification"
                    />
                    <button>확인</button>
                  </li>
                </ul>
                <p className="Register__form__form__verification__text">
                  인증번호가 도착하지 않았을 경우 '인증'버튼을 다시 눌러주세요.
                </p>
              </div>
              <div className="Register__form__form__terms">
                <span className="Register__form__form__terms__title">
                  약관동의
                </span>
                <ul className="Register__form__form__terms__list-group">
                  <li className="Register__form__form__terms__list-group__item">
                    <div className="checkbox">
                      <input type="checkbox" id="all" name="all" />
                      <label htmlFor="all">전체동의</label>
                    </div>
                  </li>
                  <li className="Register__form__form__terms__list-group__item">
                    <div className="checkbox">
                      <input type="checkbox" id="policy" name="policy" />
                      <label htmlFor="policy">이용약관동의(필수)</label>
                      <Link to="#">내용 보기 > </Link>
                      <span className="err-msg">
                        요기요 약관에 동의해주세요.
                      </span>
                    </div>
                  </li>
                  <li className="Register__form__form__terms__list-group__item">
                    <div className="checkbox">
                      <input type="checkbox" id="collect" name="collect" />
                      <label htmlFor="collect">
                        개인정보 수집 및 이용동의(필수)
                      </label>
                      <Link to="#">내용 보기 ></Link>
                      <span className="err-msg">
                        개인정보 수집에 동의해주세요.
                      </span>
                    </div>
                  </li>
                  <li className="Register__form__form__terms__list-group__item">
                    <div className="checkbox">
                      <input type="checkbox" id="push" name="push" />
                      <label htmlFor="push">요기요 혜택알림 동의(선택)</label>
                    </div>
                  </li>
                </ul>
                <div className="Register__form__form__terms__info">
                  <div className="Register__form__form__terms__info__text">
                    <span>
                      만 14세미만의 어린이의 경우 회원가입이 불가능합니다.
                    </span>
                    <Link to="#">내용 보기 ></Link>
                  </div>
                </div>
              </div>
              <button type="submit" className="Register__form__form__btn-join">
                회원가입 완료
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}
