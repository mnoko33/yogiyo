import React, { Component } from 'react';
import './StoreDetailView.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import Menu from '../containers/Menu';

import UserReview from '../containers/UserReview';
import StoreInfo from '../containers/StoreInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import withLoading from '../hoc/WithLoading';
import SideCartView from './SideCartView';
import SideCart from '../containers/SideCart';

class StoreDetailView extends Component {
  static defaultProps = {
    id: null,
    name: '',
    minOrderAmount: 0,
    reviewAvg: 0,
    logoUrl: '',
    reviewCount: 0,
    begin: '',
    end: '',
    companyName: '',
    companyNumber: '',
    countryOrigin: '',
    introductionText: '',
    estimatedDeliveryTime: '',
    exceptCash: null,
    paymentMethods: [],
    deliveryFee: 0,
    ratingDeliveryAvg: 0,
    ratingQuantityAvg: 0,
    ratingTasteAvg: 0,
    cart: [],
    cartLength: 0,
    reviewLength: 0,
  };

  constructor(props) {
    super(props);

    // 현재 선택된 페이지
    // page === 'menu' -> 메뉴 정보 페이지
    // page === 'user-review' -> 사용자 리뷰 페이지
    // page === 'store-info' -> 음식점 정보 페이지
    this.state = { selected: 'menu', infoShow: false };
    this.handleInfoClick = this.handleInfoClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleUserReviewPage = this.handleUserReviewPage.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    if (this.props.cart !== prevProps.cart) {
      this.setState({
        cart: this.props.cart,
      });
    }
  }

