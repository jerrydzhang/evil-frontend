import React, { useState } from "react";
import Axios from "axios";

import { Catagory } from "../common/types";
import UploadAndDisplayImage from "../components/UploadAndDisplayImage";


export function CreateProduct() {
    const [catagories, setCatagories] = React.useState<Catagory[]>([]);
    const [product, setProduct] = React.useState<NewProduct>({
        name: "",
        catagory_id: 0,
        price: 0,
        inventory: 0,
    });

    interface NewProduct {
        name: String,
        description?: String,
        catagory_id: Number,
        price: Number,
        inventory: Number,
    }

    // on first render, get catagories from backend
    React.useEffect(() => {
        Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/catagory`)
        .then((res) => {
            console.log(res);
            setCatagories(res.data);
            setProduct({...product, catagory_id: res.data[0].id});
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    // update product state
    const updateProduct = (event: any) => {
        const field = event.target.dataset.field;
        let value = event.target.value;
        // if price or inventory, convert to float
        if (field === "catagory_id" || field === "inventory") {
            value = parseFloat(value);
        }
        if (field === "images") {
            value = value.split(",");
            value = [...value];
        }
        const newProduct = {...product, [field]: value};
        setProduct(newProduct);
    };

    // create product
    const createProduct = () => {
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/product/create`, 
        product, 
        { withCredentials: true })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <div>
            <input data-field="name" type="text" onChange={updateProduct} placeholder="name" />
            <input data-field="price" type="number" onChange={updateProduct} placeholder="price" />
            <select data-field="catagory_id" onChange={updateProduct}>
                {catagories.map((catagory: Catagory) => (
                    <option key={catagory.id} value={catagory.id}>{catagory.name}</option>
                ))}
            </select>
            <input data-field="description" type="text" onChange={updateProduct} placeholder="description" />
            <input data-field="inventory" type="number" onChange={updateProduct} placeholder="inventory" />
            <input data-field="images" type="text" onChange={updateProduct} placeholder="images" />
            <button onClick={createProduct}>Create Product</button>
        </div>
    );
}