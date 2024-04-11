/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, Image, useTexture, Html, Billboard } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import axios from "axios";
import { text } from "stream/consumers";
import { Product, Size } from "../../common/types";
import { NavLink, useNavigate } from "react-router-dom";
import { map } from "maath/dist/declarations/src/buffer";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

type MuseumLoaderProps = JSX.IntrinsicElements['group'] & {
  products: Product[][];
  moveCamera: (e: any) => void;
  handleMouseMove: (e: any) => void;
};

type GLTFResult = GLTF & {
  nodes: {
    Crashed_Tin_Can: THREE.Mesh;
    rail002: THREE.Mesh;
    walltrim001: THREE.Mesh;
    walltrim002: THREE.Mesh;
    rail001: THREE.Mesh;
    gallery_light: THREE.Mesh;
    gallery_roof: THREE.Mesh;
    Cylinder: THREE.Mesh;
    Cylinder001: THREE.Mesh;
    ground001: THREE.Mesh;
    plant001: THREE.Mesh;
    pot001: THREE.Mesh;
    Picture_Frame1: THREE.Mesh;
    Picture1: THREE.Mesh;
    Picture_Frame002: THREE.Mesh;
    Picture002: THREE.Mesh;
    Picture_Frame003: THREE.Mesh;
    Picture003: THREE.Mesh;
    Picture_Frame004: THREE.Mesh;
    Picture004: THREE.Mesh;
    Picture_Frame005: THREE.Mesh;
    Picture005: THREE.Mesh;
    Picture_Frame006: THREE.Mesh;
    Picture006: THREE.Mesh;
    Cube001: THREE.Mesh;
    Cube009: THREE.Mesh;
    Cube009_1: THREE.Mesh;
    Cube009_2: THREE.Mesh;
    Desk_1: THREE.Mesh;
    Desk_2: THREE.Mesh;
    stairwell: THREE.Mesh;
    Drain_Photoscanned: THREE.Mesh;
    ["Stairs_(Photoscanned)"]: THREE.Mesh;
    PLANK_1: THREE.Mesh;
    PLANK_2: THREE.Mesh;
    PLANK_3: THREE.Mesh;
    SchoolChair_01: THREE.Mesh;
    BezierCurve: THREE.Mesh;
    ["Abandoned_Room_(Photoscanned)"]: THREE.Mesh;
    walkable: THREE.Mesh;
    Plane005: THREE.Mesh;
    Plane005_1: THREE.Mesh;
    walkable003: THREE.Mesh;
    walkable003_1: THREE.Mesh;
    chamber_window: THREE.Mesh;
    Cylinder002: THREE.Mesh;
    Circle001: THREE.Mesh;
    rail005: THREE.Mesh;
    rail006: THREE.Mesh;
    rail007: THREE.Mesh;
    rail008: THREE.Mesh;
    gallery_roof002: THREE.Mesh;
    Human_walking_18m: THREE.Mesh;
    Cube002_1: THREE.Mesh;
    Cube002_2: THREE.Mesh;
  };
  materials: {
    ["Tin Can"]: THREE.MeshStandardMaterial;
    rail: THREE.MeshStandardMaterial;
    ["Material.003"]: THREE.MeshStandardMaterial;
    Material: THREE.MeshStandardMaterial;
    ["Material.003"]: THREE.MeshStandardMaterial;
    ["TT_checker_1024x1024_UV_GRID.001"]: THREE.MeshStandardMaterial;
    leave_1_MatSG: THREE.MeshStandardMaterial;
    ["TT_checker_1024x1024_UV_GRID.001"]: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
    ["Office Ceiling.003"]: THREE.MeshStandardMaterial;
    ["Material.007"]: THREE.MeshStandardMaterial;
    ["desk glow"]: THREE.MeshStandardMaterial;
    Gully: THREE.MeshPhysicalMaterial;
    Stairs: THREE.MeshPhysicalMaterial;
    Plank: THREE.MeshPhysicalMaterial;
    SchoolChair_01: THREE.MeshStandardMaterial;
    ["Abandoned Room 2"]: THREE.MeshStandardMaterial;
    ["Material.010"]: THREE.MeshStandardMaterial;
    ["light glow"]: THREE.MeshStandardMaterial;
    lightwindow: THREE.MeshStandardMaterial;
    ["Material.005"]: THREE.MeshStandardMaterial;
    ["Material.006"]: THREE.MeshStandardMaterial;
    lightbulb_01_glass: THREE.MeshPhysicalMaterial;
    lightbulb_01_base: THREE.MeshStandardMaterial;
  };
};

