import React, { Component } from 'react';
import Login from '../containers/Login';
import Layout from '../components/Layout';

export default class LoginPage extends Component {
  render() {
    return (
      <Layout>
        <Login />
      </Layout>
    );
  }
}
