import React, { Component } from 'react';
import Layout from '../components/Layout';
import EditReviewForm from '../containers/EditReviewForm';

export default class EditReviewFormPage extends Component {
  render() {
    const { location, history } = this.props;
    const { storeId, postId } = location.state;
    return (
      <Layout>
        <EditReviewForm storeId={storeId} postId={postId} history={history} />
      </Layout>
    );
  }
}
