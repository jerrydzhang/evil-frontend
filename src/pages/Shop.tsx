import "./Shop.css";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Product, Size } from "../common/types";
import { NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { motion, useIsPresent } from "framer-motion";
import { PrivacyScreen } from "../components/PrivacyScreen";
import ShopProduct from "../components/ShopProduct";
import { Canvas } from "@react-three/fiber";
import { Mesh } from "three";

export function Shop({ products, setProducts, page, setPage }: { products: {[key: string]: Product[]}, setProducts: React.Dispatch<React.SetStateAction<{[key: string]: Product[]}>>, page: number, setPage: React.Dispatch<React.SetStateAction<number>>}) {
    const backendUrl = process.env.REACT_APP_BACKEND_URL!;
    const { user, isAuthenticated } = useAuth0();

    const location = useLocation();

    const [currentCategory, setCurrentCategory] = useState<string | null>(null);

    const mapProducts = (products: Product[]) => {
        return products.reduce(function(map: any, product: Product) {
            if (map[product.name]) {
                map[product.name][product.variant_id] = product;
                return map;
            }
            map[product.name] = {};
            map[product.name][product.variant_id] = product;
            return map;
        }, {});
    }

    useEffect(() => {
        if (currentCategory) {
            Axios.get(`${backendUrl}/api/product/active/category/${currentCategory}`)
            .then((res) => {
                console.log(res);
                const products = res.data as Product[];
                setProducts(mapProducts(products));
            })
            .catch((err) => {
                console.log(err);
            });

        } else {
            Axios.get(`${backendUrl}/api/product/active`)
            .then((res) => {
                console.log(res);
                const products = res.data as Product[];
                setProducts(mapProducts(products));
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [currentCategory]);

    const getCategory = (category: string) => {
        setPage(1);
        if (category === "all") {
            setCurrentCategory(null);
        } else {
            setCurrentCategory(category);
        }
    }

    const pageChangeHandler = (change: number) => {
        if (page + change <= 0 || page + change > Math.ceil(Object.keys(products).length / 6)){
            return;
        }

        setPage(page + change);
    }

    return (
        <div className="shop-background">
            <div className="flex flex-row flex-wrap mx-auto w-fit mt-4">
            {/* <h1>Shop</h1> */}
            {/* <div className={`category-selector ${currentCategory === null && 'active'} pointer-events-auto cursor-pointer h-fit w-auto whitespace-nowrap overflow-hidden py-2 px-6 text-ms text-center rounded-md`} onClick={() => getCategory("all")}>
            all
            </div>
            <div className={`category-selector ${currentCategory === "pants" && 'active'} pointer-events-auto cursor-pointer h-fit w-auto whitespace-nowrap overflow-hidden py-2 px-6 text-ms text-center rounded-md`} onClick={() => getCategory("pants")}>
            pants
            </div>
            <div className={`category-selector ${currentCategory === "t-shirt" && 'active'} pointer-events-auto cursor-pointer h-fit w-auto whitespace-nowrap overflow-hidden py-2 px-6 text-ms text-center rounded-md`} onClick={() => getCategory("t-shirt")}>
            t-shirt
            </div> */}
            <CategorySelector category="all" currentCategory={currentCategory} getCategory={getCategory} />
            <CategorySelector category="pants" currentCategory={currentCategory} getCategory={getCategory} />
            <CategorySelector category="t-shirt" currentCategory={currentCategory} getCategory={getCategory} />
            </div>
            <div className="flex flex-row items-center mx-auto w-fit mt-4 gap-2">
                {page > 1 ?
                <button onClick={() => pageChangeHandler(-1)}>
                <img src="/icons/left_arrow_icon.svg" className="size-7"></img></button>
                :<div className="size-7"></div>}
                <div className="pb-[1px]">{page}/{Math.ceil(Object.keys(products).length / 6)}</div>
                {page < Math.ceil(Object.keys(products).length / 6) ?
                <button onClick={() => pageChangeHandler(1)}>
                <img src="/icons/left_arrow_icon.svg" className="size-7 rotate-180"></img></button> 
                :<div className="size-7"></div>}
            </div>
            <PrivacyScreen />
        </div>
    );
}

function CategorySelector({ category, currentCategory, getCategory }: { category: string, currentCategory: string | null, getCategory: (category: string) => void }) {
    if (category === "all") {
        return (
            <div className={`category-selector ${currentCategory === null && 'active'} pointer-events-auto cursor-pointer h-fit w-auto whitespace-nowrap overflow-hidden py-2 px-6 text-ms text-center rounded-md`} onClick={() => getCategory("all")}>
                all
            </div>
        );
    }

    return (
        <div className={`category-selector ${currentCategory === category && 'active'} pointer-events-auto cursor-pointer h-fit w-auto whitespace-nowrap overflow-hidden py-2 px-6 text-ms text-center rounded-md`} onClick={() => getCategory(category)}>
            {category}
        </div>
    );
}