import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Robot = ({ currentAnimation, setCurrentAnimation, ...props }: any) => {
  const {
    nodes,
    materials,
    animations,
    scene,
  }: { nodes: any; scene: any; materials: any; animations: any } =
    useGLTF("/robot.glb");
  const robotRef = useRef<any>();
  const { actions }: { actions: any } = useAnimations(animations, robotRef);

  useEffect(() => {
    if (currentAnimation === "walk") {
      setCurrentAnimation("walk");
      Object.values(actions).forEach((action: any) => action.stop());
    } else if (currentAnimation === "run") {
      setCurrentAnimation("run");
    } else {
      setCurrentAnimation("idle");
    }
  }, [currentAnimation, actions]);

  const updateMotion = () => {
    const { rotation, position, scale } = robotRef.current;

    switch (currentAnimation) {
      case "walk":
        actions["CINEMA_4D_Main"].play();
        break;
      case "run":
        rotation.y += 0.05;
        position.z -= 0.01;
        break;
      case "idle":
      default:
        actions["CINEMA_4D_Main"].stop();
        rotation.y = 0;
        position.z = 0;

        break;
    }
  };

  useFrame(() => {
    updateMotion();
  });

  return (
    <group ref={robotRef} {...props}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="WALKfbx" rotation={[Math.PI / 2, 0, 0]} {...props}>
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="CINEMA_4D_Editor"
                  position={[506.22, 215.781, 382.678]}
                  rotation={[Math.PI, 0.652, 2.936]}
                >
                  <group name="Object_5" />
                </group>
                <group
                  name="OctaneCamera_1"
                  position={[1065.326, 286.368, 1206.777]}
                  rotation={[-Math.PI, 0.754, 3.03]}
                >
                  <group name="Object_7" />
                </group>
                <group
                  name="OctaneCamera"
                  position={[-1220.751, 249.789, -2476.77]}
                  rotation={[0, -1.114, -0.036]}
                >
                  <group name="Object_9" />
                </group>
                <group name="SPOT_DOG">
                  <group
                    name="SPOT_BODY"
                    position={[-0.554, 150, 9.057]}
                    rotation={[0.003, 0, -0.122]}
                  >
                    <mesh
                      name="SPOT_BODY__0"
                      castShadow
                      receiveShadow
                      geometry={nodes.SPOT_BODY__0.geometry}
                      material={materials["Scene_-_Root"]}
                    />
                    <group
                      name="FRONT_R_LEG"
                      position={[-41.856, -0.563, 89.784]}
                      rotation={[0.469, 0, 0]}
                    >
                      <group name="Object_14">
                        <primitive object={nodes._rootJoint} />
                        <skinnedMesh
                          name="Object_17"
                          geometry={nodes.Object_17.geometry}
                          material={materials["Scene_-_Root"]}
                          skeleton={nodes.Object_17.skeleton}
                        />
                        <group
                          name="Object_16"
                          position={[-41.733, 165.929, 82.393]}
                          rotation={[0.469, 0, 0]}
                        />
                        <group name="Root" rotation={[-0.469, 0, 0]} />
                      </group>
                    </group>
                    <group
                      name="REAR_R_LEG"
                      position={[-44.122, -0.315, -88.279]}
                    >
                      <group name="Object_23">
                        <primitive object={nodes._rootJoint_1} />
                        <skinnedMesh
                          name="Object_26"
                          geometry={nodes.Object_26.geometry}
                          material={materials["Scene_-_Root"]}
                          skeleton={nodes.Object_26.skeleton}
                        />
                        <group
                          name="Object_25"
                          position={[-44, 166.177, -95.669]}
                        />
                        <group name="Root_2" />
                      </group>
                    </group>
                    <group name="REAR_LEG" position={[43.878, -0.315, -88.279]}>
                      <group name="Object_32">
                        <primitive object={nodes._rootJoint_2} />
                        <skinnedMesh
                          name="Object_35"
                          geometry={nodes.Object_35.geometry}
                          material={materials["Scene_-_Root"]}
                          skeleton={nodes.Object_35.skeleton}
                        />
                        <group
                          name="Object_34"
                          position={[44, 166.177, -95.669]}
                        />
                      </group>
                    </group>
                    <group name="FRONT_LEG" position={[42.814, -0.315, 89.721]}>
                      <group name="Object_41">
                        <primitive object={nodes._rootJoint_3} />
                        <skinnedMesh
                          name="Object_44"
                          geometry={nodes.Object_44.geometry}
                          material={materials["Scene_-_Root"]}
                          skeleton={nodes.Object_44.skeleton}
                        />
                        <group
                          name="Object_43"
                          position={[42.937, 166.177, 82.331]}
                        />
                      </group>
                    </group>
                  </group>
                  <group
                    name="FRONLT_R_LEG_CONTROL"
                    position={[-41.806, -1.347, 170.71]}
                    rotation={[-2.444, 0, 0]}
                  />
                  <group
                    name="FRONT_L_LEG_CONTROL"
                    position={[42.525, -1.167, 29.773]}
                    rotation={[-2.245, 0, 0]}
                  />
                  <group
                    name="REAR_R_LEG_CONTROL"
                    position={[-44.064, -1.992, -158.474]}
                    rotation={[-2.553, 0, 0]}
                  />
                  <group
                    name="REAR_L_LEG_CONTROL"
                    position={[43.584, -0.817, -19.318]}
                    rotation={[-1.992, 0, 0]}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export default Robot;
