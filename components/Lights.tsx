import React from "react";

type Props = {};

const Lights = (props: Props) => {
  return (
    <>
      {" "}
      //emits light from a distant source
      <directionalLight position={[1, 1, 1]} intensity={2} />
      <ambientLight intensity={0.5} />
      //emits light in shape of cone
      <spotLight />
      <pointLight />
      //illuminates with a gradient
      <hemisphereLight groundColor="#000000" />
    </>
  );
};

export default Lights;
