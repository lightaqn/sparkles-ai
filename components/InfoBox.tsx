import Link from "next/link";
import React from "react";

type Props = {
  text: string;
  btnText: string;
  link: string;
  color: string;
};

const InfoBox = ({ text, btnText, link, color }: Props) => {
  return (
    <div className="flex flex-col py-3 h-[10vh] shadow-lg shadow-purple-500/50 w-[20vw] bg-white rounded-2xl items-center justify-center">
      <div className="text-md lg:text-lg px-6 mt-3 leading-0 lg:tracking-wider ">
        <p>{text}</p>
      </div>
      <Link
        href={link}
        className="rounded-2xl shadow-lg border-2 mt-3 lg:mt-6 text-center font-bold text-2xl"
      >
        <button className="text-white bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/50 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 hover:font-extrabold active:text-orange-500 hover:transform hover:transition hover:duration-200 hover:ease-out whitespace-nowrap active:ease-in active:scale-95 hover:scale-105 active:border-b-8 active:border-purple-500/80">
          {btnText}
        </button>
      </Link>
    </div>
  );
};

export default InfoBox;
