import React, { useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export function CheckoutCanceled() {
    const navigate = useNavigate();

    useEffect(() => {
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/checkout/cancel`, {},
        { withCredentials: true })
        .then((res) => {
            console.log(res);
            navigate("/cart", { replace: true });
        })
        .catch((err) => {
            console.log(err);        
        });
    }, []);

    return (
        <div>
        </div>
    );
}