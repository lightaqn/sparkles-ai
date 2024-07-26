import React from "react";
import { Html } from "@react-three/drei";

type Props = {};

const Loader = () => {
  return (
    <Html>
      <div className="flex justify-center items-center">
        <div className="w-20 h-20 border-opacity-50 border-t-4 border-blue-500 rounded-full animate-spin dark:border-gray-200" />
      </div>
    </Html>
  );
};

export default Loader;
