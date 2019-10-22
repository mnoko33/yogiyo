import React, { Component } from 'react';
import Modal from '../components/Modal';
import { withRouter } from 'react-router-dom';

let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

sessionStorage.setItem('cart', JSON.stringify(cart));
class ModalContainer extends Component {
  // menuview에서 받을 prop들
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
  };

  constructor(props) {
    super(props);

    this.state = {
      // 선생님은 여기서 세션스토라지에 담겨있는 것을 불러온 뒤, setState에서 cart값을 조정해서 넘겨주는 것 보다 배열을 하나 만들어서 사용한 뒤 최종적으로 넘겨주는 것이 더 낫다고 말하심
      cart: JSON.parse(sessionStorage.cart),
    };
    this.handleToPay = this.handleToPay.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.checkFoodId = this.checkFoodId.bind(this);

    this.checkRestaurantId = this.checkRestaurantId.bind(this);
  }
  // 주문하기 -> 바로 pay로 이동
  handleToPay(
    id,
    name,
    quantity,
    storeName,
    storeId,
    totalPrice,
    price,
    minAmount,
    deliveryFee
  ) {
    const selectedItem = {
      id,
      name,
      totalPrice,
      quantity,
      storeId,
      storeName,
      minAmount,
      price,
      deliveryFee,
      ordered: false,
    };
    let cartArray = this.state.cart;

    let foodId = id;

    if (
      JSON.parse(sessionStorage.getItem('cart')).length > 0 &&
      !this.checkRestaurantId(storeId)
    ) {
      cartArray = [];
      window.confirm(
        "'다른 음식점에서 이미 담은 메뉴가 있습니다.담긴 메뉴를 취소하고 새로운 음식점에서 메뉴를 담을까요 ?"
      );
    }

    if (this.checkFoodId(foodId)) {
      let foodIndex = cartArray.findIndex(i => {
        return i.id === foodId;
      });

      cartArray[foodIndex].quantity += quantity;

      cartArray[foodIndex].totalPrice = cartArray[foodIndex].quantity * price;
    } else {
      cartArray.push(selectedItem);
    }

    this.setState({ cart: cartArray });
    sessionStorage.setItem('cart', JSON.stringify(cartArray));
  }
  // 주문표에 추가하기
  handleAddToCart(
    id,
    name,
    quantity,
    storeName,
    storeId,
    totalPrice,
    price,
    minAmount,
    deliveryFee
  ) {
    const selectedItem = {
      id,
      name,
      totalPrice,
      quantity,
      storeId,
      storeName,
      minAmount,
      price,
      deliveryFee,
      ordered: false,
    };
    let cartArray = this.state.cart;

    let foodId = id;

    // 만약 음식점이 바뀌면 스토라지를 초기화 하고 음식을 담는다.
    if (
      JSON.parse(sessionStorage.getItem('cart')).length > 0 &&
      !this.checkRestaurantId(storeId)
    ) {
      cartArray = [];
      window.confirm(
        "'다른 음식점에서 이미 담은 메뉴가 있습니다.담긴 메뉴를 취소하고 새로운 음식점에서 메뉴를 담을까요 ?"
      );
    }

    // 음식 담기...
    if (this.checkFoodId(foodId)) {
      // cartItem 을 cartArray로 바꿔봄, 혹은 selectedItem으로 바꿔봄
      // 불필요한 코드가 매우 많았다... 당연히 지금 새로 생성한 배열의 id값을 찾아야 하는 것이기에 cartArray의 인덱스 값을 찾는다.
      let foodIndex = cartArray.findIndex(i => {
        return i.id === foodId;
      });

      // 이미 같은 상품 : foodId => 이미 들어있는 상품의 id값 과 지금 현재 이 함수에서 실행되고 있는 내부 배열에 들어있는 id의 값이 같으면
      // 그 인덱스.quantity를 찾아서 그 값만 더해주기 위한 코드
      // cartArray[foodIndex].quantity = cartArray[foodIndex].quantity + quantity
      cartArray[foodIndex].quantity += quantity;
      // 가격의 총합을 구해주는 코드
      cartArray[foodIndex].totalPrice = cartArray[foodIndex].quantity * price;
    } else {
      // 같은 아이템이 없다면, 배열에 방금 선택한 아이템을 추가시켜주는 코드
      // 나의 문제는 지금 선택된 새 상품만 배열에 추가하면 되는데, 그 뒤에 또 한 번 더 카트에 추가시키는 이상한 짓을 하고 있었다...
      cartArray.push(selectedItem);
    }
    // 배열의 최종 결과를 sessionStorage에 저장
    // 추가한다고 하여 페이지가 새로 그려지지 않기 때문에, 다른 음식점을 선택한 후 음식을 추가하면 계속 초기화를 시켜버리기 때문에 여기에서 setState에도 업데이트를 해주어야 한다.
    this.setState({ cart: cartArray });
    sessionStorage.setItem('cart', JSON.stringify(cartArray));
    this.props.handleClose();
  }
  // 장바구니에 이미 중복된 것들이 있는지를 확인하기 위해 설정된 함수
  checkFoodId(foodId) {
    let cart = this.state.cart;
    return cart.some(i => {
      return i.id === foodId;
    });
  }

  checkRestaurantId(storeId) {
    let cart = this.state.cart;
    return cart.some(i => {
      return i.storeId === storeId;
    });
  }

  render() {
    console.log(this.state.cart);
    return (
      <Modal
        updateCart={this.props.updateCart}
        pullCartItem={this.props.pullCartItem}
        toPay={this.handleToPay}
        addToCart={this.handleAddToCart}
        {...this.props}
      />
    );
  }
}

export default withRouter(ModalContainer);
