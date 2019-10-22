import React, { Component } from 'react';
import LoginView from '../components/LoginView';
import { withUser } from '../contexts/UserContext';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      success: false,
      login: true,
      // loading: true,
    };
  }
  handleChange = (target, value) => {
    this.setState({
      [target]: value,
    });
  };
  handleLogin = async () => {
    const { username, password } = this.state;
    const { login } = this.props;
    try {
      await login(username, password);

      this.setState({
        success: true,
        // loading: false,
      });
    } catch (e) {
      console.log('로그인 에러 남');
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <LoginView
        handleLogin={this.handleLogin}
        handleChange={this.handleChange}
        loading={loading}
        {...this.state}
      />
    );
  }
}

export default withUser(Login);
