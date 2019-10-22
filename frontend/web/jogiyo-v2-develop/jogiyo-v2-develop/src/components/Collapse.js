import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import './Collapse.scss';

export default class Collapse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //prop에 따른 초기상태 설정
      show: props.initialShow,
    };
  }

  handleClick() {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  }

  render() {
    const { name, children } = this.props;
    const { show } = this.state;
    return (
      <React.Fragment>
        <div className="Menu" onClick={() => this.handleClick()}>
          <span className="Menu__title">{name}</span>

          {show ? (
            <span className="Menu__arrow__up">
              <FontAwesomeIcon icon={faAngleUp} />
            </span>
          ) : (
            <span className="Menu__arrow__down">
              <FontAwesomeIcon icon={faAngleDown} />
            </span>
          )}
        </div>

        <div>{show && children}</div>
      </React.Fragment>
    );
  }
}
