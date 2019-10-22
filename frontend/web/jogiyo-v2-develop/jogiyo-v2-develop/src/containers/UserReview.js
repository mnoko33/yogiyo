import React, { Component } from 'react';
import UserReviewView from '../components/UserReviewView';
import api from '../api';

export default class UserReview extends Component {
  static defaultProps = {
    storeId: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      review: [],
      loading: true,
    };
    this.handlePostDelete = this.handlePostDelete.bind(this);
    this.refreshReview = this.refreshReview.bind(this);
  }
  async componentDidMount() {
    const { storeId } = this.props;
    const { data: review } = await api.get(
      `/restaurants/api/${storeId}/review/`
    );
    this.setState({
      review,
      loading: false,
    });
  }

  timeDiff(time) {
    const currentTime = new Date();
    const postTime = new Date(time);

    const diff = (currentTime.getTime() - postTime.getTime()) / 1000;
    let dd = postTime.getDate();
    let mm = postTime.getMonth() + 1;
    let year = postTime.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    let posted = year + '년 ' + mm + '월 ' + dd + '일 ';

    if (diff < 60) {
      return '방금 전';
    } else if (diff >= 60 && diff < 3600) {
      return Math.trunc(diff / 60) + '분 전';
    } else if (diff >= 3600 && diff < 86400) {
      return Math.trunc(diff / 3600) + '시간 전';
    } else if (diff >= 86400 && diff < 86400) {
      return Math.trunc(diff / 86400) + '일 전';
    } else {
      return posted;
    }
  }
  async refreshReview() {
    const { storeId } = this.props;
    const res = await api.get(`/restaurants/api/${storeId}/review/`);

    this.setState({
      review: res.data,
      loading: false,
    });
  }

  async handlePostDelete(storeId, postId) {
    await api.delete(`/restaurants/api/${storeId}/review/${postId}/`);
    await this.refreshReview();
  }

  render() {
    const { review, loading } = this.state;
    const {
      ownerReplyCount,
      reviewStar,
      reviewAvg,
      deliveryAvg,
      quantityAvg,
      tasteAvg,
      storeId,
    } = this.props;

    return (
      <div>
        <UserReviewView
          handleUserReviewPage={this.props.handleUserReviewPage}
          key={review.length}
          updateReviewLength={this.props.updateReviewLength}
          storeId={storeId}
          postDelete={this.handlePostDelete}
          timeDiff={this.timeDiff.bind(this)}
          review={review}
          reviewStar={reviewStar}
          ownerReplyCount={ownerReplyCount}
          reviewAvg={reviewAvg}
          deliveryAvg={deliveryAvg}
          quantityAvg={quantityAvg}
          tasteAvg={tasteAvg}
          loading={loading}
        />
      </div>
    );
  }
}
