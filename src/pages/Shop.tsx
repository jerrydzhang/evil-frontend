import React from "react";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export function Shop() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL!;
    const { user, isAuthenticated } = useAuth0();
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        Axios.get(`${backendUrl}/api/product/products`)
            .then((res) => {
                console.log(res);
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const addToCart = (event: any) => {
        const productId = event.target.dataset.id;
        const cartDict = JSON.parse(localStorage.getItem("cart") || "{}");
        // if cart exists, add to it
        if (cartDict[productId]) {
            cartDict[productId] = cartDict[productId] + 1 || 1;
            localStorage.setItem("cart", JSON.stringify(cartDict));
            if (isAuthenticated) {
                Axios.post(`${backendUrl}/api/cart/update_cart_item`, {
                    user_id: user?.sub,
                    product_id: JSON.parse(productId),
                    quantity: cartDict[productId]
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        // if cart doesn't exist, create it
        } else {
            cartDict[productId] = 1;
            localStorage.setItem("cart", JSON.stringify(cartDict));
            if (isAuthenticated) {
                Axios.post(`${backendUrl}/api/cart/add_to_cart`, {
                    user_id: user?.sub,
                    product_id: JSON.parse(productId),
                    quantity: cartDict[productId]
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        }
    }

    return (
        <div>
            <h1>Shop</h1>
            {products.map((product: any) => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.price}</p>
                    <p>{product.description}</p>
                    <button data-id={product.id} onClick={addToCart}>Add To Cart</button>
                </div>
            ))}
        </div>
    );
}