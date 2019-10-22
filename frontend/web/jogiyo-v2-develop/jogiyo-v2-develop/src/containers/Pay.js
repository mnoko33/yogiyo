import React, { Component } from 'react';
import PayView from '../components/PayView';
import { withKakao } from '../contexts/kakaoApiContext';

class Pay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: JSON.parse(sessionStorage.cart),
      // 주문내역 가데이터
      // list: {
      //   store: '피자디아',
      //   menu: ['콤비네이션피자(R)', '콜라(L)', '치즈오븐스파게티'],
      //   price: 11000,
      // },
      // list: {
      //   store: '',
      //   menu: [],
      //   price: 0,
      // },
    };
  }

  render() {
    console.log(this.state.list);
    const { list } = this.state;
    return (
      <div>
        <PayView list={list} key={this.state.list.length} />
      </div>
    );
  }
}

export default withKakao(Pay);
