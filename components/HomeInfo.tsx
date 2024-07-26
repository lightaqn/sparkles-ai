import InfoBox from "@/components/InfoBox";

const renderContent: any = {
  1: (
    <div className="flex space-y-4 flex-col px-6 py-3 items-center justify-center hover:backdrop-blur-lg hover:bg-gray-400/30 rounded-2xl hover:border-2 border-gray-100">
      <h1 className="text-3xl mb-4 font-extrabold leading-0 tracking-wide text-sky-200 whitespace-nowrap">
        Welcome to{" "}
        <span className="text-orange-500 text-5xl">Sparkles Island</span>
      </h1>

      <p className=" hover:text-sky-700 hover:transition-transform hover:duration-200 hover:ease-in-out hover:scale-110 text-lg text-white whitespace-nowrap">
        Scroll around to discover hidden gems and treasures
      </p>
    </div>
  ),
  2: (
    <InfoBox
      text="As part of our commitment to ..."
      btnText="Learn More..."
      link="/discover"
      color="red"
    />
  ),
  3: (
    <InfoBox
      text="We are available 24/7 on all major social media platforms"
      btnText="Lets Talk"
      link="/contact"
      color="blue"
    />
  ),
  4: (
    <InfoBox
      text="Click to enjoy signup bonus for free"
      btnText="register"
      link="/register"
      color="green"
    />
  ),
};

const HomeInfo = ({ currentStage }: any) => {
  return renderContent[currentStage] || null;
};

export default HomeInfo;
