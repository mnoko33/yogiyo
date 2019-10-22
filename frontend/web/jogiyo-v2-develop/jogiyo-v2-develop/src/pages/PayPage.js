import React, { Component } from 'react';
import Pay from '../containers/Pay';
import Layout from '../components/Layout';

export default class PayPage extends Component {
  render() {
    return (
      <Layout>
        <Pay />
      </Layout>
    );
  }
}
