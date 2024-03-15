import { useEffect, useState } from "react";
import { Product, Size } from "../common/types";
import { useNavigate } from "react-router-dom";
import "../pages/Cart.css";

type CartItemProps = {
    product: Product;
    quantity: number;
    quantityChanger: (e: any) => void;
    removeFromCart: (e: any) => void;
}

export function CartItemPanel({product, quantity, quantityChanger, removeFromCart}: CartItemProps) {
    const navigate = useNavigate();

    return (
        <div key={`${product.id}${quantity}`} className="cart-item-container m-2 p-4 bg-[--eerie-accent] rounded-lg flex items-center gap-10">
            <img className="size-24" src={product.images[0]} />
            <div className="flex flex-col">
            <div>
            <button className="text-xl" onClick={()=>navigate(`/product/${product.name}`)}>{product.name}</button>
            <p className="text-sm">{Size[product.variant_id]}</p>
            <div className="flex gap-2">
            <p className="text-sm">${(product.price*quantity).toFixed(2)}</p>
            <p className="text-sm text-gray-500">(${(product.price)} x {quantity})</p>
            </div>
            </div>
            <form className="flex gap-1">
                <label className="text-sm" htmlFor="quantity">Quantity:</label>
                <input className="text-sm h-auto w-16 px-2 bg-[--eerie-black] rounded-full" type="number" defaultValue={quantity} />
                <button className="text-sm" data-id={product.id} onClick={quantityChanger}>Change</button>
            </form>
            </div>
            <button className=" self-start ml-auto" data-id={product.id} onClick={removeFromCart}>
                <img className="size-6" src="/icons/cross.svg" />
            </button>
        </div>
    );
}