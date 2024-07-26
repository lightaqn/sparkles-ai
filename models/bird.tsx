import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

// import birdScene from "../models/"

const Bird = ({ props }: any) => {
  const birdRef = useRef<any>();
  const {
    nodes,
    materials,
    animations,
    scene,
  }: { nodes: any; materials: any; animations: any; scene: any } =
    useGLTF("/bird.glb");

  const { actions } = useAnimations(animations, birdRef);

  useEffect(() => {
    Object.values(actions).forEach((action: any) => {
      action?.play();
    });
  }, []);

  // useEffect(() => {
  //   actions["Take 001"]?.play();
  //   console.log(actions);
  // }, []);

  // useFrame(({ clock, camera }) => {
  //   birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

  //   if (birdRef.current.position.x > camera.position.x + 10) {
  //     birdRef.current.rotation.y = Math.PI;
  //   } else if (birdRef.current.position.x < camera.position.x - 10) {
  //     birdRef.current.rotation.y = 0;
  //   }

  //   if (birdRef.current.rotation.y === 10) {
  //     birdRef.current.position.x += 0.01;
  //     birdRef.current.position.z -= 0.01;
  //   } else {
  //     birdRef.current.position.x -= 0.01;
  //     birdRef.current.position.z += 0.01;
  //   }
  // });

  useFrame(({ clock, camera }) => {
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.5 + 2;

    if (birdRef.current.position.x > camera.position.x) {
      birdRef.current.rotation.y = Math.PI;
    } else if (birdRef.current.position.x < camera.position.x) {
      birdRef.current.rotation.y = 0;
    }

    if (birdRef.current.rotation.y >= 10) {
      birdRef.current.position.x -= 0.01;
      // birdRef.current.position.z -= 0.005;
    } else {
      birdRef.current.position.x += 0.01;
      // birdRef.current.position.z += 0.005;
    }
  });

  return (
    <mesh
      {...props}
      ref={birdRef}
      // position={[-5, 2, 1]}
      position={[-4, 10, 1]}
      scale={[0.003, 0.003, 0.003]}
      // scale={[0.003, 0.003, 0.003]}
    >
      <primitive object={scene} />
    </mesh>
    // <group
    //   ref={birdRef}
    //   {...props}
    //   position={[-5, 2, 1]}
    //   scale={[0.003, 0.003, 0.003]}
    //   dispose={null}
    // >
    //   <group name="Sketchfab_Scene">
    //     <group
    //       name="Sketchfab_model"
    //       position={[-0.625, 0, -17.137]}
    //       rotation={[-Math.PI / 2, 0, 0.053]}
    //     >
    //       <group
    //         name="5f59736c86d4457fa045aec4aea6b7e0fbx"
    //         rotation={[Math.PI / 2, 0, 0]}
    //       >
    //         <group name="Object_2">
    //           <group name="RootNode">
    //             <group name="Object_4">
    //               <primitive object={nodes._rootJoint} />
    //               <skinnedMesh
    //                 name="Object_7"
    //                 geometry={nodes.Object_7.geometry}
    //                 material={materials.MatI_Ride_FengHuang_01a}
    //                 skeleton={nodes.Object_7.skeleton}
    //               />
    //               <skinnedMesh
    //                 name="Object_8"
    //                 geometry={nodes.Object_8.geometry}
    //                 material={materials.MatI_Ride_FengHuang_01b}
    //                 skeleton={nodes.Object_8.skeleton}
    //               />
    //               <group name="Object_6" rotation={[-Math.PI / 2, 0, 0]} />
    //               <group
    //                 name="AMesh_Ride_FengHuang_01"
    //                 rotation={[-Math.PI / 2, 0, 0]}
    //               />
    //             </group>
    //           </group>
    //         </group>
    //       </group>
    //     </group>
    //   </group>
    // </group>
  );
};

// useGLTF.preload("/phoenix_bird.glb");

export default Bird;
