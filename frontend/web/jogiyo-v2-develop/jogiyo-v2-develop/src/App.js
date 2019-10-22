import React, { Component } from 'react';
import './App.css';
import 'core-js';
import '@babel/polyfill';

import FoodCategoryPage from './pages/FoodCategoryPage';
import { BrowserRouter, Route } from 'react-router-dom';
import StoreListPage from './pages/StoreListPage';
import StoreDetailPage from './pages/StoreDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import PayPage from './pages/PayPage';
import { KakaoApiProvider } from './contexts/kakaoApiContext';
import UserProvider from './contexts/UserContext';
import NewReviewFormPage from './pages/NewReviewFormPage';
import EditReviewFormPage from './pages/EditReviewFormPage';

class App extends Component {
  render() {
    return (
      <KakaoApiProvider>
        <UserProvider>
          <BrowserRouter>
            <React.Fragment>
              <Route exact path="/" component={FoodCategoryPage} />
              {/* <Route exact path="/category" componet={StoreListPage} /> */}
              <Route path="/category/:id?" component={StoreListPage} />
              <Route path="/store/:id" component={StoreDetailPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/pay" component={PayPage} />
              <Route path="/cart" component={CartPage} />
              <Route path="/new" component={NewReviewFormPage} />
              <Route path="/edit" component={EditReviewFormPage} />
            </React.Fragment>
          </BrowserRouter>
        </UserProvider>
      </KakaoApiProvider>
    );
  }
}

export default App;
