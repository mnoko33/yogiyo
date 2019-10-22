import React, { Component } from 'react';
import './Modal.scss';

export default class Modal extends Component {
  static defaultProps = {
    show: null,
    storeId: 0,
    id: 0,
    image: '',
    name: '',
    price: 0,
    minAmount: 0,
    storeName: '',
    deliveryFee: 0,

    cart: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
      totalPrice: 0,
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(e) {
    if (e.keyCode === 27) {
      this.handleModalClose();
    }
  }

  handleQuantityChange(e) {
    this.setState({
      quantity: parseInt(e.target.value),
    });
  }
  handleQuantityReset() {
    this.setState({
      quantity: 1,
    });
  }

  handleModalClose() {
    this.props.handleClose();
    this.setState({
      quantity: 1,
    });
  }
  handleQuantityPlus() {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }));
  }
  handleQuantityMinus() {
    if (this.state.quantity > 1) {
      this.setState(prevState => ({
        quantity: prevState.quantity - 1,
      }));
    }
  }

  render() {
    const {
      show,
      id,
      image,
      name,
      price,
      minAmount,
      storeName,
      storeId,
      deliveryFee,
      history,
    } = this.props;

    const { quantity } = this.state;

    const showHideClassName = show
      ? 'modal display-block'
      : 'modal display-none';

    let totalPrice = price * quantity;
    // faPlus

    return (
      <div className={showHideClassName}>
        {/* <div className="show"> */}
        <div className="Modal__main">
          <div className="Modal__order">
            <h1 className="Modal__order__title">{name}</h1>
            <div
              className="Modal__order__img"
              style={{ backgroundImage: 'url(' + image + ')' }}
            >
              {name}
            </div>
            <div className="Modal__order__price">
              <span className="Modal__order__price__title">가격</span>
              <span className="Modal__order__price__num">
                {price.toLocaleString()}원
              </span>
            </div>

            <div className="Modal__order__quantity">
              <span className="Modal__order__quantity__title">수량</span>
              <div className="Modal__order__quantity__btn">
                <button
                  onClick={() => this.handleQuantityMinus()}
                  className="Modal__order__quantity__btn__minus"
                >
                  수량 감소
                </button>
                <strong className="Modal__order__quantity__btn__num">
                  {quantity}
                </strong>
                <button
                  onClick={() => this.handleQuantityPlus()}
                  className="Modal__order__quantity__btn__plus"
                >
                  수량 추가
                </button>
              </div>
            </div>
            <div className="Modal__order__total_price">
              <span className="Modal__order__total_price__title">
                총 주문금액
              </span>
              <span className="Modal__order__total_price__num">
                {totalPrice.toLocaleString()}원
              </span>
            </div>
            <div className="Modal__order__min">
              최소주문금액: {minAmount.toLocaleString()}원
            </div>
            <div className="Modal__order__btn">
              <button
                onClick={() => {
                  this.props.addToCart(
                    id,
                    name,
                    quantity,
                    storeName,
                    storeId,
                    totalPrice,
                    price,
                    minAmount,
                    deliveryFee
                  );

                  this.props.pullCartItem();
                  this.handleQuantityReset();
                  this.props.updateCart();
                }}
              >
                주문표에 추가
              </button>
              <button
                onClick={() => {
                  this.props.toPay(
                    id,
                    name,
                    quantity,
                    storeName,
                    storeId,
                    totalPrice,
                    price,
                    minAmount,
                    deliveryFee,
                    this.handleToCart
                  );
                  history.push('/cart');
                }}
              >
                주문하기
              </button>
            </div>
          </div>
          <button
            onClick={() => this.handleModalClose()}
            className="Modal__order__close"
          >
            창닫기
          </button>
        </div>
      </div>
    );
  }
}
