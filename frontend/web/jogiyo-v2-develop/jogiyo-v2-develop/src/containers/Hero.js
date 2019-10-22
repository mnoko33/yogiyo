import React, { Component } from 'react';
import HeroView from '../components/HeroView';
import { withKakao } from '../contexts/kakaoApiContext';

class Hero extends Component {
  static defaultProps = {
    addrString: {},
    addrShow: '',
  };
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     addrShow: '',
  //   };
  // }

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     addrInput: '',
  //     addrShow: '',
  //   };
  // }

  // componentDidMount() {
  //   // const { handleSetGps } = this.props;
  //   // handleSetGps();
  //   // let addrInput = JSON.parse(sessionStorage.getItem('addrString'));
  //   // let addrShow =
  //   //   addrInput &&
  //   //   addrInput.firstRegion +
  //   //     ' ' +
  //   //     addrInput.secondRegion +
  //   //     ' ' +
  //   //     addrInput.thirdRegion;
  //   // sessionStorage.setItem('addrShow', JSON.stringify(addrShow));
  //   // this.setState({
  //   //   addrInput,
  //   //   addrShow,
  //   // });
  //   if (sessionStorage.getItem('addrShow')) {
  //     this.setState({
  //       addrShow: JSON.parse(sessionStorage.addrShow),
  //     });
  //   }
  //   console.log('히어로');
  // }

  render() {
    console.log(this.state);
    const { handleGpsClick, addrShow } = this.props;
    return <HeroView findMyAddress={handleGpsClick} addrShow={addrShow} />;
  }
}

export default withKakao(Hero);
