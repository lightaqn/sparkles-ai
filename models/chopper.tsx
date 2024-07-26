import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Chopper = ({ isRotating, ...props }: any) => {
  const {
    nodes,
    materials,
    scene,
    animations,
  }: { nodes: any; materials: any; scene: any; animations: any } =
    useGLTF("/chopper.glb");
  const chopperRef = useRef<any>();
  const { actions }: { actions: any } = useAnimations(animations, chopperRef);

  useEffect(() => {
    Object.values(actions).forEach((action: any) => {
      action?.stop();
    });

    if (isRotating) {
      actions["Take 001"].play();
    }
  }, [isRotating]);

  useFrame(({ clock, camera }: any) => {
    chopperRef.current.position.y = Math.sin(clock.elapsedTime) * 0.5 + 9;

    if (chopperRef.current.position.x > camera.position.x) {
      chopperRef.current.rotation.y = Math.PI;
    } else if (chopperRef.current.position.x < camera.position.x) {
      chopperRef.current.rotation.y = 0;
    }

    if (chopperRef.current.rotation.y >= 10) {
      chopperRef.current.position.x -= 0.1;
      chopperRef.current.position.z += 0.1;
    } else {
      chopperRef.current.position.x += 0.1;
      chopperRef.current.position.z -= 0.1;
    }
  });

  return (
    <group ref={chopperRef} {...props}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          position={[-45, 20, 10]}
          rotation={[-Math.PI / 2, Math.PI, Math.PI]}
          scale={0.02}
          {...props}
        >
          <group
            name="4b705da7d69b434cb15ab96c886a00d0fbx"
            rotation={[-Math.PI, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.EC135_Rotor_Mat}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials.EC135_Rotor_Mat}
                    skeleton={nodes.Object_9.skeleton}
                  />
                  <skinnedMesh
                    name="Object_11"
                    geometry={nodes.Object_11.geometry}
                    material={materials.EC135_Glass_Mat}
                    skeleton={nodes.Object_11.skeleton}
                  />
                  <skinnedMesh
                    name="Object_13"
                    geometry={nodes.Object_13.geometry}
                    material={materials.EC135_PilotSeat_Mat}
                    skeleton={nodes.Object_13.skeleton}
                  />
                  <skinnedMesh
                    name="Object_15"
                    geometry={nodes.Object_15.geometry}
                    material={materials.EC135_PilotSeat_Mat}
                    skeleton={nodes.Object_15.skeleton}
                  />
                  <skinnedMesh
                    name="Object_17"
                    geometry={nodes.Object_17.geometry}
                    material={materials.EC135_Body_Back_Mat}
                    skeleton={nodes.Object_17.skeleton}
                  />
                  <skinnedMesh
                    name="Object_19"
                    geometry={nodes.Object_19.geometry}
                    material={materials.EC135_Body_Inner_Mat}
                    skeleton={nodes.Object_19.skeleton}
                  />
                  <skinnedMesh
                    name="Object_21"
                    geometry={nodes.Object_21.geometry}
                    material={materials.EC135_Bed_Mat}
                    skeleton={nodes.Object_21.skeleton}
                  />
                  <skinnedMesh
                    name="Object_23"
                    geometry={nodes.Object_23.geometry}
                    material={materials.EC135_PilotSeat_Mat}
                    skeleton={nodes.Object_23.skeleton}
                  />
                  <skinnedMesh
                    name="Object_25"
                    geometry={nodes.Object_25.geometry}
                    material={materials.EC135_Body_Outer_Mat}
                    skeleton={nodes.Object_25.skeleton}
                  />
                  <group name="Object_6" rotation={[Math.PI / 2, 0, 0]} />
                  <group name="Object_8" rotation={[Math.PI / 2, 0, 0]} />
                  <group name="Object_10" rotation={[Math.PI / 2, 0, 0]} />
                  <group name="Object_12" rotation={[Math.PI / 2, 0, 0]} />
                  <group name="Object_14" rotation={[Math.PI / 2, 0, 0]} />
                  <group name="Object_16" rotation={[Math.PI / 2, 0, 0]} />
                  <group name="Object_18" rotation={[Math.PI / 2, 0, 0]} />
                  <group name="Object_20" rotation={[Math.PI / 2, 0, 0]} />
                  <group name="Object_22" rotation={[Math.PI / 2, 0, 0]} />
                  <group name="Object_24" rotation={[Math.PI / 2, 0, 0]} />
                  <group name="EC135_Final" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="EC135_RotorRear" />
                    <group name="EC135_RotorMain" />
                    <group name="EC135_Glass" />
                    <group name="EC135_PilotSeat" />
                    <group name="EC135_PilotSeat2" />
                    <group name="EC135_CockpitButtons">
                      <mesh
                        name="EC135_CockpitButtons_EC135_CockpitButtons_Mat_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.EC135_CockpitButtons_EC135_CockpitButtons_Mat_0
                            .geometry
                        }
                        material={materials.EC135_CockpitButtons_Mat}
                      />
                    </group>
                    <group name="EC135_Body_Back" />
                    <group name="EC135_Body_Inner" />
                    <group name="EC135_Bed" />
                    <group name="EC135_BackSeats" />
                    <group name="EC135_Body_Outer" />
                  </group>
                  <group name="ResucePilot_Final1" rotation={[-Math.PI, 0, 0]}>
                    <group name="Human">
                      <group name="Eyes">
                        <mesh
                          name="Eyes_Body6_0"
                          castShadow
                          receiveShadow
                          geometry={nodes.Eyes_Body6_0.geometry}
                          material={materials.Body6}
                        />
                      </group>
                      <group name="Eyelashes">
                        <mesh
                          name="Eyelashes_Body6_0"
                          castShadow
                          receiveShadow
                          geometry={nodes.Eyelashes_Body6_0.geometry}
                          material={materials.Body6}
                        />
                      </group>
                    </group>
                    <group name="Shoes">
                      <mesh
                        name="Shoes_Shoes6_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Shoes_Shoes6_0.geometry}
                        material={materials.Shoes6}
                      />
                    </group>
                    <group name="Tops" rotation={[-Math.PI / 2, 0, 0]}>
                      <mesh
                        name="Tops_ResucePilot_Top_Mat_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Tops_ResucePilot_Top_Mat_0.geometry}
                        material={materials.ResucePilot_Top_Mat}
                      />
                    </group>
                    <group name="Bottoms" rotation={[-Math.PI / 2, 0, 0]}>
                      <mesh
                        name="Bottoms_ResucePilot_Bottoms_Mat_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.Bottoms_ResucePilot_Bottoms_Mat_0.geometry
                        }
                        material={materials.ResucePilot_Bottoms_Mat}
                      />
                    </group>
                    <group name="Helmet" rotation={[-Math.PI / 2, 0, 0]}>
                      <mesh
                        name="Helmet_ResucePilot_Helmet_Mat_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.Helmet_ResucePilot_Helmet_Mat_0.geometry
                        }
                        material={materials.ResucePilot_Helmet_Mat}
                      />
                    </group>
                    <group name="Body7">
                      <mesh
                        name="Body7_Body6_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Body7_Body6_0.geometry}
                        material={materials.Body6}
                      />
                    </group>
                  </group>
                  <group
                    name="ResucePilot_Final2"
                    position={[87.738, 0, 0]}
                    rotation={[-Math.PI, 0, 0]}
                  >
                    <group name="Human_1">
                      <group name="Eyes_1">
                        <mesh
                          name="Eyes_Body6_0_1"
                          castShadow
                          receiveShadow
                          geometry={nodes.Eyes_Body6_0_1.geometry}
                          material={materials.Body6}
                        />
                      </group>
                      <group name="Eyelashes_1">
                        <mesh
                          name="Eyelashes_Body6_0_1"
                          castShadow
                          receiveShadow
                          geometry={nodes.Eyelashes_Body6_0_1.geometry}
                          material={materials.Body6}
                        />
                      </group>
                    </group>
                    <group name="Shoes_1">
                      <mesh
                        name="Shoes_Shoes6_0_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.Shoes_Shoes6_0_1.geometry}
                        material={materials.Shoes6}
                      />
                    </group>
                    <group name="Tops_1" rotation={[-Math.PI / 2, 0, 0]}>
                      <mesh
                        name="Tops_ResucePilot_Top_Mat_0_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.Tops_ResucePilot_Top_Mat_0_1.geometry}
                        material={materials.ResucePilot_Top_Mat}
                      />
                    </group>
                    <group name="Bottoms_1" rotation={[-Math.PI / 2, 0, 0]}>
                      <mesh
                        name="Bottoms_ResucePilot_Bottoms_Mat_0_1"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.Bottoms_ResucePilot_Bottoms_Mat_0_1.geometry
                        }
                        material={materials.ResucePilot_Bottoms_Mat}
                      />
                    </group>
                    <group name="Helmet_1" rotation={[-Math.PI / 2, 0, 0]}>
                      <mesh
                        name="Helmet_ResucePilot_Helmet_Mat_0_1"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.Helmet_ResucePilot_Helmet_Mat_0_1.geometry
                        }
                        material={materials.ResucePilot_Helmet_Mat}
                      />
                    </group>
                    <group name="Body7_1">
                      <mesh
                        name="Body7_Body6_0_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.Body7_Body6_0_1.geometry}
                        material={materials.Body6}
                      />
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export default Chopper;
