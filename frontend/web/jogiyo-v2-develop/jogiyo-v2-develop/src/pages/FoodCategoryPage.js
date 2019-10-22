import React, { Component } from 'react';

import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import './FoodCategoryPage.scss';
import { withKakao } from '../contexts/kakaoApiContext';

class FoodCategoryPage extends Component {
  render() {
    const { click, addrShow } = this.props;

    return (
      <Layout>
        <div className="FoodCategory">
          <div className="FoodCategory__link-wrap">
            {addrShow ? (
              <>
                <Link className="FoodCategory__link--all" to="/category">
                  전체 보기
                </Link>
                <Link className="FoodCategory__link--alone" to="/category/8">
                  1인분 주문
                </Link>
                <Link
                  className="FoodCategory__link--franchise"
                  to="/category/2"
                >
                  프랜차이즈
                </Link>
                <Link className="FoodCategory__link--chicken" to="/category/4">
                  치킨
                </Link>
                <Link className="FoodCategory__link--pizza" to="/category/1">
                  피자/양식
                </Link>
                <Link className="FoodCategory__link--chinese" to="/category/7">
                  중식
                </Link>
                <Link className="FoodCategory__link--korean" to="/category/10">
                  한식
                </Link>
                <Link
                  className="FoodCategory__link--japanese"
                  to="/category/12"
                >
                  일식/돈까스
                </Link>
                <Link className="FoodCategory__link--pig" to="/category/3">
                  족발/보쌈
                </Link>
                <Link className="FoodCategory__link--night" to="/category/9">
                  야식
                </Link>
                <Link className="FoodCategory__link--snack" to="/category/11">
                  분식
                </Link>
                <Link className="FoodCategory__link--cafe" to="/category/5">
                  카페/디저트
                </Link>
              </>
            ) : (
              <>
                <span
                  className="FoodCategory__link--all"
                  to="/category"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  전체 보기
                </span>
                <span
                  className="FoodCategory__link--alone"
                  to="/category/8"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  1인분 주문
                </span>
                <span
                  className="FoodCategory__link--franchise"
                  to="/category/2"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  프랜차이즈
                </span>
                <span
                  className="FoodCategory__link--chicken"
                  to="/category/4"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  치킨
                </span>
                <span
                  className="FoodCategory__link--pizza"
                  to="/category/1"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  피자/양식
                </span>
                <span
                  className="FoodCategory__link--chinese"
                  to="/category/7"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  중식
                </span>
                <span
                  className="FoodCategory__link--korean"
                  to="/category/10"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  한식
                </span>
                <span
                  className="FoodCategory__link--japanese"
                  to="/category/12"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  일식/돈까스
                </span>
                <span
                  className="FoodCategory__link--pig"
                  to="/category/3"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  족발/보쌈
                </span>
                <span
                  className="FoodCategory__link--night"
                  to="/category/9"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  야식
                </span>
                <span
                  className="FoodCategory__link--snack"
                  to="/category/11"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  분식
                </span>
                <span
                  className="FoodCategory__link--cafe"
                  to="/category/5"
                  onClick={() => alert('GPS 버튼을 클릭하세요')}
                >
                  카페/디저트
                </span>
              </>
            )}
            {/* <Link className="FoodCategory__link--all" to="/category">
              전체 보기
            </Link>
            <Link className="FoodCategory__link--alone" to="/category/3">
              1인분 주문
            </Link>
            <Link className="FoodCategory__link--franchise" to="/category/1">
              프랜차이즈
            </Link>
            <Link className="FoodCategory__link--chicken" to="/category/2">
              치킨
            </Link>
            <Link className="FoodCategory__link--pizza" to="/category/10">
              피자/양식
            </Link>
            <Link className="FoodCategory__link--chinese" to="/category/4">
              중식
            </Link>
            <Link className="FoodCategory__link--korean" to="/category/7">
              한식
            </Link>
            <Link className="FoodCategory__link--japanese" to="/category/6">
              일식/돈까스
            </Link>
            <Link className="FoodCategory__link--pig" to="/category/9">
              족발/보쌈
            </Link>
            <Link className="FoodCategory__link--night" to="/category/5">
              야식
            </Link>
            <Link className="FoodCategory__link--snack" to="/category/8">
              분식
            </Link>
            <Link className="FoodCategory__link--cafe" to="/category/11">
              카페/디저트
            </Link> */}
          </div>
        </div>
        {/* <StoreList key={categories} categories={categories} /> */}
      </Layout>
    );
  }
}

export default withKakao(FoodCategoryPage);
