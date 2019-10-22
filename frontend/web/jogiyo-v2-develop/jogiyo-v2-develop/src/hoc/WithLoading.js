import React, { Component } from 'react';
import style from './a.module.scss';

class WithLoading extends Component {
  render() {
    return (
      <div className={style.container}>
        <div className={style.circle} />
        <div className={style.circle} />
        <div className={style.circle} />
        <div className={style.circle} />
        <div className={style.circle} />
        <div className={style.circle} />
        <div className={style.circle} />
        <div className={style.circle} />
      </div>
    );
  }
}

export default function withLoading(Wrapped) {
  return function WithLoadings(props) {
    const { loading, ...rest } = props;
    console.log(loading);
    if (loading) {
      return <WithLoading {...props} />;
    } else {
      return <Wrapped {...rest} />;
    }
  };
}
