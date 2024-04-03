import Axios from "axios";
import React, { useMemo, useState } from "react";
import { ExpandedOrder, OrderItem, Product } from "../common/types";
import AdminOrder from "../components/AdminOrder";
import { DashboardGroupProduct } from "../components/DashboardGroupProduct";
import DashboardProduct from "../components/DashboardProduct";

export function Dashboard() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL!;
    const [orders, setOrders] = useState<ExpandedOrder[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<ExpandedOrder[]>([]);
    const [productsDict, setProductsDict] = useState<{[key: string]: Product[]}>({});
    const [filteredProducts, setFilteredProducts] = useState<{[key: string]: Product[]}>({});

    const [newProuctTitle, setNewProductTitle] = useState<string>();
    const [newProductDescription, setNewProductDescription] = useState<string>();
    const [newProductInventory, setNewProductInventory] = useState<number>();
    const [newProductPrice, setNewProductPrice] = useState<Number>();
    const [newProductVariants, setNewProductVariants] = useState<number>();
    const [newProductCategory, setNewProductCategroy] = useState<string>();
    const [newProductImage, setNewProductImage] = useState<string>();

	const [loading, setLoading] = useState(false);


    React.useEffect(() => {
        Axios.get(`${backendUrl}/api/product`)
            .then((res) => {
                const dict = res.data.reduce(function(map: any, product: Product) {
                    if (map[product.name]) {
                        map[product.name][product.variant_id] = product;
                        return map;
                    }
                    map[product.name] = {};
                    map[product.name][product.variant_id] = product;
                    return map;
                }, {});

                setProductsDict(dict);
                setFilteredProducts(dict);
            })
            .catch((err) => {
                console.log(err);
            });

        Axios.get(`${backendUrl}/api/order/expand`)
            .then((res) => {
                setOrders(res.data);
                setFilteredOrders(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const addProduct = () => {
		setLoading(true);
        for (let i = 0; i < newProductVariants!; i++) {
            Axios.post(`${backendUrl}/api/product/create`, {
                name: newProuctTitle,
                description: newProductDescription,
                inventory: newProductInventory,
                price: newProductPrice,
                variant_id: i,
                category: newProductCategory,
                image: newProductImage
            },
            { withCredentials: true })
            .then(() => {
				window.location.reload();
            })
            .catch
            ((err) => {
                console.log(err);
            })
			.finally(() => {
				setLoading(false);
			});
        }
    }


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

    const searchProducts = (event: any) => {
        event.preventDefault();
        const search = event.target.previousSibling.value;

        const keys = Object.keys(productsDict).filter((key) => {
            return key.includes(search);
        });

        const newDict: {[key: string]: Product[]} = {};
        keys.forEach((key) => {
            newDict[key] = productsDict[key];
        });

        setFilteredProducts(newDict);
    };


    const searchOrders = (event: any) => {
        event.preventDefault();
        const category = event.target.previousSibling.value;
        const search = event.target.previousSibling.previousSibling.value;
        if (category === "users") {
            setFilteredOrders(orders.filter((order) => {
                return order.user_id.includes(search);
            }));
        } else if (category === "orders") {
            setFilteredOrders(orders.filter((order) => {
                return order.id.includes(search);
            }));
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <div className="flex gap-5">
                <div className="flex flex-col">
                    <h1>Add Product</h1>
                    <form className="flex flex-col">
                        <input className="bg-[--eerie-black] border-2 border-white" type="text" placeholder="Title" onChange={(e) => setNewProductTitle(e.target.value)}/>
                        <textarea className="bg-[--eerie-black] border-2 border-white" placeholder="Description" onChange={(e) => setNewProductDescription(e.target.value)}/>
                        <input className="bg-[--eerie-black] border-2 border-white" type="number" placeholder="Inventory" onChange={(e) => setNewProductInventory(parseInt(e.target.value))}/>
                        <input className="bg-[--eerie-black] border-2 border-white" type="number" placeholder="Price" onChange={(e) => setNewProductPrice(parseFloat(e.target.value))}/>
                        <input className="bg-[--eerie-black] border-2 border-white" type="number" placeholder="Variants" onChange={(e) => setNewProductVariants(parseInt(e.target.value))}/>
                        <input className="bg-[--eerie-black] border-2 border-white" type="text" placeholder="Category" onChange={(e) => setNewProductCategroy(e.target.value)}/>
                        <img className="bg-[--eerie-black]" src={newProductImage} alt="No Image"/>
                        <input className="bg-[--eerie-black] border-2 border-white" type="text" placeholder="Image" onChange={(e) => setNewProductImage(e.target.value)}/>
						{!loading ?
                        <button className="btn" onClick={(e) => {
                            e.preventDefault();
                            addProduct();
                        }}>Add Product</button>
						:
						<button className="btn w-[92px] h-[42px] bg-[--slate-blue]"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></button>
						}	
                    </form>
                </div>
                <div className="flex-1">
                <form>
                    <input className="bg-[--eerie-black] border-2 border-white" type="text" />
                    <button onClick={searchProducts}>Search</button>
                </form>
                {Object.keys(filteredProducts).map((name: string) => (
					<DashboardGroupProduct name={name} products={filteredProducts[name]} productsDict={productsDict} setProductsDict={setProductsDict} key={name}/>
                ))}
                </div>
                <div className="flex-1">
                <form>
                    <input className="bg-[--eerie-black] border-2 border-white" type="text" />
                    <select className="bg-[--eerie-black]">
                        <option value="orders">orders</option>
                        <option value="users">users</option>
                    </select>
                    <button onClick={searchOrders}>Search</button>
                </form>
                <h1 className="text-xl">Processing Orders</h1>
                {filteredOrders.sort((a, b) => a.created_at > b.created_at ? 1 : -1)
                .filter((order: ExpandedOrder) => order.status !== "delievered" && order.status !== "returned")
                .map((order: ExpandedOrder) => (
                <AdminOrder order={order} updateOrderStatus={updateOrderStatus} key={order.id}/>
                ))}
				<hr/>
                <h1 className="text-xl">Delievered Orders</h1>
                {filteredOrders.sort((a, b) => a.created_at > b.created_at ? 1 : -1)
                .filter((order: ExpandedOrder) => order.status == "delievered")
                .map((order: ExpandedOrder) => (
                    <AdminOrder order={order} updateOrderStatus={updateOrderStatus} key={order.id}/>
                ))}
				<hr/>
                <h1 className="text-xl">Returned Orders</h1>
                {filteredOrders.sort((a, b) => a.created_at > b.created_at ? 1 : -1)
                .filter((order: ExpandedOrder) => order.status == "returned")
                .map((order: ExpandedOrder) => (
                    <AdminOrder order={order} updateOrderStatus={updateOrderStatus} key={order.id}/>
                ))}
                </div>
            </div>
        </div>
    );
}