export function MuseumScene({products, moveCamera, handleMouseMove, ...props }: MuseumLoaderProps) {
  const { nodes, materials } = useGLTF(process.env.PUBLIC_URL + "/museum.glb") as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Crashed_Tin_Can.geometry}
          material={materials["Tin Can"]}
          position={[23.927, 0.083, -3.316]}
          rotation={[-0.272, 0.12, 0.172]}
          scale={1.386}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rail002.geometry}
          material={materials.rail}
          position={[8.45, 0.719, -3.05]}
          scale={[1, 10, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.walltrim001.geometry}
          material={nodes.walltrim001.material}
          position={[9.977, 0.371, -4.904]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[2.2, 2.2, 1.1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.walltrim002.geometry}
          material={nodes.walltrim002.material}
          position={[-10.484, 0.371, 4.9]}
          rotation={[-Math.PI, 0, Math.PI / 2]}
          scale={[2.2, 2.2, 1.1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rail001.geometry}
          material={materials.rail}
          position={[8.45, 0.719, 3.05]}
          scale={[1, 10, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.gallery_light.geometry}
          material={materials["Material.003"]}
          position={[0, 12.882, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.gallery_roof.geometry}
          material={materials.Material}
          position={[-10, 0, 0]}
        />
        <group position={[-10, 0, 4.5]} scale={[1, 2, 1]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder.geometry}
            material={materials["Material.003"]}
          />
        </group>
        <group position={[-10, 0, -4.5]} scale={[1, 2, 1]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder001.geometry}
            material={materials["Material.003"]}
          />
        </group>
        <group position={[-10.279, 0, -2.171]} scale={3.514}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ground001.geometry}
            material={materials["TT_checker_1024x1024_UV_GRID.001"]}
            position={[0, -0.24, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.plant001.geometry}
            material={materials.leave_1_MatSG}
            position={[0, -0.24, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pot001.geometry}
            material={materials["TT_checker_1024x1024_UV_GRID.001"]}
            scale={[1, 0.588, 1]}
          />
        </group>
        <PictureFrames visible={props.visible}
          products={products} 
          nodes={nodes}
          materials={materials} 
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={nodes.Cube001.material}
          position={[10.1, 1.25, 0]}
          scale={[0.125, 1, 1]}
        />
        <group position={[17.7, 0, 7.235]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube009.geometry}
            material={materials["Office Ceiling.003"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube009_1.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube009_2.geometry}
            material={materials.Material}
          />
        </group>
        <group position={[12.362, 0, 8]} scale={[0.62, 0.62, 1.155]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Desk_1.geometry}
            material={materials["Material.007"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Desk_2.geometry}
            material={materials["desk glow"]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.stairwell.geometry}
          material={nodes.stairwell.material}
          position={[13.005, 1.25, 19.025]}
          scale={[0.7, 1.25, 0.7]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Drain_Photoscanned.geometry}
          material={materials.Gully}
          position={[13.654, -2.018, 23.464]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Stairs_(Photoscanned)"].geometry}
          material={materials.Stairs}
          position={[12.989, -2.035, 21.57]}
          scale={[1.085, 1, 1]}
        />
        <group position={[13.01, 0, 18.546]} scale={1.768}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.PLANK_1.geometry}
            material={materials.Plank}
            position={[0.006, 1.149, -0.068]}
            rotation={[0, -1.536, Math.PI / 2]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.PLANK_2.geometry}
            material={materials.Plank}
            position={[-0.028, 0.746, -0.046]}
            rotation={[-Math.PI / 2, 0.886, 0]}
            scale={[1, 1, 1.5]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.PLANK_3.geometry}
            material={materials.Plank}
            position={[-0.01, 0.134, -0.045]}
            rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          />
        </group>
        <group position={[24.478, 0.064, -2.586]} rotation={[0, -1.169, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.SchoolChair_01.geometry}
            material={materials.SchoolChair_01}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BezierCurve.geometry}
          material={nodes.BezierCurve.material}
          position={[17.7, 0, 7.235]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Abandoned_Room_(Photoscanned)"].geometry}
          material={materials["Abandoned Room 2"]}
          position={[23.248, 0.035, -2.261]}
          scale={[1, 1.085, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.walkable.geometry}
          material={materials["Material.003"]}
          position={[11.403, 0, 4.86]}
          scale={[1, 0.01, 1]}
          onPointerDown={
            (e) => {
              e.stopPropagation();
              handleMouseMove(e);
            }
          }
          onPointerUp={
            (e) => {
              e.stopPropagation();
              moveCamera(e);
            }
          }
        />
        <group position={[11.403, 0, 4.86]} scale={[43.775, 1, 50]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane005.geometry}
            material={materials["Material.010"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane005_1.geometry}
            material={materials["Material.010"]}
          />
        </group>
        <group position={[-11.269, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.walkable003.geometry}
            material={nodes.walkable003.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.walkable003_1.geometry}
            material={materials["light glow"]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.chamber_window.geometry}
          material={materials.lightwindow}
          position={[-60, -60, 0]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <group position={[-60, -80, 0]} rotation={[0, 0.14, 0]} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002.geometry}
          material={materials.Material}
          position={[-60, -175, 0]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={[50, 100, 50]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle001.geometry}
          material={nodes.Circle001.material}
          position={[-110, 0, 0]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rail005.geometry}
          material={nodes.rail005.material}
          position={[-109.46, 0.719, -2.798]}
          rotation={[-Math.PI, 0.262, -Math.PI]}
          scale={[1, 10, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rail006.geometry}
          material={nodes.rail006.material}
          position={[-128.61, 0.719, -3.05]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={[1, 10, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rail007.geometry}
          material={nodes.rail007.material}
          position={[-128.61, 0.719, 3.05]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={[1, 10, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rail008.geometry}
          material={nodes.rail008.material}
          position={[-107.652, 0.745, 0]}
          rotation={[Math.PI, -Math.PI / 3, Math.PI]}
          scale={[1, 10, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.gallery_roof002.geometry}
          material={materials["Material.005"]}
          position={[-110, 0, 0]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Human_walking_18m.geometry}
          material={materials["Material.006"]}
          position={[-108.227, 0.001, -0.233]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <group
          position={[17.7, 4.575, 7.235]}
          rotation={[-Math.PI, 0, 0]}
          scale={2}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube002_1.geometry}
            material={materials.lightbulb_01_glass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube002_2.geometry}
            material={materials.lightbulb_01_base}
          />
        </group>
      </group>
    </group>
  );
}

type PictureFramesProps = JSX.IntrinsicElements['group'] & {
  products: Product[][];
  nodes: any;
  materials: any;
}

export function PictureFrames({ products, nodes, materials, ...props }: PictureFramesProps) {
  if (!products) {
    return null;
  }

  const getElementAtIndex = (index: number) => {
	if (index >= products.length) {
	  return undefined;
	}

	if (products[index].length === 0) {
	  return undefined;
	}

	return products[index];
  }

  return (
    <group {...props} dispose={null}>
      <group position={[6, 3, 4.99]}>
        <PictureFrame visible={props.visible}
          product={getElementAtIndex(0)}
          nodes={nodes} 
          materials={materials}
        />
      </group>
      <group position={[0, 3, 4.99]}>
        <PictureFrame visible={props.visible}
          product={getElementAtIndex(1)}
          nodes={nodes} 
          materials={materials}
        />
      </group>
      <group position={[-6, 3, 4.99]}>
        <PictureFrame visible={props.visible}
          product={getElementAtIndex(2)}
          nodes={nodes} 
          materials={materials}
        />
      </group>
      <group position={[-6, 3, -4.99]} rotation={[-Math.PI, 0, -Math.PI]}>
        <PictureFrame visible={props.visible}
          product={getElementAtIndex(3)}
          nodes={nodes} 
          materials={materials}
        />
      </group>
      <group position={[0, 3, -4.99]} rotation={[-Math.PI, 0, -Math.PI]}>
        <PictureFrame visible={props.visible}
          product={getElementAtIndex(4)}
          nodes={nodes} 
          materials={materials}
        />
      </group>
      <group position={[6, 3, -4.99]} rotation={[-Math.PI, 0, -Math.PI]}>
        <PictureFrame visible={props.visible}
          product={getElementAtIndex(5)}
          nodes={nodes} 
          materials={materials}
        />
      </group>
    </group>
  )
}

type PictureFrameProps = JSX.IntrinsicElements['group'] & {
  product: Product[] | undefined;
  nodes: any;
  materials: any;
}

function PictureFrame({ product, nodes, materials, ...props }: PictureFrameProps) {
  const [active, setActive] = useState(false);
  const [variant, setVariant] = useState<Size|undefined>(product && product[0].variant_id);

  const [pointer, setPointer] = useState();

  const navigate = useNavigate();

  const frame = useRef<THREE.Mesh>(null!);
  const light = useRef<THREE.SpotLight>(null!);

  const isValidVariant = (variant: Size|undefined) => {
    if (variant === undefined) {
      return false;
    }

    if (!product) {
      return false;
    }

    const validVariants = Object.keys(product);

    if (validVariants.includes(variant.toString())) {
      return true;
    }

    return false;
  }

  const imageURL = useMemo(() => {
    if (product) {
      if ((variant === undefined) || !isValidVariant(variant)) {
        setVariant(parseInt(Object.keys(product)[0]));
        return "empty";
      }
      if (product[variant].images[0].startsWith(`${process.env.REACT_APP_CDN_URL}`)) {
        return product[variant].images[0];
      } else {
        return "empty";
      }}
  }, [product, variant]);

  const paintingPointerUp = (e: any) => { 
    if (!props.visible) return;
    try {
        if (e.pointer.distanceTo(pointer) > 0.01 || !product || (variant === undefined)) return;
        navigate(`/product/${product[variant].name.replace(/\s+/g, '-').toLowerCase()}`);
      } catch {
        // tslint:disable-next-line: no-console
    }
  }

  const paintingPointerDown = (e: any) => {
    if (!props.visible) return;
    setPointer(e.pointer.clone());
  }

  useEffect(() => {
    light.current.target = frame.current;
    if (active) {
      light.current.intensity = 4;
    } else {
      light.current.intensity = 2;
    }
    if (!imageURL) {
      light.current.intensity = 0;
    }
  }, [active, imageURL]);
 
  return (
    <group {...props}>
    <mesh
      ref={frame}
      castShadow
      receiveShadow
      geometry={nodes.Picture_Frame1.geometry}
      material={materials["Material.001"]}
      rotation={[Math.PI / 2, 0, Math.PI]}
      scale={[3, 2, 4]}
    />
    <spotLight
        ref={light}
        position={[0, -3.7, -2]}
        intensity={2}
        angle={Math.PI / 4}
        penumbra={0.5}
    />
    {imageURL ?
    <>
      <ProductPicture visible={props.visible}
        imageURL={imageURL}
        setActive={setActive}
        nodes={nodes}
        materials={materials}
        paintingPointerUp={paintingPointerUp}
        paintingPointerDown={paintingPointerDown}
      />
    </>
    :
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Picture1.geometry}
        material={nodes.Picture1.material}
        rotation={[Math.PI*1.5, 0,  -Math.PI]}
      />
    }
    {product && !(variant === undefined) && isValidVariant(variant) && (
    <Html position={[0,-2,0]} center
      style={{
        width: "300px",
        display: "flex",
        justifyContent: "center",
        opacity: active ? 1 : 0,
        transition: "opacity 0.2s",
      }}
      material={materials["Material.001"]}
    >
      <div className="flex flex-col pointer-events-none">
        {/* <a href={`/product/${product[variant].name}`} className="text-xl" >{product[variant].name}</a> */}
        <p className="text-xl">{product[variant].name}</p>
        <p className="text-xl">${product[variant].price}</p>
        {/* <div className="flex">
          <p className="">Sizes:</p>
        {Object.keys(product).map((variant_id: string) => {
          if (product[+variant_id].inventory === 0) {
            return null;
          }

          return (
            <div key={variant_id} className="flex px-2">
              <p>{Size[+variant_id]}</p>
            </div>
          )
        })}
        </div> */}
      </div>
    </Html>
    )}
    {/* <pointLight position={[0,0,-1]} intensity={0.2} distance={20} decay={2} /> */}
  </group>
  )
}

type PictureProps = JSX.IntrinsicElements['group'] & {
  imageURL: string;
  setActive: (active: boolean) => void;
  paintingPointerUp: (e: any) => void;
  paintingPointerDown: (e: any) => void;
  nodes: any;
  materials: any;
}

function ProductPicture({ imageURL, setActive, paintingPointerUp, paintingPointerDown, nodes, materials, ...props }: PictureProps) {
  
  imageURL = useMemo(() => {
    if (imageURL === "empty") {
      return "https://i.imgur.com/F39ANdQ_d.webp?maxwidth=520&shape=thumb&fidelity=high";
    }

    return imageURL;
  }, [imageURL]);

  useEffect(() => {
    THREE.TextureLoader.prototype.crossOrigin = "anonymous";
  }, []);
  
  const img = useTexture(imageURL);

  return (
    <mesh
    castShadow
    receiveShadow
    geometry={nodes.Picture1.geometry}
    material={
      new THREE.MeshStandardMaterial({
        map: img,
        side: THREE.DoubleSide,
      })
	}
    rotation={[Math.PI*1.5, 0,  -Math.PI]}
    onPointerOver={() => {
      if (props.visible) setActive(true)
    }}
    onPointerOut={() => {
      setActive(false)
    }}
    onPointerDown={
      (e) => {
        e.stopPropagation();
        paintingPointerDown(e);
      }
    }
    onPointerUp={
      (e) => {
        e.stopPropagation();
        paintingPointerUp(e);
      }
    }
  />
  )
}

useGLTF.preload("/museum.glb");
