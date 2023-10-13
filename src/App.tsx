import React from 'react';
import {
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

import ProtectedRoute from './components/ProtectedRoute';

import { Header } from './Header';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { SingleProduct } from './pages/SingleProduct';
import { EditSingleProduct } from './pages/EditSingleProduct';
import { Authenticate } from './pages/Authenticate';
import { CreateProduct } from './pages/CreateProduct';

function App() {
  const location = useLocation();

  // Define an array of routes where the header should be hidden
  const hiddenRoutes = ['/authenticate'];

  // Check if the current route is in the hiddenRoutes array
  const isHeaderHidden = hiddenRoutes.includes(location.pathname);

  return (
    <div className="App">
      {!isHeaderHidden && <Header/>}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/products" element={<Shop/>} />
        <Route path="/products/:id" element={<SingleProduct/>} />
        <Route element={<ProtectedRoute roles={["admin"]}/>}>
          <Route path="/products/:id/edit" element={<EditSingleProduct/>} />
          <Route path="/products/create" element={<CreateProduct/>} />
        </Route>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/authenticate" element={<Authenticate/>} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;
