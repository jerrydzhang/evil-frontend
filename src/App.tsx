import { useAuth0 } from '@auth0/auth0-react';
import Axios from 'axios';
import {
  Route,
  Routes,
  useLocation,
  useRoutes,
  useSearchParams,
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
import { AdminSingleOrder } from './pages/AdminSingleOrder';
import { ThreeDHome } from './pages/3dHome';
import { AnimatePresence, motion, useIsPresent } from 'framer-motion';
import { Suspense, cloneElement, useEffect, useMemo, useState } from 'react';
import { ThreeDComponent } from './3dcomponents/3dComponent';
import { PrivacyScreen } from './components/PrivacyScreen';
import { Vector3 } from 'three';
import { ThreeDLoading } from './3dcomponents/3dLoadingScreen';
import { CartItem, Product } from './common/types';
import React from 'react';
import { SingleOrder } from './pages/SingleOrder';


function App() {
  const { getAccessTokenSilently } = useAuth0();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const isPresent = useIsPresent();

  const reduced = useMemo(() => {
    return (location.pathname === "/")
  }, [location]);

  // Get the access token
  getAccessTokenSilently().then((accessToken) => {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }).catch((err) => {});

  // Define an array of routes where the header should be hidden
  const hiddenRoutes = ['/authenticate', '/checkout-approved,', '/checkout-canceled'];

  // Check if the current route is in the hiddenRoutes array
  const isHeaderHidden = hiddenRoutes.includes(location.pathname);

  // 3D stuff
  const [home, setHome] = useState(true);
  const [cameraPosition, setCameraPosition] = useState(new Vector3(-8,3,10)); // [x, y, z]
  const [focus, setFocus] = useState(new Vector3(10,-100,-3));
  const [focused, setFocused] = useState(true);
  const [radius, setRadius] = useState(25);

  // shop stuff
  const [cart, setCart] = useState<{[key: string]: number}>({}); // [id, quantity]
  const [products, setProducts] = useState<{[key: string]: Product[]}>({});
  const [page, setPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  // auth0 stuff
  const { user, isAuthenticated, isLoading } = useAuth0();

  // init state
  const [init, setInit] = useState(false);

  useEffect(() => {    
    // if not authenticated, return
    if(!isAuthenticated) {
        return;
    }

    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cart?user=${user?.sub}`,{ withCredentials: true })
    .then((res) => {
        if (res.data.length === 0) {
            // if their cart is empty, update it with localStorage
            Axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/cart/update_cart`, {
                user_id: user?.sub,
                cart: cart
            },
            { withCredentials: true })
            .then((res) => {
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            // if their cart is not empty, update localStorage with backend
            setCart(Object.fromEntries(res.data.map((cartItem: CartItem) => [cartItem.product_id, cartItem.quantity])));
        }
    })
    .catch((err) => {
        console.log(err);
    });
    setInit(true);
}, [isLoading])

// whenever cartDict changes, update backend
React.useEffect(() => {
    // dont run if not authenticated
    if (!isAuthenticated || !init) {
        return;
    }

    Axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/cart/update_cart`, {
        user_id: user?.sub,
        cart: cart
    },
    { withCredentials: true })
    .then((res) => {
    })
    .catch((err) => {
        console.log(err);
    });
    
}, [cart]);

  return (
    <div className="App min-h-screen">
      {!isHeaderHidden && <Header 
        cart={cart}
        reduced={reduced}
        home={home}
        setHome={setHome}
        focused={focused}
        setFocused={setFocused}
        focus={focus}
        setFocus={setFocus}
        cameraPosition={cameraPosition}
        setCameraPosition={setCameraPosition}
      />}
      <AnimatePresence mode="wait" initial={false}>
        <div key={location.key} className="flex flex-col min-h-[calc(100vh-56px)]">
        <Routes location={location}>
          <Route path="/about" element={<About
            home={home}
            setHome={setHome}
            focused={focused}
            setFocused={setFocused}
            focus={focus}
            setFocus={setFocus}
          />} />
          <Route path="/product" element={<Shop
            products={products}
            setProducts={setProducts}
            page={page}
            setPage={setPage}
			currentCategory={currentCategory}
			setCurrentCategory={setCurrentCategory}
          />} />
          <Route path="/product/:name" element={<SingleProduct
            cart={cart}
            setCart={setCart}
          />} />
          <Route element={<ProtectedRoute roles={["admin"]}/>}>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/dashboard/:id" element={<AdminSingleOrder/>} />
            <Route path="/old-home" element={<Home/>} />
          </Route>
          <Route path="/cart" element={<Cart
            cart={cart}
            setCart={setCart}
          />} />
          <Route path="/profile" element={<Profile/>} />
		  <Route path="/order/:id" element={<SingleOrder/>} />
          <Route path="/authenticate" element={<Authenticate/>} />
          <Route path="/checkout-approved" element={<CheckoutApproved
            setCart={setCart}
          />} />
          <Route path="/checkout-canceled" element={<CheckoutCanceled/>} />
          <Route path="/" element={<ThreeDHome
            home={home}
            setHome={setHome}
            focused={focused}
            setFocused={setFocused}
            focus={focus}
            setFocus={setFocus}
            cameraPosition={cameraPosition}
            setCameraPosition={setCameraPosition}
          />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
        </div>
      </AnimatePresence>
      <ThreeDComponent
          home={home}
          setHome={setHome}
          focused={focused}
          setFocused={setFocused}
          focus={focus}
          setFocus={setFocus}
          radius={radius}
          setRadius={setRadius}
          cameraPosition={cameraPosition}
          setCameraPosition={setCameraPosition}
          products={products}
          setProducts={setProducts}
          page={page}
        />
    </div>
  );
}

export default App;
