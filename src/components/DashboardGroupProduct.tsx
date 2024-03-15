import { Dispatch, SetStateAction } from "react";
import { Product } from "../common/types";
import DashboardProduct from "./DashboardProduct";


type DashboardGroupProductProps = {
    name: string;
    products: Product[];
    productsDict: {[key: string]: Product[]};
    setProductsDict: Dispatch<SetStateAction<{[key: string]: Product[]}>>;
};


export function DashboardGroupProduct({ name, products, productsDict, setProductsDict }: DashboardGroupProductProps) {
    
    return (
        <div key={name} className="bg-[--eerie-accent] my-4">
            <h1 className="text-2xl">{name}</h1>
            {Object.keys(productsDict[name]).map((variant_id: string) => (
                <DashboardProduct product={productsDict[name][parseInt(variant_id)]} productsDict={productsDict} setProductsDict={setProductsDict} key={variant_id}/>
            ))}
        </div>
    );
}