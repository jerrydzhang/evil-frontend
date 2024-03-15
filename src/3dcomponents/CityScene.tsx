import { Stars, MeshReflectorMaterial, useTexture, Reflector } from "@react-three/drei";
import THREE, { DirectionalLight, DoubleSide } from "three";
import { OrthographicCamera } from "@react-three/drei";
import { Model, TowerLight } from "./loaders/CityLoader";
import MaterialShader from "./shaders/MaterialShader";
import { useRef } from "react";


const City = () => {
    
  const directionalLightRef = useRef<DirectionalLight>(null!);
  // useHelper(directionalLightRef, DirectionalLightHelper, 10, "hotpink");
  
  return (
      <>
        <directionalLight 
          ref={directionalLightRef}
          castShadow
          color={"#cddefa"}
          shadow-mapSize={[1024, 1024]}
          position={[-20,5,15]}
          intensity={0.3}
        >
          <OrthographicCamera attach={"shadow-camera"} args={[-10, 10, 10, -10, 0.5, 100]} />
        </directionalLight>
        <Model position={[0, 0, 0]} />
        <TowerLight position={[0, 0, 0]} />
      </>
    );
}

export function CityScene(props: JSX.IntrinsicElements["group"]) {
  return (
    <group {...props} dispose={null}>
      <Stars radius={200} speed={0.5} depth={2}/>
      {/* <fog attach="fog" args={['#212024', 50, 350]} /> */}
      <MaterialShader>
        <City/>
        <mesh position={[0, -5.02, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[400]} />
        <MeshReflectorMaterial
            blur={[300, 50]}
            resolution={1024}
            mixBlur={1}
            mixStrength={100}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#202020"
            metalness={0.8} 
            mirror={0}        
          />
        </mesh>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
            <sphereGeometry args={[50, 16, Math.round(16 / 4), 0, Math.PI * 1, 0, Math.PI * -1]} />
            <meshStandardMaterial
              color={"#161d22"}
              side={DoubleSide}
            />
          </mesh>
      </MaterialShader>
    </group>
  )
}