/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    rail: THREE.Mesh;
    Circle: THREE.Mesh;
    ground: THREE.Mesh;
  };
  materials: {};
};

export function MuseumMainModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/museum-main.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rail.geometry}
        material={
            new THREE.MeshStandardMaterial({
                color: "grey",
                roughness: 0.5,
                metalness: 0.5,
                side: THREE.DoubleSide,
            })
        }
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle.geometry}
        material={
            new THREE.MeshStandardMaterial({
                color: "blue",
                roughness: 0.5,
                metalness: 0.5,
                side: THREE.DoubleSide,
            })
        }
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ground.geometry}
        material={            
            new THREE.MeshStandardMaterial({
                color: 0xffffff,
                roughness: 0.5,
                metalness: 0.5,
                side: THREE.DoubleSide,
        })}
      />
    </group>
  );
}

useGLTF.preload("/museum-main.glb");