import React, { Component } from 'react';
import Hero from '../containers/Hero';
import { Link } from 'react-router-dom';
import logo from '../images/logo-yogiyo.png';
import './Layout.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { publicDecrypt } from 'crypto';
import Login from '../containers/Login';
import { withUser } from '../contexts/UserContext';
import { withRouter } from 'react-router-dom';

class Layout extends Component {
  render() {
    const { isLogin, logout, history } = this.props;

    return (
      <React.Fragment>
        <div className="Layout__header">
          <h1 className="Layout__header__logo">
            <Link to="/">
              <img src={logo} alt="요기요" />
            </Link>
          </h1>
          <div className="Layout__header__button">
            {isLogin ? (
              <button
                onClick={() => {
                  logout();
                  history.push('/');
                }}
                className="Layout__header__logout-btn"
              >
                로그아웃
              </button>
            ) : (
              <>
                <Link to="/login">
                  <button className="Layout__header__login-btn">로그인</button>
                </Link>
                <Link to="/register">
                  <button className="Layout__header__register-btn">
                    회원가입
                  </button>
                </Link>
                <Link to="/cart">
                  <span className="Layout__header__cart">
                    <FontAwesomeIcon icon={faShoppingCart} color={'white'} />
                    {/* 노란색 동그라미 숫자 */}
                    {/* <span className="Layout__header__cart__count">
                      {this.state.cartLength}
                    </span> */}
                  </span>
                </Link>
              </>
            )}
            {/* 스프라이트 기법을 이용한 이미지 배치 */}
            {/* TODO : 인풋박스로 대신함. 추후에 기능 추가 필요  */}
            {/* <div className="Layout__header__location">
              위치 알 수 없음 <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div> */}
          </div>
        </div>
        <Hero />
        {this.props.children}
        <div className="Layout__footer">
          <ul className="Layout__footer__menu">
            <li>
              <Link to="#">이용약관</Link>
            </li>
            <li>
              <Link to="#">개인정보처리방침</Link>
            </li>
            <li>
              <Link to="#">통합포인트정책</Link>
            </li>
            <li>
              <Link to="#">입점문의</Link>
            </li>
            <li>
              <Link to="#">공지사항</Link>
            </li>
          </ul>
          <div className="Layout__footer__company">
            <div className="Layout__footer__company__name">
              (유)딜리버리히어로 코리아
            </div>
            <div className="Layout__footer__company__info">
              서울시 강남구 테헤란로 5길 7 KG타워 10, 11, 12층 유한회사
              알지피코리아|대표자 : 강신봉|사업자등록번호:211-88-68802
              사업자정보확인통신판매업신고:제
              2011-서울강남-03322호|개인정보담당자 :
              privacy@yogiyo.co.kr|제휴문의 :
              partnership@rgpkorea.co.kr|고객만족센터 : 02-3447-3612 (24시간,
              연중무휴) support@yogiyo.co.kr|호스트서비스사업자 :
              (주)심플렉스인터넷
            </div>
            <div className="Layout__footer__copyright">
              유한회사 알지피코리아는 통신판매중개자이며 통신판매의 당사자가
              아닙니다. 따라서 상품/ 거래정보 및 거래와 관련하여 요기요에 등록된
              판매자의 고의 또는 과실로 소비자에게 발생하는 손해에 대해 유한회사
              알지피코리아는 책임을 지지 않습니다. 상품 및 거래에 관하여 보다
              정확한 정보는 해당 판매자에게 직접 확인하여 주시기 바랍니다.
              Copyright YOGIYO. All Rights Reserved.
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withUser(Layout));
