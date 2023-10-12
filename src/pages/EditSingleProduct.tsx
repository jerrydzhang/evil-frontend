import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Catagory } from '../common/types';

export function EditSingleProduct() {
    const { id } = useParams<{ id: string }>();
    const Navigate = useNavigate();

    interface Product {
        id?: number;
        name?: string;
        description?: string;
        catagory_id?: number;
        catagory?: string;
        price?: number;
        inventory?: number;
        last_updated?: string;
    }
      
    const [product, setProduct] = useState<Product>();
    const [catagories, setCatagories] = useState<Catagory[]>([]);

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

        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/catagory/catagories`)
        .then((res) => {
            console.log(res);
            setCatagories(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const updateProduct = (event: any) => {
        const field = event.target.dataset.field;
        let value = event.target.value;
        // if price, convert to float
        if (field === "catagory_id") {
            value = parseFloat(value);
        }
        const newProduct = {...product, [field]: value};
        setProduct(newProduct);
    };

    const saveProduct = () => {
        Axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/product/update_product/${id}`, 
        product, 
        { withCredentials: true })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    };
    
    const deleteProduct = () => {
        Axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/product/delete_product/${id}`, 
        { withCredentials: true })
        .then((res) => {
            console.log(res);
            Navigate("/products");
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    return (
        <div>
            {!(product) ? (
                <div>Loading...</div>
            ): (
                <div>
                    <input data-field="name" type="text" onChange={updateProduct} value={product.name} />
                    <input data-field="price" type="number" onChange={updateProduct} value={product.price?.toString()} />
                    <select data-field="catagory_id" onChange={updateProduct}>
                        {catagories.map((catagory: Catagory) => (
                            <option key={catagory.id} value={catagory.id}>{catagory.name}</option>
                        ))}
                    </select>
                    <input data-field="description" type="text" onChange={updateProduct} value={product.description} />
                    <button onClick={saveProduct}>Save</button>
                    <button onClick={deleteProduct}>Delete</button>
                </div>
            )}
        </div>
    );
}