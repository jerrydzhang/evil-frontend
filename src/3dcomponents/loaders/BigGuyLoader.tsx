/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    body: THREE.Mesh;
    Sphere: THREE.Mesh;
    NurbsPath: THREE.Mesh;
  };
  materials: {
    ["Material.002"]: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

type BigGuyProps = JSX.IntrinsicElements['group'] & {
    raysref: any
  };

export function BigGuyModel({ raysref, ...props }: BigGuyProps) {
  const { nodes, materials } = useGLTF("/models/bigGuy.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.body.geometry}
        material={
            new THREE.MeshStandardMaterial({
                color: 0x000000,
                roughness: 0.5,
                metalness: 0.5,
                side: THREE.DoubleSide,
            })
        }
        scale={[1, 2.759, 1.302]}
      />
      <mesh
        ref={raysref}
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={materials["Material.001"]}
        position={[0.553, 2.127, 0.281]}
        scale={0.065}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath.geometry}
        material={materials["Material.001"]}
      />
    </group>
  );
}

useGLTF.preload("/bigGuy.glb");