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
  
  const { user, isAuthenticated } = useAuth0();

  React.useEffect(() => {
    // if user is logged in, get cart from backend
    if (isAuthenticated) {
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cart/cart/${user?.sub}`)
        .then((res) => {
            console.log(res);
            // if their cart is empty, update it with localStorage
            if (res.data.length === 0) {
              Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/cart/update_cart`, {
                user_id: user?.sub,
                cart: JSON.parse(localStorage.getItem("cart") || "{}")
              })
              .then((res) => {
                  console.log(res);
              })
              .catch((err) => {
                  console.log(err);
              });
            } else {
              // if their cart is not empty, update localStorage with backend
              let cartDict = Object.fromEntries(res.data.map((cartItem: CartItem) => [cartItem.product_id, cartItem.quantity]))   
              localStorage.setItem("cart", JSON.stringify(cartDict));
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
  }, [isAuthenticated]);
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
