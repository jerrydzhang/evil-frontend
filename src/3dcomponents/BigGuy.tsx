import { Html } from "@react-three/drei"
import { forwardRef } from "react"
import { BigGuyModel } from "./loaders/BigGuyLoader"


const BigGuy = forwardRef((props: JSX.IntrinsicElements["group"], ref: any) => {
    return (
        <group {...props} dispose={null}>
            <mesh receiveShadow castShadow position={[0,0,0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[200,100]} />
                <meshBasicMaterial color={"black"} />
            </mesh>
			  <Html position={[70,80,-10]} center
				style={{opacity: props.visible ? 1 : 0, width: "100%", height: "100%"}}
			  >
				<h1 className="text-5xl">About</h1>
				<p className="text-2xl">We Make Things</p>
			  </Html>
            <BigGuyModel raysref={ref} scale={30} rotation={[Math.PI/18,-Math.PI/1.3,0]} position={[50,-17,-40]}/>
        </group>
    )
})

export { BigGuy }
