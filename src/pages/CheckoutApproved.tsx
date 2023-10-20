import React from "react";
import { useNavigate } from "react-router-dom";

export function CheckoutApproved() {
    const navigate = useNavigate();
    
    React.useEffect(() => {
        localStorage.removeItem("cart");
        navigate("/", { replace: true });
    }, []);  

    return (
        <div>
        </div>
    );
}