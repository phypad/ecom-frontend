import { FaFacebook } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";


function Footer() {
  return (
    <div className="bg-blue-950 p-[5%] py-[3%] mt-10 flex lg:flex-row md:flex-row flex-col justify-between text-white text-center">
        <div>
            <p className="lg:text-[24px] md:text-[24px] text-[17px] text-white font-bold">Star Tech</p>
        </div>
        <div>
            <h3 className="mb-[10px] lg:text-lg md:text-lg text-[14px]">Useful Links</h3>
            <ul className="lg:text-lg md:text-lg text-[12px]">
                <li><a href="">Home</a></li>
                <li><a href="">Contact</a></li>
                <li><a href="">Privacy Policy</a></li>
                <li><a href="">Terms and Condition</a></li>
            </ul>
        </div>
        <div>
            <h3 className="mb-[10px] lg:mt-0 md:mt-0 mt-[10px] lg:text-lg md:text-[20px] cam text-[16px]">Follow us on our Socials</h3>
            <ul className="flex lg:gap-[20px] md:gap-[20px] gap-[17px] lg:text-2xl md:text-3xl text-[22.4px] justify-center">
                <li><FaFacebook /></li>
                <li><AiFillInstagram /></li>
                <li><FaSquareXTwitter /></li>
                <li><FaTiktok /></li>
            </ul>
        </div>
    </div>
  )
}

export default Footer