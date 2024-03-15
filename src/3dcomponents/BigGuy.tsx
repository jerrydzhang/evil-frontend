import { forwardRef } from "react"
import { BigGuyModel } from "./loaders/BigGuyLoader"


const BigGuy = forwardRef((props: JSX.IntrinsicElements["group"], ref: any) => {
    return (
        <group {...props} dispose={null}>
            <mesh receiveShadow castShadow position={[0,0,0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[200,100]} />
                <meshBasicMaterial color={"black"} />
            </mesh>
            <BigGuyModel raysref={ref} scale={30} rotation={[Math.PI/18,-Math.PI/1.3,0]} position={[50,-17,-40]}/>
        </group>
    )
})

export { BigGuy }