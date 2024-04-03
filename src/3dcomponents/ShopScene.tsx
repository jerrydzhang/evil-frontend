import { CameraControls, Html, OrthographicCamera, Stars } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { DoubleSide, Vector2, Vector3 } from "three";
import { MuseumScene } from "./loaders/MuseumLoader";
import { map } from "maath/dist/declarations/src/buffer";
import { MuseumMainModel } from "./loaders/MuseumMainLoader";
import Axios from "axios";
import { Product } from "../common/types";
import MaterialShader from "./shaders/MaterialShader";
import { queryByRole } from "@testing-library/react";

type ShopSceneProps = JSX.IntrinsicElements['group'] & {
    products: {[key: string]: Product[]};
    setProducts: Dispatch<SetStateAction<{[key: string]: Product[]}>>;
    page: number;
    cameraPosition: Vector3;
    setCameraPosition: Dispatch<SetStateAction<Vector3>>;
    cameraControlsRef: React.MutableRefObject<CameraControls>;
};
  
const ShopScene = ({ products, setProducts, page, cameraPosition, cameraControlsRef, setCameraPosition, ...props }: ShopSceneProps) => {    

	const [visibleProducts, setVisibleProducts] = useState<Product[][]>([[]]);

	const [tutorialStage, setTutorialStage] = useState<number>(parseInt(localStorage.getItem("tutorialStage") || "0"));
	const [hovered, setHovered] = useState(false);
	const [color, setColor] = useState("white");
    const [pointer, setPointer] = useState("#523979");
    const EPS = 1e-5;

	const sortSingleProduct = (product: Product[]) => {
		let productList = Object.values(product);
		productList.sort((a, b) => {
			const aDate = new Date(a.created_at);
			const bDate = new Date(b.created_at);
			return bDate.getTime() - aDate.getTime();
		});
		return productList;
	}

	useEffect(() => {
		const sortedProducts = Object.values(products).map((product) => sortSingleProduct(product));
		sortedProducts.sort((a, b) => {
			const aDate = new Date(a[0].created_at);
			const bDate = new Date(b[0].created_at);
			return bDate.getTime() - aDate.getTime();
		});
		setVisibleProducts(sortedProducts.slice((page - 1) * 6, page * 6));
	}, [page, products]);


    useEffect(() => {
        const storedCameraPosition = localStorage.getItem("cameraPosition");
        const storedCameraRotation = localStorage.getItem("cameraRotation");

		// const storedCameraPosition = false;
		// const storedCameraRotation = false;
        if (storedCameraPosition) {
            const parsed = JSON.parse(storedCameraPosition);
            setCameraPosition(new Vector3(parsed[0], parsed[1], parsed[2]));
        } else {
            setCameraPosition(new Vector3(-4.4, 1.6, 0));
        }

        if (storedCameraRotation && cameraControlsRef.current) {
            const parsed = JSON.parse(storedCameraRotation);
            cameraControlsRef.current?.rotateTo(parsed[0], parsed[1], false);
        } else {
			cameraControlsRef.current?.rotateTo(Math.PI/2, Math.PI/1.8, false);
		}
    }, [props.visible]);

    const moveCamera = (e: any) => { 
        if (!props.visible) return
        try {
            if (e.pointer.distanceTo(pointer) > 0.01) return;
            const heightOffset = 1.6;
            setCameraPosition(new Vector3(e.point.x, e.point.y + heightOffset, e.point.z));
            localStorage.setItem("cameraPosition", JSON.stringify([e.point.x, e.point.y + heightOffset, e.point.z]));
			if (tutorialStage === 1) setTutorialStage(2);
        } catch {
            // tslint:disable-next-line: no-console
        }
    }

    const handleMouseMove = (e: any) => {
        if (!props.visible) return;
        setPointer(e.pointer.clone());
    }

	const handleTutorial = (stage: number) => {
		switch (stage) {
			case 0:
				return (
					<>
					<div>
						Hello
					</div>
					<div>
						click the ball to progress through the tutorial
					</div>
					</>
				);
			case 1:
				return (
					<>
					<div>
						click and drag to look around
					</div>
					</>
				);
			case 2:
				return (
					<>
					<div>
						click on the floor to move
					</div>
					</>
				);
			case 3:
				return (
					<>
					<div className="text-center">
						hover over images to view details
					</div>
					</>
				);
			case 4:
				return (
					<>
					<div className="text-center">
						click on images to go to product page
					</div>
					</>
				);
			case 5:
				return (
					<>
					<div className="text-center" style={{opacity: hovered ? 1 : 0,}}>
						you're all set!
					</div>
					<div className="text-center" style={{opacity: hovered ? 1 : 0,}}>
						click the ball to restart the tutorial
					</div>
					</>
				);
			default:
				return (
					<div>
						Uh oh
					</div>
				);
		}
	}
	
	useEffect(() => {
		localStorage.setItem("tutorialStage", tutorialStage.toString());
	}, [tutorialStage]);

    return (
	
        <group {...props} dispose={null}>
			<MaterialShader>
			<group position={[-8, 2.5, 0]}
					onPointerUp={(e) => {
						e.stopPropagation();
						setTutorialStage(() => {if (tutorialStage < 5) return tutorialStage + 1; else return 0;});
					}}
					onPointerEnter={(e) => {
						e.stopPropagation();
						setHovered(true);
					}}	
					onPointerLeave={(e) => {
						e.stopPropagation();
						setHovered(false);
					}}
			>
				<Html position={[0, 0.35, 0]} center
					style={{ opacity: props.visible ? 1 : 0, width: "400px", height: "100px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}		
				>
				<div className="text-center">
				{handleTutorial(tutorialStage)}
				</div>
				</Html>
				<mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}
				>
					<sphereGeometry args={[0.2]} />
					<meshStandardMaterial color={"white"} emissive={hovered ? "#6a6ab4" : "#523979"} emissiveIntensity={0.55}visible={true}/>
				</mesh>
			</group>
            <MuseumScene position={[0,0,0]} visible={props.visible}
                products={visibleProducts}
                moveCamera={moveCamera}
                handleMouseMove={handleMouseMove}
            />
            {/* gallery light */}
            <pointLight position={[0, 10, 0]} intensity={5} />
            {/* far end light */}
            <pointLight position={[-117, 12, 0]} intensity={200} />
            {/* office light */}
            <pointLight position={[17.7,4,7.23479]} intensity={0.5} />
            {/* chair corner light */}
            <pointLight position={[22.248,3,-2.26092]} intensity={0.2} />
            {/* corner blocked off light */}
            <pointLight position={[14.0254,0,21.6838]} intensity={1} />
            {/* blocked off hole light */}
            <pointLight position={[13.6538,-2,23.4643]} intensity={0.1} />
            <ambientLight intensity={0.005} />
            {/* <mesh position={[22.248,3,-2.26092]} rotation={[-Math.PI / 2, 0, 0]}>
                <sphereGeometry args={[0.1]} />
                <meshBasicMaterial color={"grey"}/>
            </mesh> */}
            <Stars radius={200} depth={50} count={5000} factor={4} saturation={0} fade />
			</MaterialShader>
        </group>
    );
}

export default ShopScene;
