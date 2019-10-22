import React, { Component } from 'react';
import StoreDetail from '../containers/StoreDetail';
import Layout from '../components/Layout';

export default class StoreDetailPage extends Component {
  render() {
    const { match } = this.props;
    const storeId = match.params.id;
    return (
      <Layout>
        <StoreDetail storeId={storeId} />
      </Layout>
    );
  }
}
