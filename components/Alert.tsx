const Alert = ({ type, text }: any) => {
  return (
    <div className="absolute top-10 left-10 right-0 flex items-center justify-center">
      <div
        className={`${
          type === "danger" ? "bg-red-700" : "bg-blue-700"
        } p-3 items-center leading-none text-white flex lg:rounded-full lg:inline-flex`}
        role="alert"
      >
        <p
          className={`${
            type === "danger" ? "bg-red-400" : "bg-blue-400"
          } flex rounded-full uppercase mr-3 px-2 py-1 font-semibold text-sm`}
        >
          {type === "danger" ? "Failed" : "Success"}
        </p>
      </div>
      <p className="mr-2 text-left">{text}</p>
    </div>
  );
};

export default Alert;
