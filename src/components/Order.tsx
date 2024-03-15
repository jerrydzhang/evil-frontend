import React from "react";
import Axios from "axios";
import { ExpandedOrder, OrderItem, Size } from "../common/types"
import { motion } from "framer-motion";
import exp from "constants";
import { NavLink } from "react-router-dom";

const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
}

type OrderProps = {
    order: ExpandedOrder;
}

const Order = ({ order }: OrderProps) => {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <div className="flex flex-col w-fit p-5 rounded-sm bg-[var(--eerie-accent)] transition-all">
            <NavLink className="text-lg" to={`/dashboard/${order.id}`}>Order ID: {order.id.substring(6)}</NavLink>
            <div className="flex flex-row items-center">
            <div className="size-8">
            <input type="checkbox" id={order.id} className="hidden" onChange={() => setExpanded(expanded => !expanded)}/>
            <label htmlFor={order.id} className="cursor-pointer flex flex-row items-center">
                <img src="/icons/arrow-left-no.svg" alt="expand" className={`size-8 transition-all duration-300 ${expanded ? "rotate-[270deg]" : "rotate-180"}`} />
                <p
                className="whitespace-nowrap"
            >Products: {order.products.reduce((acc: number, product: OrderItem) => acc + product.quantity, 0)}</p>
            </label>
            </div>
            </div>
            <motion.div className="overflow-hidden"
                initial={{ height: 0 }}
                animate={expanded ? { height: "auto"} : { height: 0 }}
                transition={{ duration: 0.2 }}
            >
                {order.products.map((product: OrderItem) => (
                    <div className="pl-5 mb-3"
                        key={product.product.id}
                    >
                        <p>{product.product.name}</p>
                        <div className="">
                        <img className="size-32" src={product.product.images[0]} alt={product.product.name} />
                        <p>Quantity: {product.quantity}</p>
                        <p>Size: {Size[product.product.variant_id]}</p>
                        </div>
                    </div>
                ))}
            </motion.div>
            <p>Name: {order.name}</p>
            <p>Address: {order.address.replace(/, ,/g, ",")}</p>
            <p>Status: {order.status}</p>
            <p>Last Updated: {new Date(order.updated_at).toLocaleDateString()}</p>
            <p>Placed: {new Date(order.created_at).toLocaleDateString()}</p>     
        </div>
        )
}

export default Order;