  handleMenuPage() {
    this.setState({
      selected: 'menu',
    });
  }
  handleUserReviewPage() {
    this.setState({
      selected: 'user-review',
    });
  }
  handleStoreInfoPage() {
    this.setState({
      selected: 'store-info',
    });
  }
  // 물음표 클릭 시 배달시간에 대한 안내 문구 출력
  handleInfoClick() {
    if (!this.state.infoShow) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
    this.setState(prevState => ({
      infoShow: !prevState.infoShow,
    }));
  }

  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleInfoClick();
  }

  render() {
    // TODO : this.state.selected가 menu,user-review,store-info일때 해당 버튼에 active 클래스 추가하고싶다.
    const { reviewStar, cart, pullCartItem } = this.props;
    const { infoShow } = this.state;
    const {
      name,
      minOrderAmount,
      reviewAvg,
      reviewCount,
      logoUrl,
      id,
      begin,
      end,
      companyName,
      companyNumber,
      countryOrigin,
      introductionText,
      estimatedDeliveryTime,
      exceptCash,
      paymentMethods,
      deliveryFee,
      additionalDiscountPerMenu,
      ownerReplyCount,
      ratingDeliveryAvg,
      ratingQuantityAvg,
      ratingTasteAvg,

      reviewLength,
    } = this.props;

    return (
      <div className="StoreDetailView">
        <div className="StoreDetailContainer">
          <div className="StoreDetail">
            <h1 className="StoreDetail__name">{name}</h1>
            <div className="StoreDetail__info clearfix">
              {/* 로고 이미지 설정 참고 */}
              {/* 이미지를 왼쪽에 위치시키고 나머지는 디스플레이 : 블록 으로? */}
              <div className="StoreDetail__info__logo">
                <img src={logoUrl} alt={name} />
              </div>
              <div className="StoreDetail__info__text">
                <p className="StoreDetail__info__text__star">
                  <span>{reviewStar(reviewAvg)}</span>
                  <span>{parseFloat(reviewAvg).toFixed(1)}</span>
                </p>
                <p>
                  최소주문금액 <span>{minOrderAmount.toLocaleString()}원</span>
                </p>
                <p>
                  결제 <span>{exceptCash ? '현금' : null}, </span>
                  <span>
                    {paymentMethods.map(m => (
                      <span
                        className="StoreDetail__info__text__yogi"
                        key={m.id}
                      >
                        {m.name === 'creditcard'
                          ? '신용카드'
                          : 'online'
                          ? '요기서결제'
                          : null}
                      </span>
                    ))}
                  </span>
                </p>
                <div>
                  배달시간 <span>{estimatedDeliveryTime}</span>
                  <div className="StoreDetail__info__text__btn">
                    <button
                      ref={node => {
                        this.node = node;
                      }}
                      onClick={() => this.handleInfoClick()}
                    >
                      <FontAwesomeIcon icon={faQuestionCircle} />
                    </button>
                    {infoShow ? (
                      <p className="StoreDetail__info__text__btn__text">
                        최근 주문의 배달시간을 분석한 정보 입니다. 실제
                        배달시간과는 차이가 있을 수 있습니다.
                      </p>
                    ) : null}
                  </div>
                </div>
                {additionalDiscountPerMenu ? (
                  <p>
                    <span className="StoreDetail__info__text__delivery_discount">
                      배달할인 {additionalDiscountPerMenu}원
                    </span>
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {/* 3개 메뉴 셀렉트 */}
          {/* 원산지 정보는 어디다 넣어야 할까...? */}
          <div className="StoreDetail__menu">
            <div className="StoreDetail__menu__select">
              <button
                onClick={() => this.handleMenuPage()}
                className={this.state.selected === 'menu' ? 'active' : null}
              >
                메뉴
              </button>
              <button
                onClick={() => this.handleUserReviewPage()}
                className={
                  this.state.selected === 'user-review' ? 'active' : null
                }
              >
                클린리뷰 {reviewLength}
              </button>
              <button
                onClick={() => this.handleStoreInfoPage()}
                className={
                  this.state.selected === 'store-info' ? 'active' : null
                }
              >
                정보
              </button>
            </div>
            {/* 컨텐츠 내용 양의 따라 늘어나야 한다 */}
            <div className="StoreDetail__menu__box">
              <div>
                {this.state.selected === 'menu' ? (
                  <Menu
                    key={this.props.cart}
                    storeId={id}
                    updateCart={this.props.updateCart}
                    pullCartItem={pullCartItem}
                  />
                ) : this.state.selected === 'user-review' ? (
                  <UserReview
                    handleUserReviewPage={this.handleUserReviewPage.bind(this)}
                    updateReviewLength={this.props.updateReviewLength}
                    storeId={id}
                    ownerReplyCount={ownerReplyCount}
                    reviewStar={reviewStar}
                    reviewAvg={reviewAvg}
                    deliveryAvg={ratingDeliveryAvg}
                    quantityAvg={ratingQuantityAvg}
                    tasteAvg={ratingTasteAvg}
                  />
                ) : this.state.selected === 'store-info' ? (
                  <StoreInfo
                    storeId={id}
                    begin={begin}
                    end={end}
                    companyName={companyName}
                    companyNumber={companyNumber}
                    countryOrigin={countryOrigin}
                    introductionText={introductionText}
                    estimatedDeliveryTime={estimatedDeliveryTime}
                    deliveryFee={deliveryFee}
                    paymentMethods={paymentMethods}
                    exceptCash={exceptCash}
                    minOrderAmount={minOrderAmount}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div className="StoreDetail__btn">
            {this.props.cartLength > 0 ? (
              <Link to="/cart">
                <button className="StoreDetail__btn__cart">
                  주문표({this.props.cartLength})
                </button>
              </Link>
            ) : (
              <button className="StoreDetail__btn__cart" disabled>
                주문표({this.props.cartLength})
              </button>
            )}
            <Link to="/pay">
              <button className="StoreDetail__btn__order">바로 주문하기</button>
            </Link>
          </div>
        </div>
        <SideCart
          key={this.props.cart}
          cart={this.props.cart}
          updateCart={this.props.updateCart}
        />
      </div>
    );
  }
}

export default withLoading(StoreDetailView);
