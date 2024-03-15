import React from "react";
import { useNavigate } from "react-router-dom";

type CheckoutApprovedProps = {
    setCart: React.Dispatch<React.SetStateAction<{[key: string]: number}>>;
}

export function CheckoutApproved({setCart}: CheckoutApprovedProps) {
    const navigate = useNavigate();
    
    React.useEffect(() => {
        setCart({});
        navigate("/", { replace: true });
    }, []);  

    return (
        <div>
        </div>
    );
}