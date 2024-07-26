import React from "react";
import { Close, CheckMark } from "@/lib/assets/svg";

import { Check } from "lucide-react";

type Props = {};

const Banner = (props: Props) => {
  return (
    <div className="flex flex-col my-10 items-center justify-center text-center gap-y-6 h-[80vh]">
      <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-500 font-bold tracking-wide leading-6 whitespace-nowrap cursor-not-allowed dark:text-white">
        Take advantage of our end of the year promo
      </h2>

      <h1 className="my-8 text-5xl hover:scale-110 bg-gradient-to-r from-orange-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-center md:text-6xl lg:text-7xl font-extrabold text-gradient-to-r lg:tracking-wider leading-10">
        lets take your business to the next level
      </h1>
      <strong
        className="hidden my-6 gap-y-6 md:flex flex-col md:text-md lg:text-lg text-gray-800 
        dark:text-white"
      >
        <span className="text-2xl">
          with artificially intelligent customer support assistants and
          automated bots that know you and your business better than you ever
          could,
        </span>

        <span className="text-2xl">
          and can draw meaningful insights from data and answer queries with
          ease{" "}
        </span>
      </strong>
      <div
        className="text-gray-800 my-10 flex text-center gap-6
        dark:text-white"
      >
        <span className="flex gap-x-2 text-2xl">
          <Check />
          Instagram
        </span>
        <span className="flex gap-x-2 text-2xl">
          <Check />
          Whatsapp
        </span>
      </div>

      <button className="filledbutton my-6 w-2/3 lg:w-1/4 uppercase">
        Start for free
      </button>

      <div className="my-4 py-4 px-2 grid grid-cols-2 items-center justify-center gap-x-4">
        <div className="flex items-center justify-around gap-x-2 mx-2">
          <div
            className="bg-gradient-to-r p-4 rounded-full focus:ring-4 focus:ring-purple-500 from-orange-600 via-green-500 to-indigo-400 font-semibold flex text-center items-center justify-center text-sm lg:text-md 2xl:text-lg text-black hover:text-lime-500
            dark:text-white"
          >
            <CheckMark />
          </div>

          <span
            className="text-sm lg:text-md 2xl:text-lg font-medium text-black hover:text-lime 
            dark:text-white "
          >
            No credit card required
          </span>
        </div>

        <div className="flex items-center justify-around gap-x-2 mx-2">
          <div className="bg-gradient-to-r p-4 rounded-full focus:ring-4 focus:ring-purple-500 from-orange-600 via-green-500 to-indigo-400 font-semibold flex text-center items-center justify-center text-sm lg:text-md 2xl:text-lg text-black hover:text-lime-500 dark:text-white">
            <CheckMark />
          </div>

          <span
            className="text-sm lg:text-md 2xl:text-lg font-medium text-black hover:text-lime
            dark:text-white "
          >
            Free trial included
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
