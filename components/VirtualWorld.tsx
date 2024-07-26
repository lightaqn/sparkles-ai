"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import Island from "@/models/island";
import Sky from "@/models/sky";
import Bird from "@/models/bird";
import Plane from "@/models/plane";
import Chopper from "@/models/chopper";
import Boat from "@/models/boat";
import HomeInfo from "@/components/HomeInfo";
import Lights from "@/components/Lights";
import Loader from "@/components/Loader";
import { OrbitControls } from "@react-three/drei";

type Props = {};
const VirtualWorld = (props: Props) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio("/audio.mp3"));
  audioRef.current.volume = 0.5;
  audioRef.current.loop = true;
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlayingMusic]);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;

    let screenPosition = [0, -62, -286];
    let rotation = [0.1, 4.7, 0];

    if (innerWidth < 768) {
      screenScale = [0.5, 0.5, 0.5];
    } else {
      screenScale = [0.75, 0.75, 0.75];
    }
    return [screenScale, screenPosition, rotation];
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }
    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <div className="absolute z-10 top-28 right-0 left-0 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <Lights />
          <Bird />

          <Sky isRotating={isRotating} />

          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Boat />
          <Chopper isRotating={isRotating} />

          <Plane
            position={planePosition}
            scale={planeScale}
            rotation={[0, 20, 0]}
            isRotating={isRotating}
          />
          <OrbitControls />
        </Suspense>
      </Canvas>
      <div className="z-50 absolute bottom-20 left-20 flex w-[10vw] h-[10vh]">
        <button
          className="text-white p-2 h-1/2 w-1/2 bg-black font-bold rounded-full hover:scale-110 hover:transition hover:transform hover:duration-400 hover:ease-in-out"
          onClick={() => setIsPlayingMusic((prev: any) => !prev)}
        >
          {isPlayingMusic ? "Pause" : "Play"}
        </button>
      </div>
    </section>
  );
};

export default VirtualWorld;
