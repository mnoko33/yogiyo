import React, { Component } from 'react';
import NewReviewForm from '../containers/NewReviewForm';
import Layout from '../components/Layout';

export default class NewReviewFormPage extends Component {
  render() {
    const { location, history } = this.props;
    const { storeId } = location.state;

    return (
      <Layout>
        <NewReviewForm storeId={storeId} history={history} />
      </Layout>
    );
  }
}
