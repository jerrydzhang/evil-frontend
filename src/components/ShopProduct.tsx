import { NavLink } from "react-router-dom";
import { Product, Size } from "../common/types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const itemVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5
        }
    }
}

const ShopProduct = (props: any) => {
    const products: {[key:number]: Product}  = props.products;
    const addToCart = props.addToCart;  

    const [size, setSize] = useState<Size>(products[parseInt(Object.keys(products)[0])].variant_id);
    const [image, setImage] = useState<string>(products[parseInt(Object.keys(products)[0])].images[0]);
    const [transitionImg, setTransitionImg] = useState<string>(products[parseInt(Object.keys(products)[0])].images[0]);
    const [transition, setTransition] = useState<boolean>(false);
    const [hovered, setHovered] = useState<boolean>(false);

    const setSizeHandler = (size: Size) => {
        if (products[size?.valueOf()]){
            setTransitionImg(products[size?.valueOf()].images[0]);
            setSize(size);
            setTransition(true);
            setTimeout(() => {
                setImage(products[size?.valueOf()].images[0]);
                setTransition(false);
            }, 200);
        }
    }

    return (
        <div className="product-pane">
            <motion.div className="img-container size-full relative"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className="product-screen"/>
                <img className="size-full object-cover self-center rounded-xl" src={image} />
                <img className={`trans-image ${transition && "transition"} absolute size-full top-0 object-cover self-center rounded-t-xl`} src={transitionImg} />
                <motion.div className="product-element-container absolute w-full flex flex-col items-center bottom-0"
                    initial={false}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.07
                            }
                        },
                    }}
                    animate={hovered ? "visible" : "hidden"}
                >
                    <motion.p className="product-element" variants={itemVariants}>{products[size?.valueOf()].inventory}</motion.p>
                    <motion.p className="product-element" variants={itemVariants}>Size</motion.p>
                    <motion.div className="product-element flex" variants={itemVariants}>
                        <div className={`product-sizing ${!products[Size.S] && 'unavailable'} ${size === Size.S && 'active'}`} onClick={() => setSizeHandler(Size.S)}>S</div>
                        <div className={`product-sizing ${!products[Size.M] && 'unavailable'} ${size === Size.M && 'active'}`} onClick={() => setSizeHandler(Size.M)}>M</div>
                        <div className={`product-sizing ${!products[Size.L] && 'unavailable'} ${size === Size.L && 'active'}`} onClick={() => setSizeHandler(Size.L)}>L</div>
                        <div className={`product-sizing ${!products[Size.XL] && 'unavailable'} ${size === Size.XL && 'active'}`} onClick={() => setSizeHandler(Size.XL)}>XL</div>
                    </motion.div>
                    <motion.button className="product-element self-center h-10" data-id={products[size?.valueOf()].id} onClick={addToCart} variants={itemVariants}>Add To Cart</motion.button>
                </motion.div>
            </motion.div>
            <div className="flex flex-col w-full justify-center p-2">
                <NavLink className={"text-4xl decoration-transparent"} to={`/product/${products[size?.valueOf()].name}`} state={{size: size}}>{products[size?.valueOf()].name}</NavLink>
                <p className="text-l">${products[size?.valueOf()].price}</p>
            </div>
        </div> 
    );
};  

export default ShopProduct;