import { Product } from "../../common/types";
import "./ShirtSizing.css";

interface ShirtSizingProps {
	products: Product[];
	variant: number;
	setVariant: React.Dispatch<React.SetStateAction<number>>;
}

export function ShirtSizing({ products, variant, setVariant }: ShirtSizingProps) {
		
	return (
		<>
		<button className={`size-button ${!products.some((product: Product) => product.variant_id === 0 && product.inventory > 0) && 'unavailable'} ${variant === 0 && 'active'}`} onClick={() => setVariant(0)}>S</button>
		<button className={`size-button ${!products.some((product: Product) => product.variant_id === 1 && product.inventory > 0) && 'unavailable'} ${variant === 1 && 'active'}`} onClick={() => setVariant(1)}>M</button>
		<button className={`size-button ${!products.some((product: Product) => product.variant_id === 2 && product.inventory >0) && 'unavailable'} ${variant === 2 && 'active'}`} onClick={() => setVariant(2)}>L</button>
		<button className={`size-button ${!products.some((product: Product) => product.variant_id === 3 && product.inventory > 0) && 'unavailable'} ${variant === 3 && 'active'}`} onClick={() => setVariant(3)}>XL</button>
		</>
	);
}
