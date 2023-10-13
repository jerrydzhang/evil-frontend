export interface User {
    id: string;
    email: string;
    roles: string[];
}

export interface Product {
    id: number;
    name: string;
    description: string;
    catagory_id: number;
    catagory: string;
    price: number;
    inventory: number;
    last_updated: string;
}

export interface Catagory {
    id: number;
    name: string;
}

export interface CartItem {
    id: number;
    user_id: string;
    product_id: number;
    quantity: number;
}

