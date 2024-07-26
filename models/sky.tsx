import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
// import skyScene from "@/sky.glb";

const Sky = ({ isRotating, ...props }: any) => {
  const skyRef = useRef<any>();
  const {
    nodes,
    materials,
    scene,
  }: { nodes: any; materials: any; scene: any } = useGLTF("/sky.glb");

  useFrame((_, delta) => {
    if (isRotating) {
      skyRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <mesh {...props} ref={skyRef}>
      <primitive object={scene} />
    </mesh>
    // <group {...props} ref={skyRef} dispose={null}>
    //   <group scale={0.01} ref={skyRef}>
    //     <primitive object={scene} />
    //     <mesh
    //       castShadow
    //       receiveShadow
    //       geometry={nodes.Sphere__0.geometry}
    //       material={materials["Scene_-_Root"]}
    //       rotation={[-Math.PI / 2, 0, 0]}
    //       scale={50000}
    //     />
    //   </group>
    // </group>
  );
};

// useGLTF.preload("/free_-_skybox_anime_sky (1).glb");

export default Sky;
