import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CartView.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import withLoading from '../hoc/WithLoading';

export default class CartView extends Component {
  static defaultProps = {
    orderList: [],
  };
  constructor(props) {
    super(props);

    // CC의 상태를 공유한다고 보면 된다.
    const { orderList } = props;
    const foodInCart = orderList.map(o => {
      const {
        quantity,
        id,
        name,
        storeName,
        storeId,
        ordered,
        price,
        deliveryFee,
        minAmount,
      } = o;

      return {
        id,
        name,
        quantity,
        storeName,
        price,
        storeId,
        ordered,
        deliveryFee,
        totalPrice: quantity * price,
        minAmount,
      };
    });

    this.state = {
      foodInCart,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    if (this.props.orderList !== prevProps.orderList) {
      this.setState({
        orderList: this.props.orderList,
      });
    }
  }

  handleToMenu() {
    sessionStorage.setItem('cart', JSON.stringify(this.state.foodInCart));
  }
  handleToPay() {
    sessionStorage.setItem('cart', JSON.stringify(this.state.foodInCart));
  }
  handleQuantityPlus(id, price) {
    const { foodInCart } = this.state;
    const newFoodInCart = foodInCart.map(f => {
      if (f.id === id) {
        f.quantity++;

        f.totalPrice = f.quantity * price;
      }
      return f;
    });
    this.setState({ foodInCart: newFoodInCart });
  }
  handleQuantityMinus(id, price) {
    const { foodInCart } = this.state;
    const newFoodInCart = foodInCart.map(f => {
      if (f.id === id && f.quantity > 1) {
        f.quantity--;

        f.totalPrice = f.quantity * price;
      }
      return f;
    });
    this.setState({ foodInCart: newFoodInCart });
  }

  renderItem(productInCart) {
    let {
      id,
      name,
      quantity,
      storeName,
      storeId,
      totalPrice,
      price,
      deliveryFee,
      minAmount,
    } = productInCart;

    return (
      <div key={id} className="Cart__orders__item">
        <h4 className="Cart__orders__item__name">{name}</h4>
        <div className="Cart__orders__item__box">
          {/* key로 준 id값을 온클릭 할 때의 매개변수 */}
          <button
            className="Cart__orders__item__delete"
            onClick={() => this.props.handleDelete(id)}
          >
            삭제
          </button>

          <span className="Cart__orders__item__price">
            {(price * quantity).toLocaleString()}원
          </span>
          <div className="Cart__orders__item__quantity">
            <button
              onClick={e =>
                this.handleQuantityMinus(parseInt(id), parseInt(price))
              }
            >
              감소
            </button>
            <span>{quantity}</span>
            <button
              onClick={e =>
                this.handleQuantityPlus(parseInt(id), parseInt(price))
              }
            >
              추가
            </button>
          </div>
        </div>
      </div>
    );
  }

  // handleDelete... foodkey가 맞으면, 그건 없애버리기..
  render() {
    const { foodInCart, loading } = this.state;
    let cartLength = foodInCart.length;

    // console.log(this.props.orderList);
    console.log(foodInCart);
    return (
      <div className="Cart">
        <div className="Cart__header">
          <h1 className="Cart__header__title">주문표</h1>
          {cartLength > 0 ? (
            <button
              onClick={() => this.props.handleDeleteAll()}
              className="Cart__header__all-delete"
            >
              <FontAwesomeIcon icon={faTrashAlt} color={'white'} />
            </button>
          ) : null}
          {/* <Link to='#'></Link> */}
          {/* 아이콘은 foodInCart의 length가 0이면 없고 0보다 크면 나타난다 */}
        </div>
        {/* -------------------------------- */}
        <div className="Cart__orders">
          {cartLength > 0 ? (
            <h3 className="Cart__orders__store">
              <FontAwesomeIcon icon={faStore} />

              {foodInCart[0].storeName}
            </h3>
          ) : null}
          {cartLength > 0 ? (
            <div key={foodInCart.id}>
              {foodInCart.map(f => this.renderItem(f))}
            </div>
          ) : (
            <div className="Cart__orders__empty">
              주문표에 담긴 메뉴가 없습니다.
            </div>
          )}
        </div>
        {/* foodInCart[0] -> 이렇게 표시한 이유는 그냥 첫번째 배열의 배달값만 가져오면 되기 때문  */}
        {cartLength > 0 ? (
          <div className="Cart__delivery_fee">
            배달료 : {foodInCart[0].deliveryFee.toLocaleString()}원
          </div>
        ) : null}
        {cartLength > 0 ? (
          <div className="Cart__min_price">
            최소주문가격 : {foodInCart[0].minAmount.toLocaleString()}원
          </div>
        ) : null}
        {cartLength > 0 ? (
          <div className="Cart__sum">
            합계 :
            {foodInCart
              .reduce((acc, item) => acc + item.totalPrice, 0)
              .toLocaleString()}
            원
          </div>
        ) : null}
        {/* 배열의 길이가 0이면 홈으로 버튼 */}
        {/* 누르면 매장으로 */}
        <div
          className="
        Cart__btn"
        >
          {cartLength > 0 ? (
            <Link to={`/store/${foodInCart[0].storeId}`}>
              <button
                onClick={() => {
                  this.handleToMenu();
                }}
              >
                메뉴 추가하기
              </button>
            </Link>
          ) : (
            <Link to="/">
              <button>홈으로 가기</button>
            </Link>
          )}

          {/* 주문 창으로 */}
          {/* 배열의 길이가 0이면 기능이 작동 안됨. */}
          {/* 세션에 마지막으로 수정된 사항을 저장하기  */}
          {cartLength > 0 &&
          foodInCart.reduce((acc, item) => acc + item.totalPrice, 0) >
            foodInCart[0].minAmount ? (
            <Link to="/pay">
              <button onClick={() => this.handleToPay()}>주문하기</button>
            </Link>
          ) : (
            <Link to="#none" id="Cart__btn-disabled">
              <button disabled>주문하기</button>
            </Link>
          )}
        </div>
      </div>
    );
  }
}
