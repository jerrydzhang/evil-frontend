import React, { useState } from "react";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Product } from "../common/types";
import { useNavigate, useSearchParams } from "react-router-dom";

export function Shop() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL!;
    const { user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    React.useEffect(() => {
        if (searchParams.get("category")) {
            Axios.get(`${backendUrl}/api/product/category/${searchParams.get("category")}`)
            .then((res) => {
                console.log(res);
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
            return;
        } else {
            Axios.get(`${backendUrl}/api/product`)
            .then((res) => {
                console.log(res);
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, []);

    const addToCart = (event: any) => {
        const productId = event.target.dataset.id;
        const cartDict = JSON.parse(localStorage.getItem("cart") || "{}");
        const product = products.find((product) => product.id === productId);
        if (!product) {
          return;
        }
        // if cart exists, add to it
        if (cartDict[productId]) {
            if (cartDict[productId] >= product.inventory) {
                return;
            }
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
            if (1 >= product.inventory) {
                return;
            }
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

    const getCategory = (event: any) => {
        const category = event.target.value;
        if (category === "all") {
            setSearchParams({});
            navigate("/product");
        } else {
            setSearchParams({ category: category });
            navigate(`/product?category=${category}`);
        }
        window.location.reload();
    }

    return (
        <div>
            <h1>Shop</h1>
            <select id="category" value={searchParams.get("category")||"all"} onChange={getCategory}>
                <option value="all">All</option>
                <option value="t-shirt">T-Shirts</option>
                <option value="pants">Pants</option>
            </select>
            {products.sort((a, b) => a.created_at < b.created_at ? 1 : -1)
            .filter((product) => product.inventory > 0)
            .map((product: Product) => (
                <div key={product.id}>
                    <a href={`/product/${product.id}`}>{product.name}</a>
                    <img className="h-12 w-12" src={product.images[0]} />
                    <p>{product.inventory}</p>
                    <p>{product.category}</p>
                    <p>${product.price}</p>
                    <p>{product.description}</p>
                    <p>{product.created_at}</p>
                    <button data-id={product.id} onClick={addToCart}>Add To Cart</button>
                </div>
            ))}
        </div>
    );
}