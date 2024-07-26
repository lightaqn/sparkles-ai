import React, { useRef, useState, useCallback, useEffect } from "react";
import { ArrowBigRight } from "lucide-react";

const blockOpacity = (sectionAdvance: any, blockNo: any) => {
  const advance = sectionAdvance - blockNo;
  if (advance >= 0 && advance < 1) return 1;
  return 0.19;
};

type Props = { scrollRef: any; texts: string[] };

const ScrollingParralax = ({ scrollRef, texts }: Props) => {
  const [scrollY, setscrollY] = useState(0);

  const handleScroll = useCallback(() => {
    setscrollY(window.scrollY);
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  //   const refContainer = useRef(null);

  const noOfPages = 6;
  let advance = 0;
  const { current: elContainer } = scrollRef;

  if (elContainer) {
    const { clientHeight, offsetTop } = elContainer;
    const screenH = window.innerHeight;
    const halfH = screenH / 2;
    const percent =
      Math.min(
        clientHeight + halfH,
        Math.max(-screenH, scrollY - offsetTop) + halfH
      ) / clientHeight;
    advance = Math.min(noOfPages - 0.5, Math.max(0.5, percent * noOfPages));
  }

  return (
    <div className="bg-transparent text-black pt-0 mt-0">
      <div className="flex flex-col justify-center items-center tracking-tight font-bold text-4xl min-h-screen max-w-6xl mt-0 mx-auto pb-10 px-20 lg:px-15 lg-text-6xl md:pb-25 md:text-5xl">
        <div className="leading-[1.5] mt-0">
          <div
            className="revealOpacity p-5 m-5 mt-0"
            style={{ opacity: blockOpacity(advance, 0) }}
          >
            {texts[0]}
            <span className="text-black text-md ml-5">{texts[1]}</span>
          </div>
          <span
            className="revealOpacity inline-block after:content-['_'] p-3 m-5"
            style={{ opacity: blockOpacity(advance, 1) }}
          >
            {texts[1]}
          </span>
          <span
            className="revealOpacity"
            style={{ opacity: blockOpacity(advance, 2) }}
          >
            {texts[2]}{" "}
          </span>
          <br />
          <span
            className="revealOpacity text-center gap-x-2 items-center justify-center flex  after:content-['_']  border-4 px-6 py-3 mx-6 p-3 m-5 mt-10 hover:bg-black whitespace-nowrap border-black rounded-2xl hover:shadow-lg hover:cursor-pointer hover:border-orange-500 hover:text-orange-500"
            style={{ opacity: blockOpacity(advance, 3) }}
          >
            {texts[3]} <ArrowBigRight className="text-4xl font-extrabold" />
          </span>
          <br />
          {/* <span
            className="revealOpacity border-4 px-6 py-3 mx-2 whitespace-nowrap border-gray-800"
            style={{ opacity: blockOpacity(advance, 4) }}
          >
            {texts[3]}{" "}
          </span> */}
          {/* <div
            className="revealOpacity flex mt-8 items-center justify-center"
            style={{ opacity: blockOpacity(advance, 5) }}
          >
            <span className="border-4 border-black rounded-2xl h-22 px-6 py-3 w-2/3  text-2xl font-bold whitespace-nowrap text-black  text-center">
              {texts[5]}
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ScrollingParralax;
