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
}

export interface Order {
    id: number;
    user_id: string;
    products: JSON;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface ExpandedOrder {
    id: number;
    user_id: string;
    products: OrderItem[];
    status: string;
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