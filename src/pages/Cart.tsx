import React from "react";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { CartItem, Product } from "../common/types";

export function Cart() {
    const {user, isAuthenticated } = useAuth0();
    const [cart, setCart] = React.useState([]);
    const [cartDict, setCartDict] = React.useState(JSON.parse(localStorage.getItem("cart") || "{}"));
    const [accessToken, setAccessToken] = React.useState<string | undefined>();

    React.useEffect(() => {
        // get ids from localStorage
        const ids = Object.keys(cartDict);

        // if no ids, return
        if (ids.length === 0) { 
            return;
        }

        // get products from backend
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/products-by-id?ids=`+ids)
        .then((res) => {
            console.log(res);
            setCart(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [isAuthenticated]);

    React.useEffect(() => {
        if (!isAuthenticated) {
            return;
        }

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
    }, [cartDict]);

    const removeFromCart = (event: any) => {
        // remove product from localStorage
        const cartDict = JSON.parse(localStorage.getItem("cart") || "{}");
        delete cartDict[event.target.dataset.id];
        setCartDict(cartDict);

        // update cart state with removed item
        localStorage.setItem("cart", JSON.stringify(cartDict));
        const newCart = cart.filter((product: Product) => { return product.id !== parseInt(event.target.dataset.id) });
        setCart(newCart);
    };

    const quantityChanger = (event: any) => {
        event.preventDefault();
        // get product id and amount from event
        const productId = event.target.dataset.id;
        // get amount by going through parent element
        const amount = parseInt(event.target.parentElement.children[0].valueAsNumber);

        let cartDictCopy = JSON.parse(localStorage.getItem("cart") || "{}");

        // check if amount goes above available stock
        const product: Product = cart.filter((product: Product) => {return product.id === parseInt(productId)})[0];
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

    return (
        <div>
            <h1>Cart</h1>
            {cart.map((product: Product) => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{(product.price*JSON.parse(localStorage.getItem("cart") || "{}")[product.id]).toFixed(2)}</p>
                    <p>{JSON.parse(localStorage.getItem("cart") || "{}")[product.id]}</p>
                    <form>
                        <input type="number" defaultValue={JSON.parse(localStorage.getItem("cart") || "{}")[product.id]} />
                        <button data-id={product.id} onClick={quantityChanger}>Change Quantity</button>
                    </form>
                    <button data-id={product.id} onClick={removeFromCart}>Remove From Cart</button>
                </div>
            ))}
            {(isAuthenticated) ? (
                <button>Checkout</button>
            ) : (
                <p>Please log in to checkout</p>
            )}
        </div>
    );
}