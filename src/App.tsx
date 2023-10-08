import React from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import Axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

import { Header } from './Header';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { CartItem } from './common/types';
import { SingleProduct } from './pages/Singleproduct';


function App() {
  
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  if (isAuthenticated) {
    getAccessTokenSilently().then((token) => {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    });
  }

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/product/:id" element={<SingleProduct/>} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;
