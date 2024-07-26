import { useState, useContext } from "react"
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import EcomContext from "../../context/EcomContext"
import { useNavigate } from "react-router-dom";

function Register() {
    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState(true)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const { showAndHide } = useContext(EcomContext)

    const redirect = useNavigate()

    const registerHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("https://startech-ecom-api-scax.onrender.com/api/register", {
                method: "POST", headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({ firstName, lastName, phone, email, password, confirmPassword })
            })
            
            const data = await res.json()
            if (data === "exists") {
                showAndHide("error", "User Already Exist")
            }else if (data === "do not match") {
                showAndHide("error", "Password do not match")
            }else if (data === "Invalid password") {
                showAndHide("error", "Password must be aleast 8 characters long and must contain one number and one letter")
            }else {
                redirect("/login")
                showAndHide("success", "You have successfully registered")
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="my-[5%] lg:mx-[30%] mx-[15%]">
        <h1 className="text-center mb-[10px] bg-gradient-to-bl from-blue-700 to-blue-950 text-white rounded-full text-2xl font-bold">Register Here</h1>
        <form onSubmit={registerHandler}>
            <div className="mb-3 space-y-[5px]">
                <label htmlFor="first name" className="mey text-[17px]">First Name :</label>
                <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} className="outline text-[15px] uio outline-1 rounded-sm w-full p-[10px]" />
                 </div>
                <div className="mb-3 space-y-[5px]">
                    <label htmlFor="last name" className="mey text-[17px]">Last Name :</label>
                    <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} className="outline text-[15px] uio outline-1 rounded-sm w-full p-[10px]" />
                </div>
                <div className="mb-3 space-y-[5px]">
                    <label htmlFor="phone number" className="mey text-[17px]">Phone Number :</label>
                    <input type="text" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} className="outline text-[15px] uio outline-1 rounded-sm w-full p-[10px]" />
                </div>
                <div className="mb-3 space-y-[5px]">
                    <label htmlFor="email address" className="mey text-[17px]">Email Address :</label>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="outline text-[15px] uio outline-1 rounded-sm w-full p-[10px]" />
                </div>
                <div className="mb-3 space-y-[5px]">
                    <label htmlFor="password" className="mey text-[17px]">Enter Password :</label>
                    <input type={visible ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} value={password} id="password" placeholder="Password" className="outline uio text-[15px] relative outline-1 rounded-sm w-full p-[10px]" />
                </div>
                <div className="absolute lg:bottom-[15px] md:bottom-[131px] bottom-[-19px] right-[55px] lg:right-[395px] md:right-[130px] p-[9px] uio text-[20px]" onClick={() => setVisible(!visible)}>
                    {
                        visible ? <IoMdEye /> : <IoMdEyeOff />
                    }
                 </div>
                <div className="mb-3 space-y-[5px]">
                    <label htmlFor="password" className="mey text-[17px]">Confirm Password :</label>
                    <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} className="outline text-[15px] outline-1 rounded-sm w-full uio p-[10px]" />
                </div>
                <div>
                    <button className="bg-blue-950 p-[10px] text-white rounded-lg">Register Here</button>
            </div>
        </form>
    </div>
  );
};

export default Register