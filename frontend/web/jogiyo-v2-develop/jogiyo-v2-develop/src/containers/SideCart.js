import React, { Component } from 'react';
import SideCartView from '../components/SideCartView';

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderList: JSON.parse(sessionStorage.cart),
    };

    this.handleAddMenu.bind(this);
    this.handleToPay.bind(this);
    // this.handleDelete.bind(this);
    // this.handleDeleteAll.bind(this);
    this.checkFoodIndex = this.checkFoodIndex.bind(this);
  }

  // 주문하기를 위한 핸들러가 필요 -> 주문하기를 누르면 주소가 포함된 주문 상세 페이지로 이동
  // handleOrderClick = async (...) => {세션에 set하기}

  // 메뉴추가하기 -> 원래 보고있던 상점 페이지로 이동...
  // link를 사용해서 /store/id 이런 식으로 보낼 수 있을 것 같다.
  // 메뉴 추가하기 해도 서버에 업데이트 된 장바구니 저장해야 한다.
  handleToPay() {
    let newOrderList = this.state.orderList;
    this.setState({ orderList: newOrderList });
    sessionStorage.setItem('cart', JSON.stringify(this.state.orderList));
  }
  // payView로 갈 때에도 세션에 카트 정보를 저장하고 넘어간다.
  handleAddMenu() {
    let newOrderList = this.state.orderList;
    this.setState({ orderList: newOrderList });
    sessionStorage.setItem('cart', JSON.stringify(this.state.orderList));
  }

  // 카트에서 삭제
  async handleDelete(selectedId) {
    let newOrderList = this.state.orderList;

    let currentIndex = newOrderList.findIndex(i => {
      return i.id === selectedId;
    });

    newOrderList.splice(currentIndex, 1);

    this.setState({ orderList: newOrderList });

    sessionStorage.setItem('cart', JSON.stringify(newOrderList));
  }

  // 선택된 음식 식별을 위한...
  checkFoodIndex(id) {
    let list = this.state.orderList;
    return list.some(i => {
      return i.id === id;
    });
  }

  // 모두 삭제도 필요 -> 이것도 역시 view에서의 상태조작일 것이기 때문에
  handleDeleteAll() {
    let newOrderList = this.state.orderList;
    newOrderList.splice(0, newOrderList.length);
    this.setState({ orderList: newOrderList });
    sessionStorage.setItem('cart', JSON.stringify(newOrderList));
  }

  render() {
    console.log(this.state.orderList);
    return (
      <SideCartView
        updateCart={this.props.updateCart}
        orderList={this.state.orderList}
        handleAddMenu={this.handleAddMenu}
        handleToPay={this.handleToPay}
        handleDelete={this.handleDelete.bind(this)}
        handleDeleteAll={this.handleDeleteAll.bind(this)}
        key={this.state.orderList.length}
      />
    );
  }
}
