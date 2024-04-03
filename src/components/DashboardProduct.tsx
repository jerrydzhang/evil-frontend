import { Dispatch, SetStateAction, useState } from "react";
import { Product } from "../common/types";
import Axios from "axios";

type DashboardProductProps = {
    product: Product;
    productsDict: {[key: string]: Product[]};
    setProductsDict: Dispatch<SetStateAction<{[key: string]: Product[]}>>;
};

const DashboardProduct = (
    { product, productsDict, setProductsDict }: DashboardProductProps
) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL!;

    const [editing, setEditing] = useState<boolean>(false);

    const [title, setTitle] = useState<string>(product.name);
    const [description, setDescription] = useState<string>(product.description);
    const [inventoryChange, setInventoryChange] = useState<number>(product.inventory);
    const [active, setActive] = useState<boolean>(product.active);

    const [images, setImages] = useState<string[]>(product.images);
    const [draggedImage, setDraggedImage] = useState<string>("");

	const [loading, setLoading] = useState(false);

    const dragStart = (event: any) => {
        setDraggedImage(event.target.src);
    }

    const dragOver = (event: any) => {
        event.preventDefault();
    }

    const dragDrop = (event: any) => {
        const newImages = images.filter((image) => image !== draggedImage);
        newImages.splice(event.target.dataset.index, 0, draggedImage);
        setImages(newImages);
    }

    const updateProduct = (event: any) => {
        const productId = event.target.dataset.id;

        if (!product) {
          return;
        }
		setLoading(true);

        Axios.put(`${backendUrl}/api/product/update/${productId}`, {
            name: title,
            inventory: inventoryChange||0,
            description: description,
            images: images,
            is_active: active
        },{ withCredentials: true })
        .then((res) => {
            setProductsDict((productsDict) => {
                const newProductsDict = {...productsDict};
                newProductsDict[product.name][product.variant_id].inventory += inventoryChange ? inventoryChange : 0;
                return newProductsDict;
            });
            // productsDict[product.name][product.variant_id].inventory += inventory ? inventory : 0;
            // setProducts(products.map((product) => {
            //     if (product.id === productId) {
            //         product.inventory += inventory ? inventory : 0;
            //     }
            //     return product;
            // }));
        })
        .catch((err) => {
            console.log(err);
        })
		.finally(() => {
			setLoading(false);
		});
    };

    const addImage = (event: any) => {
        const image = event.target.previousSibling.value;
        setImages([...images, image]);
    };

    const removeImage = (event: any) => {
        const image = event.target.previousSibling.src;
        setImages(images.filter((img) => img !== image));
    };

    if (editing) {
        return (
            <div key={product.id}>
            <div className="flex">
            <input className=" bg-[--eerie-black]" type="text" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={() => setEditing(editing => !editing)}>Edit</button>
            </div>
            <div className="flex">
                {images.map((image: string) => (
                    <div key={image} className="flex flex-col w-24">
                    <img className="size-24" src={image} alt={product.name}
                    draggable="true" onDragStart={dragStart} onDragOver={dragOver} onDrop={dragDrop} 
                    />
                    <button data-id={product.id} onClick={removeImage}>X</button>
                    </div>
                ))}
                <input type="text" />
                <button data-id={product.id} onClick={addImage}>Add Image</button>
            </div>
            <p>variant id: {product.variant_id}</p>
            <p>inventory: {product.inventory}</p>
            <p>{product.category}</p>
            <p>${product.price}</p>
            <textarea className=" bg-[--eerie-black]" defaultValue={description} onChange={(e) => setDescription(e.target.value)} />
            <input className="bg-[--eerie-black]" type="number" data-id={product.id} onChange={(e) => setInventoryChange(parseInt(e.target.value))} />
            <input type="checkbox" defaultChecked={product.active} onChange={() => setActive(active => !active)} />
            <button data-id={product.id} onClick={updateProduct}>Update</button>
            </div>
        );
    }

    return (
        <div className="py-2" key={product.id}>
        <div>
        <a href={`/products/${product.id}`}>{product.name}</a>
        <button onClick={() => setEditing(editing => !editing)}>Edit</button>
        </div>
        {/* <div className="flex">
            {images.map((image: string) => (
                <div key={image} className="flex flex-col w-24">
                <img className="size-24" src={image} alt={product.name}
                draggable="true" onDragStart={dragStart} onDragOver={dragOver} onDrop={dragDrop} 
                />
                <button data-id={product.id} onClick={removeImage}>X</button>
                </div>
            ))}
            <input type="text" />
            <button data-id={product.id} onClick={addImage}>Add Image</button>
        </div> */}
        <div className="flex">
            {images.map((image: string, index: number) => (
                <div key={image} className="flex flex-col w-24">
                <img className="size-24" src={image} alt={product.name}/>
                </div>
            ))}
        </div>
        <p>variant id: {product.variant_id}</p>
        <p>inventory: {product.inventory}</p>
        <p>{product.category}</p>
        <p>${product.price}</p>
        <p>{product.description}</p>
        <input className="bg-[--eerie-black]" type="number" data-id={product.id} onChange={(e) => setInventoryChange(parseInt(e.target.value))} />
        <input type="checkbox" defaultChecked={product.active} onChange={() => setActive(active => !active)} />
		{
		!loading ?
        <button className="btn" data-id={product.id} onClick={updateProduct}>Update</button>
		:
		<button className="btn w-[92px] h-[42px] bg-[--slate-blue]"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></button>
		}
        </div>
);
}

export default DashboardProduct;
