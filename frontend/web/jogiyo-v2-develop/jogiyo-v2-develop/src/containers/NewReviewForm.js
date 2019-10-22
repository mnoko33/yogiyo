import React, { Component } from 'react';
import ReviewForm from '../components/ReviewForm';
import api from '../api';

export default class NewReviewForm extends Component {
  async handleSubmit(body, tasteRate, foodAmountRate, deliveryRate, files) {
    // storeId를 프랍으로 받아와야 함
    const { storeId, history } = this.props;

    const formData = new FormData();
    formData.append('comment', body);
    formData.append('rating_taste', tasteRate);
    formData.append('rating_quantity', foodAmountRate);
    formData.append('rating_delivery', deliveryRate);
    files.forEach(f => {
      formData.append('review_images', f);
    });
    await api.post(`/restaurants/api/${storeId}/review/`, formData);

    // await api.post(`/restaurants/api/${storeId}/review/`, {
    //   comment: body,
    //   rating_delivery: deliveryRate,
    //   rating_quantity: foodAmountRate,
    //   rating_taste: tasteRate,
    // });
    history.push(`/store/${storeId}`);
  }
  render() {
    const { storeId, history } = this.props;
    return (
      <ReviewForm
        storeId={storeId}
        history={history}
        onSubmit={(body, tasteRate, foodAmountRate, deliveryRate, files) =>
          this.handleSubmit(
            body,
            tasteRate,
            foodAmountRate,
            deliveryRate,
            files
          )
        }
      />
    );
  }
}
