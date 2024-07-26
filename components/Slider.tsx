import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { team } from "@/lib/constants";

type Props = {};

const renderImages = team.map(({ id, img, text }: any) => (
  <div
    key={id}
    className="my-10 inline-flex items-center justify-center mx-4 h-full shadow-lg rounded-2xl"
    style={{ width: 500 + "px" }}
  >
    {/* <Image
      src={img}
      width={500}
      height={500}
      alt={text}
      className="rounded-2xl border-4 shadow-lg border-gray-400 h-full p-4"
      layout="responsive"
      objectFit="contain"
    /> */}
    <p className="text-center flex py-2 px-4 text-2xl text-sky-600 font-extrabold">
      {text}
    </p>
  </div>
));

const Slider = () => {
  let initialOffsetX: number = 0;
  let contentWidth: number = 12900;
  const [innerWidth, setInnerWidth] = useState(0);
  const refContainer = useRef<HTMLDivElement>(null);
  const refContent = useRef<HTMLDivElement>(null);
  const requestRef = useRef<any>(null);
  const refScrollX = useRef<number>(initialOffsetX);
  const scrollVelocity = 5;
  const active = innerWidth < contentWidth;

  const handleResize = useCallback(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  const animate = useCallback(() => {
    const { current: elContainer }: any = refContainer;
    const { current: elContent }: any = refContent;
    if (elContainer && elContent) {
      refScrollX.current += scrollVelocity;
      elContainer.scrollLeft = refScrollX.current;

      if (elContainer.scrollLeft >= elContent.clientWidth) {
        refScrollX.current = 0;
        elContainer.scrollLeft = 0;
      }
    }
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("scroll", handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (active) {
      requestRef.current = requestAnimationFrame(animate);
      return () => {
        if (requestRef.current) {
          return cancelAnimationFrame(requestRef.current);
        }
      };
    }
  }, [active, animate]);

  return (
    <div
      ref={refContainer}
      className="h-[10vh] min-h-[7vh] flex items-center justify-center overflow-x-hidden scrollbar-hidden whitespace-nowrap max-w-full pointer-events-none w-full bg-gradient-to-b from-white via-blue-200 to-cyan-400"
    >
      <div ref={refContent} className="inline-block space-x-10">
        {renderImages}
      </div>
      <div className={active ? "inline-block space-x-10" : "hidden"}>
        {renderImages}
      </div>
    </div>
  );
};

export default Slider;
