import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import logo from '../images/logo-yogiyo.png';
import './LoginView.scss';
import withLoading from '../hoc/WithLoading';

class LoginView extends Component {
  render() {
    const {
      handleLogin,
      handleChange,
      success,
      username,
      password,
    } = this.props;
    if (success) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="Login">
          <div className="Login__login__wrap">
            <form name="Login__login__form">
              <div className="Login__login__content">
                <div className="Login__title-logo">
                  <img src={logo} alt="요기요" />
                </div>
                <ul className="Login__list">
                  <li className="Login__list__item">
                    <input
                      type="text"
                      value={username}
                      name="username"
                      className="Login__list__item-email"
                      placeholder="이메일 주소 입력(필수)"
                      onChange={e =>
                        handleChange(e.target.name, e.target.value)
                      }
                      required
                    />
                  </li>
                  <li className="Login__list__item">
                    <input
                      type="password"
                      value={password}
                      name="password"
                      className="Login__list__item-password"
                      placeholder="비밀번호 입력(필수)"
                      onChange={e =>
                        handleChange(e.target.name, e.target.value)
                      }
                      required
                    />
                  </li>
                </ul>
                <div className="Login__checkbox">
                  <input
                    type="checkbox"
                    name="Login__checkbox__keep-login"
                    id="Login__checkbox__keep-login"
                  />

                  <label htmlFor="Login__checkbox__keep-login">
                    자동 로그인
                  </label>
                  <span className="Login__checkbox__find">
                    <Link className="Login__checkbox__find__id" to="#">
                      아이디 찾기
                    </Link>
                    <Link className="Login__checkbox__find__password" to="#">
                      비밀번호 찾기
                    </Link>
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="Login__button__login-btn"
                onClick={e => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                로그인
              </button>
              <button type="button" className="Login__button__naver-btn">
                <span />
                네이버 아이디로 로그인
              </button>
            </form>
          </div>
          <div className="Login__register__txt">
            요기요가 처음이신가요? &nbsp;
            <Link to="/register">
              <span>이메일 회원 가입</span>
            </Link>
          </div>
        </div>
      );
    }
  }
}

export default withLoading(LoginView);
