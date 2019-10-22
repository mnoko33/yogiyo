import React, { Component } from 'react';
import Collapse from './Collapse';
import './PayView.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { withRouter } from 'react-router-dom';
import withLoading from '../hoc/WithLoading';

class PayView extends Component {
  static defaultProps = {
    show: true, // 주문 내역 리스트
    list: [],
  };
  constructor(props) {
    super(props);
    const { list } = props;
    // const foodInPay = list.map(l => {
    //   const {
    //     quantity,
    //     id,
    //     name,
    //     storeName,
    //     storeId,
    //     ordered,
    //     price,
    //     deliveryFee,
    //   } = l;
    //   return {
    //     id,
    //     name,
    //     quantity,
    //     storeName,
    //     price,
    //     storeId,
    //     ordered,
    //     deliveryFee,
    //     totalPrice: quantity * price,
    //   };
    // });
    this.state = { show: true, infoShow: false, list };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleInfoClick() {
    this.setState(prevState => ({
      infoShow: !prevState.infoShow,
    }));
  }

  handleOrder() {
    alert('주문이 완료되었습니다.');
    this.props.history.replace('/');
  }

  render() {
    const { list } = this.props;
    const { infoShow } = this.state;
    // foodInPay
    const deliveryFee = list[0].deliveryFee ? list[0].deliveryFee : 0;

    let addrShow = JSON.parse(sessionStorage.getItem('addrShow'));
    console.log(addrShow);

    return (
      <form className="Pay">
        <fieldset>
          <legend>결제하기</legend>
          <h1 className="Pay__title">결제하기</h1>
          <Collapse name="배달정보" initialShow={true}>
            <div className="Pay__contents">
              <p className="Pay__info">주소</p>
              <div className="Pay__input-address">
                <label htmlFor="address1" className="readable-hidden">
                  시군구동
                </label>
                <input
                  type="text"
                  defaultValue={addrShow}
                  id="address1"
                  disabled
                />
                {/* input 상세주소 입력 창이 비어있을 때 클래스에 -required 추가 */}
                <div className="Pay__check">
                  <label htmlFor="address2" className="readable-hidden">
                    상세주소 입력창
                  </label>
                  <input
                    type="text"
                    placeholder="(필수)상세주소 입력"
                    id="address2"
                    required
                  />
                  <p className="Pay__check__text">
                    상세한 주소를 입력해주세요.
                  </p>
                </div>
              </div>
              <p className="Pay__info">휴대전화번호</p>
              <div className="Pay__input-phone">
                {/* input 휴대폰번호 입력 창이 비어있을 때 클래스에 -required 추가 */}
                <div className="Pay__check">
                  <label htmlFor="phone" className="readable-hidden">
                    휴대전화번호 입력 창
                  </label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="(필수)휴대전화 입력"
                    required
                  />
                  <p className="Pay__check__text">
                    전화번호를 입력해주세요. (050 등 안심번호 사용 불가)
                  </p>
                </div>
                <div className="Pay__safe_number">
                  <input type="checkbox" name="" id="safeNumber" />
                  <label htmlFor="safeNumber">안심번호 사용</label>
                  <div className="Pay__safe_number__info">
                    <button
                      className="Pay__safe_number__info__btn"
                      onClick={() => this.handleInfoClick()}
                    >
                      <FontAwesomeIcon icon={faQuestionCircle} />
                    </button>
                    {infoShow ? (
                      <p className="Pay__safe_number__info__text">
                        안심번호는 고객님의 개인정보 보호를 위해 연락처 정보가
                        유출되지 않도록 1회성 임시번호를 발급하는 서비스 입니다.
                        발급된 안심번호는 일정시간 이후 자동으로 해지됩니다.
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </Collapse>
          <Collapse name="주문시 요청사항" initialShow={true}>
            <div className="Pay__need">
              <textarea
                rows="3"
                placeholder="주문시 요청 사항이 있으시면 남겨주세요"
              />
              <p className="Pay__need__text_count">0 / 100</p>
            </div>
          </Collapse>
          <div className="Menu">
            <span className="Menu__title">결제수단 선택</span>
          </div>
          <div className="Pay__payment">
            <p className="Pay__info">
              현장 결제
              <span className="Pay__info__side">음식받고 직접 결제</span>
            </p>
            <div className="Pay__payment__radio">
              <input type="radio" name="f-payment" id="f-credit" />
              <label htmlFor="f-credit">
                <FontAwesomeIcon icon={faCreditCard} /> 신용카드
              </label>
              <input type="radio" name="f-payment" id="f-cash" />
              <label htmlFor="f-cash">
                <FontAwesomeIcon icon={faCoins} /> 현금
              </label>
            </div>
            {/* 요기서 결제 숨김처리 */}
            {/* <p className="Pay__info">
              요기서 결제
              <span className="Pay__info__side">웹에서 미리 결제</span>
            </p>
            <div className="Pay__payment__radio">
              <input type="radio" name="payment" id="credit" disabled />
              <label htmlFor="credit">
                <FontAwesomeIcon icon={faCreditCard} /> 신용카드
              </label>
              <input type="radio" name="payment" id="cash" disabled />
              <label htmlFor="cash">
                <FontAwesomeIcon icon={faCoins} /> 현금
              </label>
            </div> */}
          </div>
          <div className="Pay__list">
            <div className="Menu">
              <span className="Menu__title">주문내역</span>
            </div>
            <p className="Pay__list__store">{list[0].storeName}</p>
            <ul className="Pay__list__menu">
              {list.map((item, i) => (
                <li className="clearfix">
                  <div className="Pay__list__menu__orderName">
                    <span className="Pay__list__menu__orderName__title">
                      {item.name}
                    </span>
                    <span className="Pay__list__menu__orderName__amount">
                      {item.quantity}개
                    </span>
                  </div>
                  <span className="Pay__list__menu__price">
                    {item.totalPrice.toLocaleString()}원
                  </span>
                </li>
              ))}
              <li className="Pay__list__menu__all">
                <span className="Pay__list__menu__all__title">
                  총 결제 금액
                </span>
                <span className="Pay__list__menu__all__price">
                  {(
                    list.reduce((acc, item) => acc + item.totalPrice, 0) +
                    deliveryFee
                  ).toLocaleString()}
                  원
                </span>
              </li>
            </ul>
            {/* <ul className="Pay__list__terms__listGroup">
              <li className="Pay__list__terms__listGroup__item">
                <div className="checkbox">
                  <input type="checkbox" id="all" name="all" />
                  <label htmlFor="all">전체동의</label>
                </div>
              </li>
              <li className="Pay__list__terms__listGroup__item">
                <div className="checkbox">
                  <input type="checkbox" id="sms" name="sms" />
                  <label htmlFor="sms">
                    <span className="">SMS 수신 동의</span>
                    <Link to="#">(전문보기)</Link>
                  </label>
                </div>
              </li>
              <li className="Pay__list__terms__listGroup__item">
                <div className="checkbox">
                  <input type="checkbox" id="userterms" name="userterms" />
                  <label htmlFor="userterms">
                    요기요 이용약관에 동의합니다.
                    <Link to="#">(전문보기)</Link>
                  </label>

                  <input
                    type="checkbox"
                    id="personalInfo"
                    name="personalInfo"
                  />
                  <label htmlFor="personalInfo">
                    <span className="sj">
                      개인정보 수집 및 이용에 동의합니다.
                      <Link to="#">(전문보기)</Link>
                    </span>
                  </label>
                </div>
              </li>
              <li className="Pay__list__terms__listGroup__item">
                <div className="checkbox">
                  <input type="checkbox" id="push" name="push" />
                  <label htmlFor="push">
                    개인정보 제3자 제공에 동의합니다.
                    <Link to="#">(전문보기)</Link>
                  </label>
                </div>
              </li>
            </ul> */}
          </div>
          <button onClick={() => this.handleOrder()} className="Pay__order_btn">
            주문완료
          </button>
        </fieldset>
      </form>
    );
  }
}

export default withRouter(PayView);
