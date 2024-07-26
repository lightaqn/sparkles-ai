import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { a } from "@react-spring/three";

const Island = ({
  isRotating,
  setIsRotating,
  setCurrentStage,
  ...props
}: any) => {
  const { nodes, materials }: { nodes: any; materials: any } =
    useGLTF("/smuggleIsland.glb");
  const islandRef = useRef<any>();
  const { gl, viewport } = useThree();
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;
  // let clientX: any;

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  };

  const handlePointerUp = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;

      const delta = (clientX - lastX.current) / viewport.width;
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "ArrowLeft") {
      if (!isRotating) {
        setIsRotating(true);
        islandRef.current.rotation.y += 0.01 * Math.PI;
        rotationSpeed.current = 0.0125;
      }
    } else if (e.key === "ArrowRight") {
      setIsRotating(true);
      islandRef.current.rotation.y -= 0.01 * Math.PI;
      rotationSpeed.current = -0.0125;
    }
  };

  const handleKeyUp = (e: any) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") setIsRotating(false);
  };

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;

      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }
      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      const rotation = islandRef.current.rotation.y;
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;

        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;

        default:
          setCurrentStage(null);
          break;
      }
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handlePointerMove, handlePointerUp, handlePointerDown]);

  //remove cast shadow and recieveshadow

  return (
    <a.group {...props} ref={islandRef}>
      <group
        {...props}
        position={[-19.747, 189.46, -114.167]}
        rotation={[-1.518, -0.07, -0.022]}
        scale={[0.833, 1.116, 1.168]}
      >
        <mesh
          {...props}
          castShadow
          receiveShadow
          geometry={nodes["Box006_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-35.901, -8.003, -5.34]}
          rotation={[0.017, -0.268, 0.26]}
        />
      </group>
      <group
        position={[68.5, -0.789, -161.752]}
        rotation={[-Math.PI / 2, 0, -0.717]}
        scale={0.901}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Box113_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[0, 10.78, 0]}
        />
      </group>
      <group
        position={[21.16, 101.533, 1.176]}
        rotation={[2.581, 0.298, -2.216]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["obj_dop001_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-3.372, -1.659, 0]}
        />
      </group>
      <group position={[21.17, 101.176, -2.649]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["obj_rumM001_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-0.662, 4.289, 0]}
        />
      </group>
      <group
        position={[14.247, 102.253, -2.649]}
        rotation={[1.026, -0.395, -1.022]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["obj_rumZ001_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-0.662, 4.289, 0]}
        />
      </group>
      <group
        position={[71.417, 7.058, -15.894]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Sphere010_Material_#16_0"].geometry}
          material={materials.Material_16}
          position={[0, 0, -80.155]}
        />
      </group>
      <group position={[-67.485, 7.058, 28.27]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Sphere011_Material_#16_0"].geometry}
          material={materials.Material_16}
          position={[0, 0, -80.155]}
        />
      </group>
      <group
        position={[-124.668, 9.829, 172.322]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Sphere012_Material_#16_0"].geometry}
          material={materials.Material_16}
          position={[0, 0, -80.155]}
        />
      </group>
      <group
        position={[17.74, 130.931, -63.769]}
        rotation={[-Math.PI / 2, 0, 1.335]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["OilLamp_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[0, 0, -89.085]}
        />
      </group>
      <group
        position={[17.74, 130.931, -63.44]}
        rotation={[-Math.PI / 2, 0, 1.335]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Ob_metelOilLamp_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-2.917, -0.699, -89.085]}
        />
      </group>
      <group
        position={[4.204, 113.421, -65.392]}
        rotation={[1.954, 0.618, -0.498]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["obj_dop002_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-3.372, -1.659, 0]}
        />
      </group>
      <group
        position={[-32.477, 130.931, -47.158]}
        rotation={[-Math.PI / 2, 0, 1.335]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Ob_metelOilLamp001_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-2.917, -0.699, -89.085]}
        />
      </group>
      <group
        position={[-32.477, 130.931, -47.486]}
        rotation={[-Math.PI / 2, 0, 1.335]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["OilLamp001_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[0, 0, -89.085]}
        />
      </group>
      <group
        position={[42.046, 69.056, 83.456]}
        rotation={[-Math.PI / 2, 0, 1.772]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Ob_metelOilLamp002_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-2.917, -0.699, -89.085]}
        />
      </group>
      <group
        position={[41.907, 69.056, 83.159]}
        rotation={[-Math.PI / 2, 0, 1.772]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["OilLamp002_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[0, 0, -89.085]}
        />
      </group>
      <group
        position={[1.349, 56.689, 87.732]}
        rotation={[-Math.PI / 2, 0, 1.074]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Ob_metelOilLamp003_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-2.917, -0.699, -89.085]}
        />
      </group>
      <group
        position={[1.434, 56.689, 87.414]}
        rotation={[-Math.PI / 2, 0, 1.074]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["OilLamp003_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[0, 0, -89.085]}
        />
      </group>
      <group
        position={[-2.005, 173.527, -156.846]}
        rotation={[-Math.PI / 2, 0, -2.504]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Ob_metelOilLamp004_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-2.917, -0.699, -89.085]}
        />
      </group>
      <group
        position={[-2.216, 173.527, -156.595]}
        rotation={[-Math.PI / 2, 0, -2.504]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["OilLamp004_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[0, 0, -89.085]}
        />
      </group>
      <group
        position={[0.326, 23.031, 62.106]}
        rotation={[0.509, 0.554, -0.392]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["obj_rumZ002_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-0.662, 4.289, 0]}
        />
      </group>
      <group
        position={[2.761, 23.188, 61.126]}
        rotation={[-2.899, -0.585, 0.214]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["obj_dop003_Material_#10_0"].geometry}
          material={materials.Material_10}
          position={[-3.372, -1.659, 0]}
        />
      </group>
      <group position={[42.087, 23.569, 25.731]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["obj_rumM002_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-0.662, 4.289, 0]}
        />
      </group>
      <group
        position={[42.966, 22.209, 23.346]}
        rotation={[-0.13, 0.314, 0.061]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["obj_rumM003_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-0.662, 4.289, 0]}
        />
      </group>
      <group
        position={[43.168, 22.209, 26.56]}
        rotation={[-0.13, 0.314, 0.061]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["obj_rumM004_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-0.662, 4.289, 0]}
        />
      </group>
      <group
        position={[30.851, 22.209, 22.841]}
        rotation={[-0.13, 0.314, 0.061]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["obj_rumM005_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-0.662, 4.289, 0]}
        />
      </group>
      <group
        position={[34.533, 22.209, 21.005]}
        rotation={[-0.13, 0.314, 0.061]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["obj_rumM006_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-0.662, 4.289, 0]}
        />
      </group>
      <group
        position={[39.724, 22.209, 20.432]}
        rotation={[-0.128, 0.514, -0.076]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["obj_rumM007_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-0.662, 4.289, 0]}
        />
      </group>
      <group
        position={[36.004, 22.209, 24.347]}
        rotation={[-0.128, 0.514, -0.076]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["obj_rumM008_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-0.662, 4.289, 0]}
        />
      </group>
      <group position={[32.145, 94.782, -6.259]} rotation={[0, 0, Math.PI / 4]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["obj_rumM009_Material_#12_0"].geometry}
          material={materials.Material_12}
          position={[-0.662, 4.289, 0]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box004_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-21.382, 96.77, -105.794]}
        rotation={[-1.589, 0.054, 0.285]}
        scale={[0.908, 1.023, 1.182]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box005_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-20.342, 140.615, -113.419]}
        rotation={[-1.589, 0.054, 0.285]}
        scale={[0.668, 0.752, 1.139]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box042_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[19.438, 70.732, 79.261]}
        rotation={[0.002, 0.13, 0]}
        scale={[1.094, 0.86, 1.094]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Sphere006_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-39.074, 113.126, 16.479]}
        rotation={[-0.549, -0.12, 2.058]}
        scale={2.617}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box120_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[41.14, 95.169, -173.975]}
        rotation={[-1.537, 0, 0.268]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Cylinder026_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[51.812, -3.143, -164.054]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box130_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-5.361, 24.304, -3.979]}
        rotation={[-1.59, -0.039, 0.46]}
        scale={[0.387, 0.453, 1.07]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Sphere008_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[25.195, 1.302, 58.617]}
        rotation={[-Math.PI / 2, 0, 1.007]}
        scale={[1.522, 1.227, 0.48]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box138_Material_#9_0"].geometry}
        material={materials.Material_9}
        position={[1121.8, 0, -1.834]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.009}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Cylinder031_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-22.571, 93.291, 13.177]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box142_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-10.219, 180.859, -79.422]}
        rotation={[3.113, -0.276, -1.579]}
        scale={[0.191, 0.298, 0.17]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box143_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[7.258, 178.748, -119.819]}
        rotation={[0.108, -1.314, 1.675]}
        scale={[0.206, 0.403, 0.241]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box144_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[1.347, 141.893, -119.269]}
        rotation={[3.03, 1.323, -1.463]}
        scale={[0.206, 0.403, 0.245]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box145_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-45.293, 144.784, -107.554]}
        rotation={[2.808, 1.311, -1.251]}
        scale={[0.206, 0.403, 0.356]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box146_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-41.992, 181.454, -107.941]}
        rotation={[0.108, -1.314, 1.675]}
        scale={[0.206, 0.403, 0.356]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box147_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-74.792, 114.466, -92.602]}
        rotation={[-Math.PI / 2, 0, 0.27]}
        scale={[0.242, 0.971, 0.321]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box148_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[34.727, 116.185, -98.232]}
        rotation={[1.557, -0.012, -0.219]}
        scale={[0.199, 0.598, 0.248]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box149_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-40.55, 117.775, -175.868]}
        rotation={[-Math.PI / 2, 0, -1.373]}
        scale={[0.298, 0.73, 0.41]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box150_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[34.469, 115.073, -193.281]}
        rotation={[-Math.PI / 2, 0, -1.345]}
        scale={[0.216, 0.286, 0.226]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box151_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[44.648, 115.073, -150.714]}
        rotation={[-Math.PI / 2, 0, -1.348]}
        scale={[0.214, 0.278, 0.226]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box152_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[60.645, 117.443, -178.262]}
        rotation={[-Math.PI / 2, 0, -2.897]}
        scale={[0.216, 0.286, 0.226]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box155_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-53.243, 101.172, -96.107]}
        rotation={[3.032, 1.318, -1.465]}
        scale={[0.206, 0.558, 0.179]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box156_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-51.075, 139.28, -97.255]}
        rotation={[-0.117, -1.316, 1.46]}
        scale={[0.206, 0.551, 0.183]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box157_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[13.12, 135.735, -115.656]}
        rotation={[-0.097, -1.264, 1.481]}
        scale={[0.206, 0.551, 0.209]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box158_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[11.797, 98.264, -115.319]}
        rotation={[-0.059, -1.359, 1.521]}
        scale={[0.206, 0.551, 0.209]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box159_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[18.399, 36.112, 71.16]}
        rotation={[-Math.PI / 2, 0, 1.683]}
        scale={[0.729, 0.237, 0.305]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box160_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-12.157, 144.194, -78.814]}
        rotation={[3.112, -0.279, -1.522]}
        scale={[0.175, 0.305, 0.17]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box161_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-29.056, 181.058, -146.284]}
        rotation={[3.077, -0.266, -1.588]}
        scale={[0.17, 0.298, 0.17]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box162_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-28.942, 143.065, -146.085]}
        rotation={[3.129, -0.303, -1.521]}
        scale={[0.163, 0.309, 0.17]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box165_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-5.723, 137.82, -61.606]}
        rotation={[3.112, -0.286, -1.522]}
        scale={[0.177, 0.381, 0.098]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box166_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-25.555, 100.897, -55.803]}
        rotation={[3.113, -0.306, -1.522]}
        scale={[0.177, 0.188, 0.098]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box167_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-30.613, 137.803, -150.734]}
        rotation={[3.112, -0.286, -1.522]}
        scale={[0.177, 0.381, 0.098]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box168_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-31.866, 99.802, -149.949]}
        rotation={[3.111, -0.272, -1.522]}
        scale={[0.177, 0.391, 0.098]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box169_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[17.259, 99.522, -67.817]}
        rotation={[3.079, -0.29, 1.651]}
        scale={[0.177, 0.071, 0.098]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box170_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[35.051, 56.441, 76.356]}
        rotation={[Math.PI, 1.341, -Math.PI]}
        scale={[0.063, 0.215, 0.202]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box171_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[1.135, 56.441, 80.928]}
        rotation={[Math.PI, 1.341, -Math.PI]}
        scale={[0.063, 0.215, 0.202]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Cylinder032_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-39.276, 94.235, 11.619]}
        rotation={[-Math.PI / 2, 0, -1.167]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Cylinder033_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-31.99, 96.409, 31.127]}
        rotation={[-2.127, 0.023, -0.509]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box172_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[56.275, 8.915, -172.293]}
        rotation={[-Math.PI / 2, 0, -0.68]}
        scale={[0.205, 0.176, 0.185]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box173_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[78.994, 8.915, -152.291]}
        rotation={[-Math.PI / 2, 0, 2.439]}
        scale={[0.249, 0.176, 0.185]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box174_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-69.159, 96.597, -93.962]}
        rotation={[1.557, 0.022, 2.86]}
        scale={[0.496, 0.909, 0.336]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box175_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-55.053, 94.965, -104.152]}
        rotation={[-1.59, -0.005, 0.246]}
        scale={[0.496, 0.909, 0.336]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box176_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-38.385, 93.459, -107.972]}
        rotation={[-1.588, -0.004, 0.246]}
        scale={[0.496, 0.909, 0.336]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box177_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-20.629, 95.191, -108.755]}
        rotation={[1.565, -0.024, 2.896]}
        scale={[0.496, 0.909, 0.336]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box178_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-8.426, 92.254, -116.192]}
        rotation={[-1.569, -0.009, 0.246]}
        scale={[0.496, 0.909, 0.336]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box179_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[7.152, 94.255, -123.172]}
        rotation={[1.565, -0.024, 2.896]}
        scale={[0.496, 0.909, 0.336]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box180_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[23.768, 93.516, -121.935]}
        rotation={[1.569, -0.033, -0.243]}
        scale={[0.496, 0.909, 0.336]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box181_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-32.455, 88.952, -163.309]}
        rotation={[-Math.PI / 2, 0, -1.355]}
        scale={[0.629, 0.79, 0.574]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box183_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-84.617, 46.448, -163.678]}
        rotation={[0.117, 0.43, 0]}
        scale={[0.445, 0.556, 1.354]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box184_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[14.259, 48.089, -174.56]}
        rotation={[0.549, -1.366, 0.589]}
        scale={[0.445, 0.556, 1.354]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box185_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-93.797, 105.956, -163.47]}
        scale={[0.087, 0.112, 0.271]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box186_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[15.086, 105.956, -189.495]}
        rotation={[0, -0.643, 0]}
        scale={[0.087, 0.112, 0.271]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box187_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[55.31, 105.956, -197.886]}
        rotation={[0, -1.444, 0]}
        scale={[0.087, 0.112, 0.271]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box188_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[64.911, 105.956, -157.624]}
        rotation={[-3.121, -1.444, 0]}
        scale={[0.087, 0.112, 0.271]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box189_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[26.321, 105.755, -145.176]}
        rotation={[0.762, -1.28, -2.513]}
        scale={[0.087, 0.112, 0.271]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box190_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[44.341, 103.504, -56.983]}
        rotation={[-3.118, -1.444, -0.001]}
        scale={[0.087, 0.129, 0.271]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box191_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-39.314, 120.259, -55.932]}
        rotation={[0.002, -1.256, -0.017]}
        scale={[0.157, 0.194, 0.116]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box192_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-63.655, 120.363, -139.62]}
        rotation={[-0.265, -1.244, -0.281]}
        scale={[0.157, 0.194, 0.116]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box193_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[20.264, 117.397, -68.363]}
        rotation={[-0.019, 0.3, -0.079]}
        scale={[0.157, 0.194, 0.116]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box194_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-0.125, 116.62, -157.376]}
        rotation={[-0.022, -1.256, -0.023]}
        scale={[0.157, 0.194, 0.116]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box195_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-35.915, 120.736, -53.533]}
        rotation={[0.062, 0.3, -0.078]}
        scale={[0.157, 0.194, 0.116]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box196_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-5.101, 116.725, -158.856]}
        rotation={[0.006, 0.319, -0.05]}
        scale={[0.157, 0.194, 0.116]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box197_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-59.811, 120.904, -143.53]}
        rotation={[0.062, 0.3, -0.078]}
        scale={[0.157, 0.194, 0.116]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box198_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[23.393, 117.288, -74.495]}
        rotation={[-0.131, -1.244, -0.128]}
        scale={[0.157, 0.194, 0.116]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box199_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-50.882, 120.39, -95.394]}
        rotation={[2.828, 1.225, -2.845]}
        scale={[0.157, 0.194, 0.116]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box200_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[9.896, 116.517, -115.382]}
        rotation={[2.828, 1.225, -2.845]}
        scale={[0.157, 0.194, 0.116]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box201_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-34.329, 164.598, -77.779]}
        rotation={[-0.022, -1.256, -0.023]}
        scale={[0.157, 0.194, 0.116]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box202_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-49.787, 163.423, -137.636]}
        rotation={[-0.022, -1.256, -0.023]}
        scale={[0.157, 0.194, 0.116]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box203_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[9.771, 160.595, -86.044]}
        rotation={[0.062, 0.3, -0.078]}
        scale={[0.157, 0.194, 0.116]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box204_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-3.193, 159.784, -150.497]}
        rotation={[-0.022, -1.256, -0.023]}
        scale={[0.157, 0.194, 0.116]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box205_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-31.059, 164.771, -75.611]}
        rotation={[0.062, 0.3, -0.078]}
        scale={[0.157, 0.194, 0.116]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box206_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-9.121, 159.618, -152.583]}
        rotation={[0.062, 0.3, -0.078]}
        scale={[0.157, 0.194, 0.116]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box207_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-48.57, 163.77, -141.702]}
        rotation={[0.062, 0.3, -0.078]}
        scale={[0.157, 0.194, 0.116]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box208_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[12.37, 160.962, -90.079]}
        rotation={[-0.022, -1.256, -0.023]}
        scale={[0.157, 0.194, 0.116]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box209_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-6.652, 114.927, -62.261]}
        rotation={[-0.021, 0.433, 3.021]}
        scale={[0.106, 0.207, 0.135]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box210_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-3.791, 114.518, -63.577]}
        rotation={[-0.021, 0.433, 3.021]}
        scale={[0.106, 0.207, 0.135]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box211_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-0.869, 114.127, -63.119]}
        rotation={[3.136, -0.441, -0.055]}
        scale={[0.106, 0.207, 0.135]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box212_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[1.893, 114.518, -65.429]}
        rotation={[-0.021, 0.433, 3.021]}
        scale={[0.106, 0.207, 0.135]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box213_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[4.629, 114.127, -66.688]}
        rotation={[-0.021, 0.433, 3.021]}
        scale={[0.106, 0.207, 0.135]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box214_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-0.409, 127.069, -63.209]}
        rotation={[-1.55, 0.03, 1.833]}
        scale={[0.039, 0.09, 0.355]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box215_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-1.611, 101.61, -62.428]}
        rotation={[1.573, 0.026, 1.106]}
        scale={[0.039, 0.09, 0.355]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box216_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[35.985, 29.737, 75.197]}
        rotation={[-2.555, -1.255, 0.442]}
        scale={[0.087, 0.08, 0.271]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box217_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[33.746, 29.737, 61.201]}
        rotation={[-3.127, -1.444, 0]}
        scale={[0.087, 0.08, 0.271]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box218_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[3.098, 29.222, 66.04]}
        rotation={[-3.127, -1.444, 0]}
        scale={[0.087, 0.08, 0.271]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box219_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[1.611, 29.4, 79.85]}
        rotation={[-3.139, 0.848, -0.016]}
        scale={[0.087, 0.08, 0.271]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Sphere009_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-39.985, 113.873, 8.374]}
        rotation={[-0.549, -0.12, 2.058]}
        scale={2.617}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box220_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-45.399, 120.703, -75.287]}
        rotation={[3.001, 1.316, 1.707]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box221_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-57.722, 120.703, -119.232]}
        rotation={[3.001, 1.316, 1.707]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box222_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-43.424, 163.883, -108.403]}
        rotation={[3.046, 1.181, 1.659]}
        scale={[1, 1.302, 1.023]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box223_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[4.294, 118.134, -137.918]}
        rotation={[-0.342, -1.299, -1.901]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box224_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[16.074, 118.231, -96.686]}
        rotation={[-0.341, -1.299, -1.9]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box225_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[4.09, 162.683, -122.099]}
        rotation={[-0.181, -1.331, -1.792]}
        scale={[1, 1.302, 1.023]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box226_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-33.357, 121.228, -151.089]}
        rotation={[0.011, 0.345, -1.616]}
        scale={[1, 1.305, 1.04]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box227_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-28.815, 164.242, -147.329]}
        rotation={[0.004, 0.268, -1.603]}
        scale={[1, 0.975, 0.997]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box228_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-10.018, 163.89, -80.833]}
        rotation={[-3.138, -0.24, 1.604]}
        scale={[1, 0.975, 0.997]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box229_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-22.285, 122.931, -57.643]}
        rotation={[-3.138, -0.24, 1.604]}
        scale={[0.649, 0.632, 0.647]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[76.728, -4.984, -6.252]}
        rotation={[-Math.PI / 2, 0, -0.599]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box230_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-44.827, 63.436, -84.301]}
        rotation={[1.823, -0.184, -0.21]}
        scale={[0.445, 0.556, 1.354]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box231_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-0.076, 63.436, -96.017]}
        rotation={[1.796, -0.217, -0.348]}
        scale={[0.445, 0.556, 1.354]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_boom_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[82.856, 28.335, -16.914]}
        rotation={[0, 0.45, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane001_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[104.787, 62.96, -16.029]}
        rotation={[-1.557, 0.358, 0.08]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots001_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[70.903, -4.984, -24.381]}
        rotation={[-Math.PI / 2, 0, -1.34]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane002_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[101.29, 62.96, -21.951]}
        rotation={[-1.852, 0.225, 1.031]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane003_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[92.557, 62.96, -21.854]}
        rotation={[-1.849, -0.229, 2.362]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane004_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[90.41, 62.96, -13.159]}
        rotation={[-1.385, -0.308, -2.466]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane005_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[97.82, 64.161, -9.476]}
        rotation={[-1.463, 0.038, -1.686]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane006_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-93.488, 62.96, 57.065]}
        rotation={[-1.358, -0.29, -2.376]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane007_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-87.115, 62.96, 59.651]}
        rotation={[-1.213, -0.013, -1.488]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane008_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-80.233, 62.96, 54.273]}
        rotation={[-1.491, 0.349, -0.11]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane009_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-83.803, 62.96, 46.06]}
        rotation={[-1.904, 0.134, 1.321]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane010_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-91.927, 62.96, 47.628]}
        rotation={[-1.832, -0.248, 2.432]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_boom001_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-75.52, 28.335, 44.461]}
        rotation={[Math.PI, -1.102, Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots002_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-59.886, -4.984, 43.144]}
        rotation={[-Math.PI / 2, 0, -0.599]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots003_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-70.167, -4.984, 22.137]}
        rotation={[-Math.PI / 2, 0, -1.34]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots004_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-79.28, -4.984, 40.081]}
        rotation={[-Math.PI / 2, 0, -2.206]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane011_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-101.148, 74.195, 210.932]}
        rotation={[-1.243, 0.146, -1.048]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane012_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-97.42, 74.195, 205.152]}
        rotation={[-1.487, 0.349, -0.121]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane013_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-99.917, 66.994, 200.168]}
        rotation={[-1.902, 0.137, 1.311]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane014_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-110.157, 74.195, 199.366]}
        rotation={[-1.773, -0.298, 2.652]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane015_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-110.129, 74.195, 207.64]}
        rotation={[-1.366, -0.296, -2.405]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_boom002_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-111.541, 30.976, 189.228]}
        rotation={[0, -0.656, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots005_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-109.781, -2.343, 170.357]}
        rotation={[-Math.PI / 2, 0, 0.785]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots006_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-132.335, -2.343, 176.544]}
        rotation={[-Math.PI / 2, 0, 0.044]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots007_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-116.403, -2.343, 188.841]}
        rotation={[-Math.PI / 2, 0, -0.823]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots008_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-17.829, 18.038, 55.883]}
        rotation={[-Math.PI / 2, 0, 2.294]}
        scale={0.444}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots009_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-127.442, -2.565, 156.835]}
        rotation={[-Math.PI / 2, 0, 0.785]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box232_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[42.849, 54.982, 26.89]}
        rotation={[-0.596, 0.726, -2.816]}
        scale={[0.298, 0.73, 0.41]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box233_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[55.555, 52.388, 16.48]}
        rotation={[2.72, -0.571, -0.271]}
        scale={[0.298, 0.73, 0.41]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box234_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[57.637, 33.67, 18.13]}
        rotation={[-0.635, 0.84, -1.283]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box235_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[54.549, 44.111, 14.717]}
        rotation={[-0.635, 0.84, -1.283]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box236_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[52.399, 53.178, 11.016]}
        rotation={[-0.635, 0.84, -1.283]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box237_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[49.312, 63.618, 7.602]}
        rotation={[-0.635, 0.84, -1.283]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box238_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[47.244, 72.972, 5.923]}
        rotation={[-0.635, 0.84, -1.283]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box239_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[44.157, 83.413, 2.51]}
        rotation={[-0.635, 0.84, -1.283]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane016_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[102.306, 56.692, -10.12]}
        rotation={[-1.049, 0.535, -0.861]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane017_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[103.145, 56.692, -21.34]}
        rotation={[-2.202, 0.393, 1.073]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane018_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[89.59, 56.132, -18.601]}
        rotation={[-1.355, -0.258, -3.008]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane019_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[92.074, 56.132, -7.512]}
        rotation={[-1.245, 0.08, -1.915]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Sphere013_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[7.177, 41.42, 75.072]}
        rotation={[-0.549, -0.12, 2.058]}
        scale={2.617}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Sphere014_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[10.567, 41.42, 69.21]}
        rotation={[-1.625, -1.023, 2.119]}
        scale={2.617}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Sphere015_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[12.907, 40.591, 76.054]}
        rotation={[-1.625, -1.023, 2.119]}
        scale={2.617}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Sphere016_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[10.946, 44.008, 73.222]}
        rotation={[-1.625, -1.023, 2.119]}
        scale={2.617}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Sphere017_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[15.599, 40.305, 70.424]}
        rotation={[-1.625, -1.023, 2.119]}
        scale={2.617}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Sphere018_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[33.287, 41.566, 67.614]}
        rotation={[-0.483, -0.916, 1.575]}
        scale={2.617}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Sphere019_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[28.347, 41.347, 69.48]}
        rotation={[-2.019, 0.958, -2.05]}
        scale={2.617}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Cylinder034_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[38.833, 23.887, 38.462]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Cylinder035_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[23.148, 23.887, 30.939]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots010_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-1.059, -4.984, -61.498]}
        rotation={[-Math.PI / 2, 0, -1.34]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots011_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-20.002, -1.003, -109.009]}
        rotation={[-Math.PI / 2, 0, -1.34]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots012_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-52.807, 9.165, -42.951]}
        rotation={[Math.PI / 2, 1.222, 0.668]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots013_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-60.316, -4.984, -67.135]}
        rotation={[-Math.PI / 2, 0, 2.413]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots014_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-9.928, -4.984, -81.686]}
        rotation={[-Math.PI / 2, 0, 2.413]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots015_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-30.012, 9.165, -71.458]}
        rotation={[1.373, 0.058, 0.097]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane020_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-94.733, 57.88, 52.822]}
        rotation={[-1.569, -0.455, -3.023]}
        scale={[1.042, 1.001, 1.274]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane021_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-90.996, 57.88, 58.595]}
        rotation={[-1.199, -0.27, -2.055]}
        scale={[1.042, 1.001, 1.274]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane022_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-82.273, 57.88, 58.138]}
        rotation={[-1.225, 0.302, -0.765]}
        scale={[1.042, 1.001, 1.274]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane023_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-80.486, 57.88, 49.362]}
        rotation={[-1.828, 0.38, 0.732]}
        scale={[1.042, 1.001, 1.274]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane024_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-88.042, 57.88, 45.987]}
        rotation={[-2.021, -0.071, 1.832]}
        scale={[1.042, 1.001, 1.274]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane025_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-78.059, 56.132, 55.46]}
        rotation={[-1.625, 0.331, -0.409]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane026_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-92.185, 50.698, 60.911]}
        rotation={[-1.236, -0.006, -2.162]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane027_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-89.968, 47.816, 43.897]}
        rotation={[-1.695, -0.312, 2.18]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Sky_Material_#17_0"].geometry}
        material={materials.Material_17}
        position={[1.704, -1664.097, 9.463]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Sea_Material_#15_0"].geometry}
        material={materials.Material_15}
        position={[1.704, -1657.147, 9.463]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots016_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[19.451, 83.758, -1.272]}
        rotation={[-Math.PI / 2, 0, -0.599]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots017_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[5.643, 83.758, -1.133]}
        rotation={[-Math.PI / 2, 0, -0.599]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots018_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[19.316, 83.758, -15.036]}
        rotation={[-Math.PI / 2, 0, 2.892]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots019_Material_#11_0"].geometry}
        material={materials.Material_11}
        position={[28.519, 83.758, -5.398]}
        rotation={[-Math.PI / 2, 0, 2.892]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["obj_mini_rots020_Material_#11_0"].geometry}
        material={materials.Material_11}
        position={[18.212, 83.758, 13.519]}
        rotation={[-Math.PI / 2, 0, 2.892]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane028_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-106.858, 70.161, 211.966]}
        rotation={[-1.358, -0.29, -2.376]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane029_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-100.486, 70.161, 214.551]}
        rotation={[-1.213, -0.013, -1.488]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane030_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-103.794, 62.96, 205.308]}
        rotation={[-1.832, -0.248, 2.432]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane031_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-108.103, 65.081, 207.722]}
        rotation={[-1.569, -0.455, -3.023]}
        scale={[1.042, 1.001, 1.274]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane032_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-102.862, 57.88, 216.275]}
        rotation={[-1.199, -0.27, -2.055]}
        scale={[1.042, 1.001, 1.274]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane033_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-95.643, 65.081, 213.038]}
        rotation={[-1.225, 0.302, -0.765]}
        scale={[1.042, 1.001, 1.274]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane034_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-93.857, 65.081, 204.262]}
        rotation={[-1.828, 0.38, 0.732]}
        scale={[1.042, 1.001, 1.274]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane035_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-101.412, 65.081, 200.887]}
        rotation={[-2.021, -0.071, 1.832]}
        scale={[1.042, 1.001, 1.274]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane036_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-91.429, 63.333, 210.36]}
        rotation={[-1.625, 0.331, -0.409]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane037_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-105.555, 57.899, 215.811]}
        rotation={[-1.236, -0.006, -2.162]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Plane038_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[-103.338, 55.017, 198.797]}
        rotation={[-1.695, -0.312, 2.18]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Box240_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-54.045, 106.04, -30.489]}
        rotation={[-3.118, -1.444, -0.001]}
        scale={[0.087, 0.129, 0.271]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Sphere020_Material_#12_0"].geometry}
        material={materials.Material_12}
        position={[-19.81, 113.873, 14.838]}
        rotation={[-1.928, -0.985, 0.14]}
        scale={2.617}
      />
    </a.group>
  );
};

// useGLTF.preload("/smuggle_island.glb");

export default Island;
