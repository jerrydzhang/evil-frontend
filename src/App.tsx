import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import {
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import './App.css';

import ProtectedRoute from './components/ProtectedRoute';

import { Header } from './Header';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { SingleProduct } from './pages/SingleProduct';
import { Authenticate } from './pages/Authenticate';
import { CheckoutApproved } from './pages/CheckoutApproved';
import { Dashboard } from './pages/Dashboard';
import { CheckoutCanceled } from './pages/CheckoutCanceled';


function App() {
  const { getAccessTokenSilently } = useAuth0();
  const location = useLocation();

  // Get the access token
  getAccessTokenSilently().then((accessToken) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }).catch((err) => {});

  // Define an array of routes where the header should be hidden
  const hiddenRoutes = ['/authenticate', '/checkout-approved,', '/checkout-canceled'];

  // Check if the current route is in the hiddenRoutes array
  const isHeaderHidden = hiddenRoutes.includes(location.pathname);

  return (
    <div className="App">
      {!isHeaderHidden && <Header/>}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/product" element={<Shop/>} />
        <Route path="/product/:id" element={<SingleProduct/>} />
        <Route element={<ProtectedRoute roles={["admin"]}/>}>
          <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/authenticate" element={<Authenticate/>} />
        <Route path="/checkout-approved" element={<CheckoutApproved/>} />
        <Route path="/checkout-canceled" element={<CheckoutCanceled/>} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;
