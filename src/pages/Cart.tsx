import React, { useEffect, useMemo, useState } from "react";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { CartItem, Product } from "../common/types";
import { PrivacyScreen } from "../components/PrivacyScreen";
import { CartItemPanel } from "../components/CartItem";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

type CartProps = {
    cart: {[key: string]: number};
    setCart: React.Dispatch<React.SetStateAction<{[key: string]: number}>>;
}

export function Cart({ cart, setCart }: CartProps) {
    const {user, isAuthenticated, isLoading} = useAuth0();
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const [init, setInit] = useState(false);
    const navigate = useNavigate();

    const ids = useMemo(() => {
        return Object.keys(cart);
    }, [cart]);

    useEffect(() => {
        // get products from backend
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/by-id?ids=`+ids)
        .then((res) => {
            console.log(res);
            setCartProducts(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [ids]);

    // handles removing product from cart
    const removeFromCart = (event: any) => {
        setCart(() => {
            const newCart = {...cart};
            delete newCart[event.target.parentElement.dataset.id];
            return newCart;
        });
    };

    // handles changing quantity of product in cart
    const quantityChanger = (event: any) => {
        event.preventDefault();
        // get product id and amount from event
        const productId = event.target.dataset.id;
        // get amount by going through parent element
        let amount = parseInt(event.target.parentElement.children[1].valueAsNumber);

        // check if amount goes above available stock
        const product: Product = cartProducts.filter((product: Product) => {return product.id === productId})[0];
        if (amount > product.inventory) {
            amount = product.inventory;
        }

        // change cartDict
        let cartCopy = {...cart};
        cartCopy[productId] = amount;

        // update cart state
        setCart(cartCopy);
    };

    const checkout = () => {
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/checkout/`, {}, 
        { withCredentials: true })
        .then((res) => {
            window.location.href = res.data;
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className="flex flex-col">
            <h1>Cart</h1>
            <div className="cart-container">
            <div className="flex flex-col">
            {(cartProducts.length === 0) && (
                <div className="cart-item-container m-2 p-4"></div>
            )}
            {cartProducts.map((product: Product) => (
                <CartItemPanel
                    key={product.id}
                    product={product}
                    quantity={cart[product.id]}
                    quantityChanger={quantityChanger}
                    removeFromCart={removeFromCart}
                />
            ))}
            </div>
            <div className="">
                <div className="summary-container m-2 p-8 bg-[--eerie-accent] rounded-lg flex flex-col gap-1">
                    <h1 className="text-2xl">Summary</h1>
                    <hr className="mb-2"/>
                    <div className="flex"><h2>SubTotal: </h2><h2 className="ml-auto">${cartProducts.reduce((acc: number, product: Product) => {
                        return acc + product.price * cart[product.id];
                    }, 0).toFixed(2)}</h2></div>
                    <div className="flex"><p>Shipping: </p><p className="ml-auto">Free</p></div>
                    <div className="flex"><h2>Total: </h2><h2 className="ml-auto">${(cartProducts.reduce((acc: number, product: Product) => {
                        return acc + product.price * cart[product.id];
                    }, 0)).toFixed(2)}</h2></div>
                </div>
            {(isAuthenticated) ? (
                (Object.keys(cart).length >= 1 ? 
                <button className="btn w-fit" onClick={checkout}>Checkout</button>
                : 
                <button className="btn w-fit" onClick={()=>navigate("/product")}>Buy Stuff</button>
                )
            ) : (
                <p className="btn w-fit">Please log in to checkout</p>
            )}
            </div>
            </div>
            <PrivacyScreen />
        </div>
    );
}