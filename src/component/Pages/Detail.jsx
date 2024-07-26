import { useParams } from "react-router-dom";
import { useContext } from "react";
import EcomContext from "../../context/EcomContext";

function Detail() {
  const param = useParams();
  const shoeid = param._id;
  const { product } = useContext(EcomContext);
  const shoeitem = product.find((item) => item._id === shoeid);

  return (
    <div className="flex px-[5%] py-[3%] justify-between flex-col lg:flex-row md:flex-row bg-[whitesmoke]">
      <div>
        <img
          src={"https://startech-ecom-api-scax.onrender.com/" + shoeitem?.img}
          alt=""
          className="lg:h-[400px] md:h-[300px] h-[300px] object-cover"
        />
      </div>
      <div className="lg:w-[50%] md:w-[45%] w-full lg:space-x-0 md:space-x-0 space-x-[10px]">
        <h2 className="lg:text-2xl md:text-2xl text-[17px] lg:mx-0 md:mx-0 mx-2 font-bold mb-[10px] border-b-2">
          {shoeitem?.name}
        </h2>
        <p className="lg:text-[17px] md:text-[17px] cam font-light text-[13px]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellendus eaque tenetur cupiditate architecto suscipit nostrum? Ex
          deserunt doloremque cupiditate.
        </p>
        <p className="py-3 lg:text-xl md:text-xl text-[15px] font-bold cam">
        ₦{shoeitem?.price}
        </p>
        <p className="mb-[10px] lg:text-[17px] md:text-[17px] text-[13px]">
          Category:{" "}
          <span className="text-blue-950 italic font-bold">
            {shoeitem?.category.name}
          </span>
        </p>
        <button className="bg-blue-950 text-white lg:text-[18px] md:text-[20px] text-[14px] rounded p-[10px] cam">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Detail;
