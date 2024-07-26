import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import EcomContext from "../../context/EcomContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, updateQuantity, totalAmount, deleteItem } =
    useContext(EcomContext);

  const cartTable = (
    <div>
      <table className="lg:w-[100%] md:w-[100%] w-[80%] lg:text-lg md:text-xl text-[12.5px] lg:mx-auto md:mx-auto mx-auto">
        <thead className="lg:text-lg md:text-lg lg:gap-0 md:gap-0 gap-[10px] text-[13px]">
          <th>Action</th>
          <th>Name</th>
          <th>Img</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Amount</th>
        </thead>
        <tbody className="text-center">
          {cartItems.products?.map((item) => (
            <tr className="border-b-2" key={item._id}>
              <td>
                <button onClick={() => deleteItem(item.product._id)}>
                  <MdDelete className="lg:text-2xl md:text-2xl text-xl flex text-blue-950" />
                </button>
              </td>
              <td>{item.product.name}</td>
              <td className="flex justify-center">
                <img
                  src={"https://startech-ecom-api-scax.onrender.com/" + item.product.img}
                  alt=""
                  className="lg:h-[70px] md:h-[70px] h-[45px] object-cover"
                />
              </td>
              <td>₦{item.product.price}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  className="outline lg:w-auto md:w-auto w-[45%] p-1 rounded outline-1"
                  onChange={(e) => updateQuantity(item.product._id, e.target.value)}
                />
              </td>
              <td>₦{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <div>
          <p className="mt-[2%] lg:text-[15px] md:text-xl font-bold text-[13.5px]">
            Total Amount: ₦{totalAmount()}
          </p>
        </div>
        <div>
          <Link to="/checkout">
            <button className="bg-blue-950 text-white p-[10px] rounded-lg duration-300 active:bg-blue-600">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
  return (
    <div className="my-[5%] mx-[7%]">
      <h1 className="text-center font-bold text-3xl mb-[5%]">Your Shop Cart</h1>
      {cartItems.products?.length > 0 ? (
        cartTable
      ) : (
        <p className="text-center">No Item in Cart!!!</p>
      )}
    </div>
  );
}

export default Cart;
