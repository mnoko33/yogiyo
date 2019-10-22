import React, { Component } from 'react';
import api from '../api';

const { Provider, Consumer } = React.createContext();

export default class UserProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      login: this.login.bind(this),
      logout: this.logout.bind(this),
      register: this.register.bind(this),

      id: null,
      username: null,
      password: '',
      passwordConfirm: '',
      phoneNumber: '',
      nickName: '',
      success: false,
    };
  }

  async componentDidMount() {
    // 토큰이 있으면 할 일

    if (localStorage.getItem('token')) {
      await this.refreshUser();
      this.setState({
        isLogin: true,
      });
    }
    console.log(this.state);
  }

  async refreshUser() {
    const res2 = await api.get(`/members/api/user/me/`);
    console.log(res2.data[0]);
    this.setState({
      id: res2.data[0].id,
      username: res2.data[0].username,
    });
  }
  // 회원 가입
  async register({ ...value }) {
    const { username, password, phoneNumber, nickName } = value;

    // 아마.. 이 db 구조로는 그냥 파람스 없이 요청한 다음에, 그 데이터를 find로 찾아서 매칭하는 아이디가 있는지 없는지를 걸러야 할 듯.
    // const userCheck = await api.get(`/members/api/user/${username}`);

    // console.log(userCheck[0]);

    // 새로운 유저 인스턴스 생성
    await api.post('members/api/user/', {
      username,
      password,
      phone_number: phoneNumber,
      nick_name: nickName,
    });
    alert('성공적으로 생성');

    //TODO: 중복 아이디일 경우, 모달 띄우기
  }

  async login(username, password) {
    const res = await api.post(`/api-token-auth/ `, {
      username,
      password,
    });
    localStorage.setItem('token', res.data.token);
    await this.refreshUser();
    this.setState({
      isLogin: true,
    });
  }

  logout() {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('token');

    // 사용자 정보 캐시 초기화
    this.setState({
      isLogin: false,
      username: null,
      phoneNumber: '',
      nickName: '',
    });
  }

  render() {
    // const value = { username: this.state.username, id: this.state.id };
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

function withUser(WrappedComponent) {
  return function WithUser(props) {
    return (
      <Consumer>{value => <WrappedComponent {...value} {...props} />}</Consumer>
    );
  };
}

export { UserProvider, Consumer as UserConsumer, withUser };
