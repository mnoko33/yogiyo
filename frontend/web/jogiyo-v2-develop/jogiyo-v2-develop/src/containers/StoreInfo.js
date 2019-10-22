import React, { Component } from 'react';
import StoreInfoView from '../components/StoreInfoView';

export default class StoreInfo extends Component {
  static defaultProps = {
    storeId: null,
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
      <div>
        <StoreInfoView
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
      </div>
    );
  }
}
