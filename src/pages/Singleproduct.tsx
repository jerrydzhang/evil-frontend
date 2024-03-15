import './SingleProduct.css';

import React, { useState } from 'react';
import Axios from 'axios';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Product, Size } from '../common/types';
import { PrivacyScreen } from '../components/PrivacyScreen';
import { useAuth0 } from '@auth0/auth0-react';

type SingleProductProps = {
    cart: {[key: string]: number};
    setCart: React.Dispatch<React.SetStateAction<{[key: string]: number}>>;
}

export function SingleProduct({ cart, setCart }: SingleProductProps) {
    const backendUrl = process.env.REACT_APP_BACKEND_URL!;
    const { name } = useParams<{ name: string }>();
    const { user, isAuthenticated } = useAuth0();
    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>();
    const [size, setSize] = useState<Size>(location.state ? location.state.size : undefined);
    const [image, setImage] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);

    React.useEffect(() => {
        // get product from backend
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/name/${name}`)
        .then((res) => {
            console.log(res);
            const product = res.data as Product[];
            setProducts(product);
            if (size === undefined) {
                const productsWithInventory = product.filter((product: Product) => product.inventory > 0);
                setSize(productsWithInventory[0].variant_id);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    if (!products) {
        return (
            <PrivacyScreen />
        );
    }

    const addToCart = (n: number) => {
        let cartClone = {...cart};
        const productId = products.find((product: Product) => product.variant_id === size)!.id;
        const product = products.find((product) => product.id === productId);
        const quantity = n || 1;
        if (!product) {
          return;
        }
        // if cart exists, add to it
        if (cart[productId]) {
            if (cart[productId] >= product.inventory) {
                return;
            }
            cartClone[productId] = cart[productId] + quantity || quantity;
            setCart(cartClone);
            // if (isAuthenticated) {
            //     Axios.post(`${backendUrl}/api/cart/update`, {
            //         user_id: user?.sub,
            //         product_id: productId,
            //         quantity: cartClone[productId]
            //     }, { withCredentials: true})
            //     .then((res) => {
            //         console.log(res);
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
            // }
        // if cart doesn't exist, create it
        } else {
            if (quantity > product.inventory) {
                return;
            }
            cartClone[productId] = quantity;
            setCart(cartClone);
            // if (isAuthenticated) {
            //     Axios.post(`${backendUrl}/api/cart/add`, {
            //         user_id: user?.sub,
            //         product_id: productId,
            //         quantity: cartClone[productId]
            //     }, { withCredentials: true })
            //     .then((res) => {
            //         console.log(res);
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
            // }
        }
    }

    const changeImage = (change: number) => {
        if (image + change < 0) {
            setImage(products[0].images.length - 1);
        } else if (image + change >= products[0].images.length) {
            setImage(0);
        } else {
            setImage(image + change);
        }
    };

    return (
        <div className='product-page-container'>
            <button className='btn back-button' onClick={() => navigate("/product")}>
                Back
                {/* <img className='size-12' src='/icons/left_arrow_icon.svg' alt='back-arrow' /> */}
            </button>
            {products
            .filter((product: Product) => {
                if (size !== undefined) {
                    return product.variant_id === size;
                }
            })
            .map((product: Product) => (
                <div className='product-container' key={product.id}>
                    <div>
                        <div className='img-container'>
                        <img className='product-img' src={products[0].images[image]} alt={product.name} />
                        </div>
                        <div className='flex justify-center justify-self-center mt-4'>
                        <button onClick={() => changeImage(-1)}>Previous</button>
                        <p className='mx-2'>{image + 1} of {products[0].images.length}</p>
                        <button onClick={() => changeImage(1)}>Next</button>
                        </div>
                    </div>
                    <div className='sizing-container'>
                        <button className={`size-button ${!products.some((product: Product) => product.variant_id === Size.S && product.inventory > 0) && 'unavailable'} ${size === Size.S && 'active'}`} onClick={() => setSize(Size.S)}>S</button>
                        <button className={`size-button ${!products.some((product: Product) => product.variant_id === Size.M && product.inventory > 0) && 'unavailable'} ${size === Size.M && 'active'}`} onClick={() => setSize(Size.M)}>M</button>
                        <button className={`size-button ${!products.some((product: Product) => product.variant_id === Size.L && product.inventory >0) && 'unavailable'} ${size === Size.L && 'active'}`} onClick={() => setSize(Size.L)}>L</button>
                        <button className={`size-button ${!products.some((product: Product) => product.variant_id === Size.XL && product.inventory > 0) && 'unavailable'} ${size === Size.XL && 'active'}`} onClick={() => setSize(Size.XL)}>XL</button>
                    </div>
                    <div className='left-container'>
                        <div className='discription-container'>
                        <h1 className='text-3xl'>{products[0].name}</h1>
                        <p className=' text-gray-500'>{products[0].category}</p>
                        <h2>${product.price}</h2>
                        <p>{products[0].description}</p>
                        <p className='mt-auto ml-auto text-gray-500'>{(new Date(products[0].created_at).toLocaleDateString())}</p>
                        </div>
                        <div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            addToCart(quantity)
                            }}>
                        <button className="btn cart-button" type='submit'>Add To Cart</button>
                        <input className="quantity-input" type="number" min="1" max={product.inventory} value={quantity} onChange={(e) => {
                            // if (parseInt(e.target.value) > product.inventory) {setQuantity(parseInt(e.target.value))} 
                            // else {setQuantity(product.inventory)}
                            setQuantity(parseInt(e.target.value));
                            }} />
                        </form>
                        </div>
                    </div>
                </div>
            ))}
            <PrivacyScreen />
        </div>
    );
}