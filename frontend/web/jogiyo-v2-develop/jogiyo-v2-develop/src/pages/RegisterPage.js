import React, { Component } from 'react';
import Layout from '../components/Layout';
import Register from '../containers/Register';
export default class RegisterPage extends Component {
  render() {
    const { history } = this.props;
    return (
      <Layout>
        <Register history={history} />
      </Layout>
    );
  }
}
