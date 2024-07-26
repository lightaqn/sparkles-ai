import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="w-full bg-black p-4 text-2xl flex items-center justify-center text-white h-[10vh] hover:backdrop-blur-lg dark:bg-white dark:text-gray-900">
      made with ❤️ by Light Analytics © <span className="">2023</span>
    </div>
  );
};

export default Footer;
