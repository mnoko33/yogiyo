import React, { Component } from 'react';
import StoreDetailView from '../components/StoreDetailView';
import api from '../api';

export default class StoreDetail extends Component {
  static defaultProps = {
    // 표시해주어야 하는 상점의 id
    storeId: null,
  };
  constructor(props) {
    super(props);

    this.state = {
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
      additionalDiscountPerMenu: null,
      ratingDeliveryAvg: 0,
      ratingQuantityAvg: 0,
      ratingTasteAvg: 0,
      cart: JSON.parse(sessionStorage.cart),
      cartLength: JSON.parse(sessionStorage.cart).reduce(
        (acc, item) => acc + item.quantity,
        0
      ),
      reviewLength: 0,
    };
    this.updateReviewLength = this.updateReviewLength.bind(this);
    this.handleUpdateCart = this.handleUpdateCart.bind(this);
  }
  reviewStar(count) {
    const num = Math.floor(count);
    const empty = 5 - num;
    const star = '★'.repeat(num) + '☆'.repeat(empty);
    return star;
  }

  async componentDidMount() {
    const { storeId } = this.props;

    const { data: storeInfo } = await api.get(
      `/restaurants/api/${storeId}/info/`
    );

    const { data: review } = await api.get(
      `/restaurants/api/${storeId}/review/`
    );

    this.setState({
      ...storeInfo,
      reviewLength: review.length,
    });
  }

  async updateReviewLength() {
    const { storeId } = this.props;
    const { data: review } = await api.get(
      `/restaurants/api/${storeId}/review/`
    );
    this.setState({
      reviewLength: review.length,
    });
  }

  handleUpdateCart() {
    this.setState({
      cart: JSON.parse(sessionStorage.cart),
    });
  }

  // 주문표 옆의 숫자를 업데이트 시키기 위한 함수
  pullCartItem = () => {
    this.setState({
      cartLength: JSON.parse(sessionStorage.cart).reduce(
        (acc, item) => acc + item.quantity,
        0
      ),
    });
  };

  render() {
    const { storeId } = this.props;
    return (
      <div>
        <StoreDetailView
          {...this.state}
          id={storeId}
          updateCart={this.handleUpdateCart}
          pullCartItem={this.pullCartItem}
          reviewStar={this.reviewStar.bind(this)}
          updateReviewLength={this.updateReviewLength}
          key={this.state.cartLength}
        />
      </div>
    );
  }
}
