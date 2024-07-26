import Image from "next/image";
import ScrollingParralax from "./ScrollingParralax";
import { useRef } from "react";
import { scrollingCTATexts } from "@/lib/constants";

type Props = {};

const CTA = () => {
  const refContainer = useRef(null);

  return (
    <div ref={refContainer} className="relative w-screen h-screen">
      <Image
        src="/footer.gif"
        className=" "
        layout="fill"
        objectFit="cover"
        alt=""
      />
      <div className="bg-gray-300/30 backdrop-blur-md absolute  dark:bottom-0 top-0 left-0 right-0 items-center justify-center">
        {/* bottom-10 dark:top-10 */}
        <ScrollingParralax
          scrollRef={refContainer}
          texts={scrollingCTATexts}
        />{" "}
      </div>
    </div>
  );
};

export default CTA;
