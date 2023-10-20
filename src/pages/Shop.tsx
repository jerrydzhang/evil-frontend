import React, { useState } from "react";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export function Shop() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL!;
    const { user, isAuthenticated } = useAuth0();
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    React.useEffect(() => {
        Axios.get(`${backendUrl}/api/product`)
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
                Axios.post(`${backendUrl}/api/cart/update`, {
                    user_id: user?.sub,
                    product_id: productId,
                    quantity: cartDict[productId]
                }, { withCredentials: true})
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
                Axios.post(`${backendUrl}/api/cart/add`, {
                    user_id: user?.sub,
                    product_id: productId,
                    quantity: cartDict[productId]
                }, { withCredentials: true })
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
            <input type="checkbox" checked={isEditing} onChange={() => setIsEditing(!isEditing)} />
            {isEditing && (
                <a href="/products/create">Create Product</a>
            )}
            {products.map((product: any) => (
                <div key={product.id}>
                    {isEditing ? (
                    <a href={`/products/${product.id}/edit`}>{product.name}</a>
                    ):(
                    <a href={`/products/${product.id}`}>{product.name}</a>
                    )}
                    <p>{product.catagory}</p>
                    <p>{product.price}</p>
                    <p>{product.description}</p>
                    <button data-id={product.id} onClick={addToCart}>Add To Cart</button>
                </div>
            ))}
        </div>
    );
}