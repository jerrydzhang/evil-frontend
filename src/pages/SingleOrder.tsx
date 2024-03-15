import React from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { ExpandedOrder, OrderItem } from '../common/types';

export function SingleOrder() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL!;
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = React.useState<ExpandedOrder>();

    React.useEffect(() => {
        // get product from backend
        Axios.get(`${backendUrl}/api/order/id/${id}`)
        .then((res) => {
            console.log(res);
            setOrder(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);
    
    return (
        <div>
            {!(order) ? (
                <div>Loading...</div>
            ): (
            <div className="pb-5">
                <p>{order.id}</p>
                <p>{order.user_id}</p>
                {order.products.map((product: OrderItem) => (
                    <div>
                        <p>{product.product.id}</p>
                        <p>{product.product.name}</p>
                        <p>Quantity: {product.quantity}</p>
                    </div>
                ))}
                <p>{order.status}</p>
                <p>{order.updated_at}</p>
                <p>{order.created_at}</p>
                <select defaultValue={order.status}>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delievered">Delievered</option>
                    <option value="canceled">Canceled</option>
                    <option value="returned">Returned</option>
                </select>
            </div>
            )}
        </div>
    );
}