import React from "react";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { CartItem, Product } from "../common/types";

export function Cart() {
    const {user, isAuthenticated, isLoading} = useAuth0();
    const [cart, setCart] = React.useState([]);
    const [cartDict, setCartDict] = React.useState(JSON.parse(localStorage.getItem("cart") || "{}"));

    // on first render, get products from backend
    React.useEffect(() => {
        // get ids from localStorage
        const ids = Object.keys(cartDict);

        // if no ids, return
        if (ids.length === 0) { 
            return;
        }

        // get products from backend
        rerenderCart();
    }, []);

    // on first render, if authenticated, get cart from user
    React.useEffect(() => {
        // if not authenticated, return
        if(!isAuthenticated) {
            return;
        }

        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cart?user=${user?.sub}`,{ withCredentials: true })
        .then((res) => {
            console.log(res);
            if (res.data.length === 0) {
                // if their cart is empty, update it with localStorage
                Axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/cart/update_cart`, {
                    user_id: user?.sub,
                    cart: JSON.parse(localStorage.getItem("cart") || "{}")
                },
                { withCredentials: true })
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
                setCartDict(cartDict);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }, [isLoading])

    // whenever cartDict changes, update backend
    React.useEffect(() => {
        // dont run if not authenticated
        if (!isAuthenticated) {
            return;
        }

        Axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/cart/update_cart`, {
            user_id: user?.sub,
            cart: JSON.parse(localStorage.getItem("cart") || "{}")
        },
        { withCredentials: true })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
        
        // rerender cart with new cartDict
        rerenderCart();
    }, [cartDict]);

    // rerender cart by using ids from localStorage to get products from backend
    const rerenderCart = () => {
        // get ids from localStorage
        const ids = Object.keys(cartDict);

        // if no ids, return
        if (ids.length === 0) { 
            return;
        }

        // get products from backend
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/by-id?ids=`+ids)
        .then((res) => {
            console.log(res);
            setCart(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    // handles removing product from cart
    const removeFromCart = (event: any) => {
        // remove product from localStorage
        const cartDict = JSON.parse(localStorage.getItem("cart") || "{}");
        delete cartDict[event.target.dataset.id];
        setCartDict(cartDict);

        // update cart state with removed item
        localStorage.setItem("cart", JSON.stringify(cartDict));
        const newCart = cart.filter((product: Product) => { return product.id !== event.target.dataset.id });
        setCart(newCart);
    };

    // handles changing quantity of product in cart
    const quantityChanger = (event: any) => {
        event.preventDefault();
        // get product id and amount from event
        const productId = event.target.dataset.id;
        // get amount by going through parent element
        const amount = parseInt(event.target.parentElement.children[0].valueAsNumber);

        let cartDictCopy = JSON.parse(localStorage.getItem("cart") || "{}");

        // check if amount goes above available stock
        const product: Product = cart.filter((product: Product) => {return product.id === productId})[0];
        if (amount > product.inventory) {
            return
        }

        // change cartDict
        cartDictCopy[productId] = amount;

        // update localStorage
        localStorage.setItem("cart", JSON.stringify(cartDictCopy));

        // update cart state
        setCartDict(cartDictCopy);
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
        <div>
            <h1>Cart</h1>
            {cart.map((product: Product) => (
                <div key={product.id}>
                    <a href={`/products/${product.id}`}>{product.name}</a>
                    <img className="h-12 w-12" src={product.images[0]} />
                    <p>{(product.price*JSON.parse(localStorage.getItem("cart") || "{}")[product.id]).toFixed(2)}</p>
                    <p>{JSON.parse(localStorage.getItem("cart") || "{}")[product.id]}/{product.inventory}</p>
                    <form>
                        <input type="number" defaultValue={JSON.parse(localStorage.getItem("cart") || "{}")[product.id]} />
                        <button data-id={product.id} onClick={quantityChanger}>Change Quantity</button>
                    </form>
                    <button data-id={product.id} onClick={removeFromCart}>Remove From Cart</button>
                </div>
            ))}
            {(isAuthenticated) ? (
                <button onClick={checkout}>Checkout</button>
            ) : (
                <p>Please log in to checkout</p>
            )}
        </div>
    );
}