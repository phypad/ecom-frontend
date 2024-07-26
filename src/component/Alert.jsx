import { useContext } from "react";
import EcomContext from "../context/EcomContext";

function Alert() {
  const { alertInfo } = useContext(EcomContext);

  return (
    <div>
      {alertInfo.show && (
        <div
          className={`${
            alertInfo.type === "success" ? "bg-green-600" : "bg-red-600"
          } fixed lg:top-[67px] md:top-70 top-[68px] z-[30] lg:w-[25%] md:w-[30%] lg:text-[18px] md:text-[25px] tui w-[60%] m-auto left-0 right-0 rounded text-center text-white p-[10px]`}
        >
          {alertInfo.message}
        </div>
      )}
    </div>
  );
}

export default Alert;
