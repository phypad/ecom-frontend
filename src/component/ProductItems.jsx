import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import EcomContext from "../context/EcomContext";

function ProductItems({ item }) {
  const { addToCart, isAuthenticated } = useContext(EcomContext);
  const redirect = useNavigate();

  const login = () => {
    redirect("/login");
  };

  return (
    <div className="m-5 border-2 border-red-200 w-max rounded-lg shadow-lg shadow-red-200">
      <Link to={`/detail/${item._id}`}>
        <img
          src={"https://startech-ecom-api-scax.onrender.com/" + item.img}
          alt=""
          className="h-[200px] w-[250px] object-cover rounded-lg"
        />
      </Link>
      <div className="text-center my-5">
        <p className="text-2xl cam">{item.name}</p>
        <p className="py-3 text-xl cam">₦{item.price}</p>
        <button
          onClick={isAuthenticated ? () => addToCart(item._id) : login}
          className="bg-blue-950 text-white rounded p-[10px] cam"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductItems;
