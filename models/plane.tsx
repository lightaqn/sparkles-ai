import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Plane = ({ isRotating, ...props }: any) => {
  const {
    nodes,
    materials,
    scene,
    animations,
  }: { nodes: any; materials: any; scene: any; animations: any } =
    useGLTF("/plane.glb");
  const planeRef = useRef<any>();
  const [disappear, setDisappear] = useState(false);
  const { actions }: { actions: any } = useAnimations(animations, planeRef);

  useEffect(() => {
    Object.values(actions).forEach((action: any) => {
      action?.play();
    });
  }, []);

  useFrame(({ clock, camera }) => {
    planeRef.current.position.y = Math.sin(clock.elapsedTime) * 0.5 + 9;

    if (clock.elapsedTime >= 24) {
      setDisappear(true);
    }
    if (planeRef.current.position.x > camera.position.x) {
      planeRef.current.rotation.y = Math.PI;
    } else if (planeRef.current.position.x < camera.position.x) {
      planeRef.current.rotation.y = 0;
    }

    if (planeRef.current.rotation.y === 10) {
      planeRef.current.position.x -= 0.1;
      planeRef.current.position.z += 0.1;
    } else {
      planeRef.current.position.x += 0.1;
      planeRef.current.position.z -= 0.1;
    }
  });

  return (
    <mesh
      {...props}
      ref={planeRef}
      position={[-5, 7, 10]}
      scale={[0.1, 0.1, 0.1]}
      visible={disappear ? false : true}
    >
      <primitive object={scene} />
    </mesh>
  );
};

export default Plane;
