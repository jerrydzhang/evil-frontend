import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useAuth0, IdToken } from "@auth0/auth0-react";
import { ExpandedOrder } from '../common/types';
import Order from '../components/Order';

export function Profile() {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const backendUrl = process.env.REACT_APP_BACKEND_URL!;
    const [orders, setOrders] = useState<ExpandedOrder[]>([]);

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }

        Axios.get(`${backendUrl}/api/order/expand/user/${user!.sub}`, { withCredentials: true })
            .then((res) => {
                console.log(res);
                setOrders(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [isAuthenticated]);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (!isAuthenticated) {
        return <h1>Hello, please log in</h1>;
    }

    return (
        <div>
            <div>
                <h1>Hello {user!.name}</h1>
                <p>Email: {user!.email}</p>
                <p>User ID: {user!.sub!.split("|").pop()!.trim()}</p>
        </div>
            <div>
                <h2>Your Orders</h2>
                <div className="flex flex-col gap-5">
                {orders.map((order) => (
                    <Order order={order} />
                ))}
                </div>
            </div>
        </div>
    );
}