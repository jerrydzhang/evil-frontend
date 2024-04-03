import { BakeShadows, Box, MeshReflectorMaterial, OrbitControls, OrthographicCamera, Stars, useGLTF, useHelper, Stats, SpotLight, Html, MeshPortalMaterial, Environment, PerformanceMonitor, FirstPersonControls, CameraControls, Lightformer, Loader } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import { Model, TowerLight } from "./loaders/CityLoader";
import { Dispatch, SetStateAction, Suspense, useEffect, useMemo, useRef, useState } from "react";
import THREE, { AmbientLight, Camera, DirectionalLight, DirectionalLightHelper, DoubleSide, Euler, FrontSide, Group, Mesh, Object3D, PerspectiveCamera, Vector2, Vector3 } from "three";
import { Autofocus, Bloom, ChromaticAberration, EffectComposer, GodRays, Noise, Outline, ToneMapping } from "@react-three/postprocessing";
import { easing, vector3 } from 'maath'
import { ThreeDLoading } from "./3dLoadingScreen";
import { BlendFunction, EffectPass, KernelSize, ToneMappingMode } from "postprocessing";
import { lerp } from "three/src/math/MathUtils";
import MaterialShader from "./shaders/MaterialShader";
import { MyCustomEffect } from "./shaders/ScreenShader";
import { Navigate, Route, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { CityScene } from "./CityScene";
import { BigGuy } from "./BigGuy";
import ShopScene from "./ShopScene";
import OrbitRig from './rigs/OrbitRig';
import MovingRig from "./rigs/MovingRig";
import { Product } from "../common/types";


export function ThreeDComponent (props: {
  home: boolean; 
  setHome: Dispatch<SetStateAction<boolean>>; 
  focused: boolean; 
  setFocused: Dispatch<SetStateAction<boolean>>; 
  focus: Vector3; 
  setFocus: Dispatch<SetStateAction<Vector3>>; 
  radius: number; 
  setRadius: Dispatch<SetStateAction<number>>; 
  cameraPosition: Vector3; 
  setCameraPosition: Dispatch<SetStateAction<Vector3>>;
  products: {[key: string]: Product[]};
  setProducts: Dispatch<SetStateAction<{[key: string]: Product[]}>>;
  page: number;
}) {
  const location = useLocation();
  const path = useMemo(() => location.pathname, [location]);

  const sun = useRef(null!);
  const cameraControlsRef = useRef(null!);

  const [dpr, setDpr] = useState(1);

  const EPS = 1e-5;

  return(
    <div className="fixed size-full -z-10 top-0">
    <Canvas
        shadows
        camera={{ position: new Vector3(EPS,EPS,EPS), aspect: window.innerWidth / window.innerHeight, near: 0.1, far: 1000}}
        dpr={dpr}
      >
        <Suspense fallback={null}>
        {/* <VisbilityHandler path={path}/> */}
        {/* <fog attach="fog" args={["#707070", 0, 50]} /> */}
        {/* <color attach="background" args={["black"]} /> */}
        <CityScene visible={path === "/"} position={[0,0,0]}/>
        <ShopScene visible={path.includes("/product")} position={[0,0,0]} products={props.products} setProducts={props.setProducts} page={props.page} cameraPosition={props.cameraPosition} setCameraPosition={props.setCameraPosition} cameraControlsRef={cameraControlsRef}/>
        <BigGuy visible={path === "/about"} position={[0,0,0]} ref={sun}/>
        {/* <mesh position={[30,30,-30]} ref={sun}>
          <circleGeometry args={[10]} />
          <meshBasicMaterial
            color={"#ffffff"}
          />
        </mesh> */}
        {/* <Stars radius={200} speed={0.5} depth={2}/> */}
        {(path === "/" ||
        path === "/about")
        && (
        <OrbitRig 
          focused={props.focused}
          setFocused={props.setFocused}
          focus={props.focus}
          setFocus={props.setFocus}
          radius={props.radius}
          setRadius={props.setRadius}
        />
        )}
        {path.includes("/product") && (
        <>
        <MovingRig
          focused={props.focused}
          setFocused={props.setFocused}
          focus={props.focus}
          setFocus={props.setFocus}
          radius={props.radius}
          setRadius={props.setRadius}
          position={props.cameraPosition}
          setPosition={props.setCameraPosition}
          cameraPosition={props.cameraPosition}
          setCameraPosition={props.setCameraPosition}
          cameraControlsRef={cameraControlsRef}
        />
        <CameraControls 
          ref={cameraControlsRef}
          minDistance={1}
          maxDistance={1}
          truckSpeed={10}
          azimuthRotateSpeed={-0.3}
          polarRotateSpeed={-0.3}
        />
        </>
        )}
        <EffectComposer>
          <MyCustomEffect 
            intensity={1} 
            glowColor={[105, 255, 212].map((value) => value / 255)} 
          />
            {/* [76, 36, 74].map((value) => value / 255) */}
          <Bloom 
            intensity={1}
            kernelSize={KernelSize.SMALL}
            luminanceThreshold={0.5} 
            luminanceSmoothing={1} 
            height={300}
          />
          <Noise
            premultiply // enables or disables noise premultiplication
            blendFunction={BlendFunction.ADD} // blend mode
          />
          <ToneMapping mode={ToneMappingMode.REINHARD2_ADAPTIVE} />
          {/* <ChromaticAberration
            offset={new Vector2(0.002, 0.002)} // offset for RGB channels
            radialModulation={false} 
            modulationOffset={0}
          /> */}
          {(sun.current && path==="/contact") && (
          <GodRays
            sun={sun.current}
            blendFunction={BlendFunction.SCREEN}
            samples={30}
            density={0.96}
            decay={0.10}
            weight={0.6}
            exposure={0.4}
            clampMax={1}
            kernelSize={KernelSize.SMALL}
            blur={true}
          />
          )}
        </EffectComposer>
        <Stats/>
        <BakeShadows />
        <PerformanceMonitor onIncline={() => setDpr(1.5)} onDecline={() => setDpr(1)} />
        </Suspense>
      </Canvas>
	  <Loader
		containerStyles={{ backgroundColor: "var(--eerie-black)", color: "var(--eerie-black)"}}
	  />
      </div>
  )
}
