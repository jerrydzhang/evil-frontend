import Axios from "axios";
import React, { useState } from "react";
import { ExpandedOrder, Order, OrderItem, Product } from "../common/types";

export function Dashboard() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL!;
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<ExpandedOrder[]>([]);

    React.useEffect(() => {
        Axios.get(`${backendUrl}/api/product`)
            .then((res) => {
                console.log(res);
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        Axios.get(`${backendUrl}/api/order/expand`)
            .then((res) => {
                console.log(res);
                setOrders(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const updateInventory = (event: any) => {
        const productId = event.target.dataset.id;
        const inventory = parseInt(event.target.previousSibling.value);
        const product = products.find((product) => product.id === productId);

        if (!product) {
          return;
        }

        Axios.put(`${backendUrl}/api/product/update/${productId}`, {
            inventory: inventory
        },{ withCredentials: true })
        .then((res) => {
            console.log(res);
            setProducts(products.map((product) => {
                if (product.id === productId) {
                    product.inventory += inventory;
                }
                return product;
            }));
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const updateOrderStatus = (event: any) => {
        const orderId = event.target.dataset.id;
        const status = event.target.previousSibling.value;

        Axios.post(`${backendUrl}/api/order/update/${orderId}/status`, {
            status: status
        },
        { withCredentials: true })
        .then((res) => {
            console.log(res);
            setOrders(orders.map((order) => {
                if (order.id === orderId) {
                    order.status = status;
                }
                return order;
            }));
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <div className="flex">
                <div className="flex-1">
                {products.map((product: Product) => (
                    <div key={product.id}>
                        <a href={`/products/${product.id}`}>{product.name}</a>
                        <p>{product.inventory}</p>
                        <p>{product.category}</p>
                        <p>{product.price}</p>
                        <p>{product.description}</p>
                        <input type="number" data-id={product.id} />
                        <button data-id={product.id} onClick={updateInventory}>Update Inventory</button>
                    </div>
                ))}
                </div>
                <div className="flex-1">
                {orders.sort((a, b) => a.created_at > b.created_at ? 1 : -1)
                .filter((order: ExpandedOrder) => order.status !== "delievered" && order.status !== "returned")
                .map((order: ExpandedOrder) => (
                    <div className="pb-5" key={order.id}>
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
                        <button data-id={order.id} onClick={updateOrderStatus}>Update Status</button>                       
                    </div>
                ))}
                <h1>Delievered Orders</h1>
                {orders.sort((a, b) => a.created_at > b.created_at ? 1 : -1)
                .filter((order: ExpandedOrder) => order.status == "delievered")
                .map((order: ExpandedOrder) => (
                    <div className="pb-5" key={order.id}>
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
                        <button data-id={order.id} onClick={updateOrderStatus}>Update Status</button>                       
                    </div>
                ))}
                <h1>Returned Orders</h1>
                {orders.sort((a, b) => a.created_at > b.created_at ? 1 : -1)
                .filter((order: ExpandedOrder) => order.status == "returned")
                .map((order: ExpandedOrder) => (
                    <div className="pb-5" key={order.id}>
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
                        <button data-id={order.id} onClick={updateOrderStatus}>Update Status</button>                       
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}