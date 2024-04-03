import React from "react";
import Axios from "axios";
import { OrderItem, Size } from "../common/types"
import { NavLink } from "react-router-dom";

const AdminOrder = (props: any) => {
    const { order, updateOrderStatus } = props;
    const [expanded, setExpanded] = React.useState(false);
    return (
    <div className="pb-5">
        <button className="btn" onClick={() => setExpanded(expanded => !expanded)}>{expanded? "Collapse":"Expand"}</button>
        <NavLink to={`/dashboard/${order.id}`}>{order.id}</NavLink>
        <p>{order.user_id}</p>
        {expanded && order.products.map((product: OrderItem) => (
            <div className="pl-5">
                <p>{product.product.id}</p>
                <p>{product.product.name}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Variant: {Size[product.product.variant_id]}</p>
            </div>
        ))}
        <p>{order.status}</p>
        <p>Name: {order.name}</p>
        <p>{order.address.replace(/, ,/g, ",")}</p>
        <p>updated: {new Date(order.updated_at).toLocaleDateString() + " " + new Date(order.updated_at).toLocaleTimeString()}</p>
        <p>created: {new Date(order.created_at).toLocaleDateString() + " " + new Date(order.created_at).toLocaleTimeString()}</p>
        {updateOrderStatus && (
        <>
        <select defaultValue={order.status}>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delievered">Delievered</option>
            <option value="canceled">Canceled</option>
            <option value="returned">Returned</option>
        </select>
        <button data-id={order.id} onClick={updateOrderStatus}>Update Status</button> 
        </>
        )}                      
    </div>
    )    
}

export default AdminOrder;
