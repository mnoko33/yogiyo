import React, { Component } from 'react';
import api from '../api';
import ReviewForm from '../components/ReviewForm';

export default class EditReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: '',
      tasteRate: 1,
      foodAmountRate: 1,
      deliveryRate: 1,
    };
  }

  async componentDidMount() {
    const { storeId, postId } = this.props;
    const {
      data: {
        comment,
        rating_taste,
        rating_quantity,
        rating_delivery,
        review_images,
        // prop으로 이미 받아서.. 밑의 2가지가 필요할까?
        // restaurant,
        // user,
      },
    } = await api.get(`/restaurants/api/${storeId}/review/${postId}/`);

    this.setState({
      body: comment,
      tasteRate: rating_taste,
      foodAmountRate: rating_quantity,
      deliveryRate: rating_delivery,
      files: review_images,
    });
  }

  async handleSubmit(body, tasteRate, foodAmountRate, deliveryRate, files) {
    const { storeId, postId, history } = this.props;
    const formData = new FormData();
    formData.append('comment', body);
    formData.append('rating_taste', tasteRate);
    formData.append('rating_quantity', foodAmountRate);
    formData.append('rating_delivery', deliveryRate);
    files.forEach(f => {
      formData.append('review_images', f);
    });
    await api.patch(`/restaurants/api/${storeId}/review/${postId}/`, formData);
    // {
    //   comment: body,
    //     rating_taste: tasteRate,
    //       rating_quantity: foodAmountRate,
    //         rating_delivery: deliveryRate,
    // }
    history.push(`/store/${storeId}`);
  }

  render() {
    const { body, tasteRate, foodAmountRate, deliveryRate, files } = this.state;

    if (!body) {
      return '불러오는 중 입니다...';
    }
    return (
      <ReviewForm
        onSubmit={(body, tasteRate, foodAmountRate, deliveryRate, files) =>
          this.handleSubmit(
            body,
            tasteRate,
            foodAmountRate,
            deliveryRate,
            files
          )
        }
        body={body}
        tasteRate={parseInt(tasteRate)}
        foodAmountRate={parseInt(foodAmountRate)}
        deliveryRate={parseInt(deliveryRate)}
        files={files}
      />
    );
  }
}
