import { useState, useContext } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import EcomContext from "../../context/EcomContext";
import AuthContext from "../../context/AuthContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState("");
  const { showAndHide } = useContext(EcomContext);
  const [state, dispatch] = useContext(AuthContext);
  const { setItem } = useLocalStorage("auth-token");

  const redirect = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://startech-ecom-api-scax.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data === "invalid email or password") {
        showAndHide("error", "Invalid email/password");
      } else {
        dispatch({ type: "setToken", payload: data.token });
        setItem(data.token);
        redirect("/");
        showAndHide("success", "Login Successfull!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-[5%] lg:mx-[30%] mx-[15%] md:mx-[25%]">
      <h1 className="text-center mb-[10px] font-bold bg-gradient-to-bl from-blue-700 to-blue-950 rounded-full text-white text-2xl">
        Login Here
      </h1>

      <form onSubmit={loginHandler}>
        <div className="mb-3 space-y-[5px]">
          <label htmlFor="email address" className="mey text-[17px]">
            Enter Email Address
          </label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="outline shut text-[15px] outline-1 rounded-sm w-full p-[10px]"
          />
        </div>
        <div className="mb-3 space-y-[5px]">
          <label className="mey text-[17px]">Enter Password</label>
          <input
            type={visible ? "password" : "text"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="outline text-[15px] shut relative outline-1 rounded-sm md:w-full w-full lg:w-full p-[10px]"
          />
        </div>
        <div
          className="p-[9px] text-[20px] lg:right-[390px] absolute lg:top-[289.9px] bottom-[237px] right-[55px] md:top-[265px] md:right-[200.4px] transition duration-500"
          onClick={() => setVisible(!visible)}
        >
          {visible ? <IoMdEyeOff /> : <IoMdEye />}
        </div>
        <div>
          <button className="bg-blue-950 p-[10px] text-white rounded-lg">
            Login Here
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
