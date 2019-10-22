// import '@babel/polyfill';
import React, { Component } from 'react';
import Layout from '../components/Layout';
import StoreList from '../containers/StoreList';

export default class StoreListPage extends Component {
  render() {
    const { match, history, location } = this.props;
    const categoryId = match.params.id;
    console.log(categoryId);
    // const p = new URLSearchParams(location.pathname);
    // console.log(p);
    // const helloCategory = p.get('category');
    // console.log(helloCategory);

    return (
      <Layout>
        <StoreList
          key={location.pathname + location.search}
          categoryId={categoryId}
          history={history}
          location={location}
        />
      </Layout>
    );
  }
}
