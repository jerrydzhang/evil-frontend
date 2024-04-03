import React from "react";
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
	
	const [collapsed, setCollapsed] = React.useState<boolean>(false);

    return (
        <div key={name} className="bg-[--eerie-accent] my-4">
            <button className="text-2xl p-2" onClick={() => setCollapsed(() => !collapsed)}>{name}</button>
			{collapsed &&
			<>
            {Object.keys(productsDict[name]).map((variant_id: string) => (
                <DashboardProduct product={productsDict[name][parseInt(variant_id)]} productsDict={productsDict} setProductsDict={setProductsDict} key={variant_id}/>
            ))}
			</>}
        </div>
    );
}
