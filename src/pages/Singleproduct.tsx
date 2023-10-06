import React from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Product } from '../common/types';

export function SingleProduct() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = React.useState<Product>();

    React.useEffect(() => {
        // get product from backend
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/products/${id}`)
        .then((res) => {
            console.log(res);
            setProduct(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);
    
    return (
        <div>
            {!(product) ? (
                <div>Loading...</div>
            ): (
                <div>
                    <h1>{product.name}</h1>
                    <h2>{product.price}</h2>
                    <p>{product.catagory}</p>
                    <p>{product.description}</p>
                </div>
            )}
        </div>
    );
}