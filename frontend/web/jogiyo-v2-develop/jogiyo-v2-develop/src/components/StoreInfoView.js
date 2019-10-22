import React, { Component } from 'react';
import './StoreInfoView.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';

export default class StoreInfoView extends Component {
  static defaultProps = {
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
    minOrderAmount: 0,
  };

  render() {
    const {
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
      minOrderAmount,
    } = this.props;
    return (
      <div className="StoreInfo">
        <div className="StoreInfo__hour">
          <h3>
            <FontAwesomeIcon icon={faStore} />
            업체정보
          </h3>
          <p>
            <span>영업시간</span>
            <span>
              {begin.substring(0, begin.length - 3)} -
              {end.substring(0, end.length - 3)}
            </span>
          </p>
        </div>

        <div className="StoreInfo__payment">
          <h3>
            <FontAwesomeIcon icon={faStore} />
            결제정보
          </h3>
          <p>
            <span>최소주문금액</span>
            <span>{minOrderAmount.toLocaleString()}원</span>
          </p>
          <p>
            <span>결제수단</span>
            <span>{exceptCash ? '현금' : null},</span>
            <span>
              {paymentMethods.map(m => (
                <span key={m.id}>
                  {m.name === 'creditcard'
                    ? ' 신용카드,'
                    : ' online, '
                    ? ' 요기서결제 '
                    : null}
                </span>
              ))}
            </span>
          </p>
        </div>
        <div className="StoreInfo__info">
          <h3>
            <FontAwesomeIcon icon={faStore} />
            사업자 정보
          </h3>
          <p>
            <span>상호명</span>
            <span>{companyName}</span>
          </p>
          <p>
            <span>사업자등록번호</span>
            <span>{companyNumber}</span>
          </p>
        </div>
        <div className="StoreInfo__origin">
          <h3>
            <FontAwesomeIcon icon={faStore} />
            원산지 정보
          </h3>
          <p>{countryOrigin}</p>
        </div>
      </div>
    );
  }
}
