import { CameraControls, OrthographicCamera, Stars } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { DoubleSide, Vector2, Vector3 } from "three";
import { MuseumScene } from "./loaders/MuseumLoader";
import { map } from "maath/dist/declarations/src/buffer";
import { MuseumMainModel } from "./loaders/MuseumMainLoader";
import Axios from "axios";
import { Product } from "../common/types";

type ShopSceneProps = JSX.IntrinsicElements['group'] & {
    products: {[key: string]: Product[]};
    setProducts: Dispatch<SetStateAction<{[key: string]: Product[]}>>;
    page: number;
    cameraPosition: Vector3;
    setCameraPosition: Dispatch<SetStateAction<Vector3>>;
    cameraControlsRef: React.MutableRefObject<CameraControls>;
};
  
const ShopScene = ({ products, setProducts, page, cameraPosition, cameraControlsRef, setCameraPosition, ...props }: ShopSceneProps) => {    

    const backendUrl = process.env.REACT_APP_BACKEND_URL!;


    const [pointer, setPointer] = useState();
    const EPS = 1e-5;

    useEffect(() => {
        const storedCameraPosition = localStorage.getItem("cameraPosition");
        const storedCameraRotation = localStorage.getItem("cameraRotation");
        if (storedCameraPosition) {
            const parsed = JSON.parse(storedCameraPosition);
            setCameraPosition(new Vector3(parsed[0], parsed[1], parsed[2]));
        } else {
            setCameraPosition(new Vector3(0, 1.6, 0));
        }

        if (storedCameraRotation && cameraControlsRef.current) {
            const parsed = JSON.parse(storedCameraRotation);
            cameraControlsRef.current?.rotateTo(parsed[0], parsed[1], false);
        }
    }, [props.visible]);

    const moveCamera = (e: any) => { 
        if (!props.visible) return;
        try {
            if (e.pointer.distanceTo(pointer) > 0.01) return;
            const heightOffset = 1.6;
            setCameraPosition(new Vector3(e.point.x, e.point.y + heightOffset, e.point.z));
            localStorage.setItem("cameraPosition", JSON.stringify([e.point.x, e.point.y + heightOffset, e.point.z]));
        } catch {
            // tslint:disable-next-line: no-console
        }
    }

    const handleMouseMove = (e: any) => {
        if (!props.visible) return;
        setPointer(e.pointer.clone());
    }

    return (
        <group {...props} dispose={null}>
            {/* <mesh position={[0,0,0]} rotation={[-Math.PI / 2, 0, 0]}
                onPointerDown={(e) => {
                    e.stopPropagation();
                    handleMouseMove(e);
                }}
                onPointerUp={(e) => {
                    e.stopPropagation();
                    moveCamera(e);
                }}
            >
                <planeGeometry args={[200,200]} />
                <meshBasicMaterial color={"grey"} visible={false}/>
            </mesh> */}
            <MuseumScene position={[0,0,0]} visible={props.visible}
                products={Object.fromEntries(Object.entries(products).slice((page - 1) * 6, page * 6))}
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
        </group>
    );
}

export default ShopScene;