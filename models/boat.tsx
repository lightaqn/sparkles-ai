import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { a } from "@react-spring/three";

const Boat = ({ isRotating, ...props }: any) => {
  const {
    nodes,
    materials,
    scene,
    animations,
  }: { nodes: any; materials: any; scene: any; animations: any } =
    useGLTF("/boat.glb");

  const boatRef = useRef<any>();
  const { actions } = useAnimations(animations, boatRef);

  const [closeBy, setCloseBy] = useState(false);

  useEffect(() => {
    if (isRotating) {
      Object.values(actions).forEach((action: any) => {
        action?.play();
      });
    }
  }, [actions, isRotating]);

  useFrame(({ clock }) => {
    let radiusX = 13;
    let radiusZ = 10;
    let initialSpeed = 0.3;
    const speed = (initialSpeed += 0.01);

    const angle = speed * clock.elapsedTime;

    const x = radiusX * Math.cos(angle);
    const z = radiusZ * Math.sin(angle);

    if (boatRef.current) {
      boatRef.current.position.set(x, 1.3, z);
      if ((x > 0.9 && x < 10) || (z > 0.9 && z < 7)) {
        setCloseBy(true);
      } else {
        setCloseBy(false);
      }
    }
  });
  return (
    <a.group {...props} ref={boatRef}>
      <group
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.5}
        position={[-5, -4, -2]}
        visible={closeBy ? false : true}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.Tow_body}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.Tow_body}
        />
      </group>
    </a.group>
  );
};

export default Boat;
