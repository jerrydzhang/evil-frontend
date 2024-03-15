export interface User {
    id: string;
    email: string;
    roles: string[];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    inventory: number;
    last_updated: string;
    created_at: string;
    images: string[];
    active: boolean;
    variant_id: number;
}

export interface Order {
    id: string;
    user_id: string;
    products: JSON;
    status: string;
    name: string;
    address: string;
    created_at: string;
    updated_at: string;
}

export interface ExpandedOrder {
    id: string;
    user_id: string;
    products: OrderItem[];
    status: string;
    name: string;
    address: string;
    created_at: string;
    updated_at: string;
}

export interface OrderItem {
    product: Product;
    quantity: number;
}

export interface CartItem {
    id: number;
    user_id: string;
    product_id: number;
    quantity: number;
}

export enum Size {
    S = 0,
    M = 1,
    L = 2,
    XL = 3
}