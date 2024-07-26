import { useContext } from "react";
import EcomContext from "../../context/EcomContext";

function Checkout() {
  const { cartItems, totalAmount } = useContext(EcomContext);

  const handleCheckout = async (e) => {
    e.preventDefault();

    const amount = totalAmount();
    const currency = "NGN";
    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;
    const phone = e.target.elements.phone.value;
    const address = e.target.elements.address.value;

    try {
      const res = await fetch("https://startech-ecom-api-scax.onrender.com/api/payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({
          amount,
          currency,
          firstName,
          lastName,
          phone,
          address,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        window.location.href = data.link;
      } else {
        console.error(data.msg || "Failed to initiate payment");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="lg:flex flex lg:flex-row md:flex-row flex-col lg:mx-[10%] md:mx-[10%] mx-[5%]">
      <div className="w-[100%]">
        <table className="w-[100%] mx-auto">
          <thead className="lg:text-[15px] md:text-[15px] text-[13px]">
            <th>Name</th>
            <th>Img</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Amount</th>
          </thead>
          <tbody className="text-center lg:text-[15px] md:text-[15.5px] text-[12.5px]">
            {cartItems.products?.map((item) => (
              <tr className="border-b-2">
                <td>{item.product.name}</td>
                <td className="flex justify-center">
                  <img
                    src={"https://startech-ecom-api-scax.onrender.com/" + item.product.img}
                    alt=""
                    className="lg:h-[70px] md:h-[70px] h-[50px] object-cover"
                  />
                </td>
                <td>₦{item.product.price}</td>
                <td>{item.quantity}</td>
                <td>₦{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <div>
            <p className="mt-[2%] lg:text-[15px] md:text-xl text-[13.5px]">
              Total Amount = ₦{totalAmount()}
            </p>
          </div>
        </div>
      </div>
      <div className="w-[100%] lg:mt-0 md:mt-0 mt-[10px] tui px-[20px]">
        <h1 className="text-center mb-[10px] lg:text-2xl md:text-2xl text-[20px] font-bold">
          Delivery Information
        </h1>
        <form onSubmit={(e) => handleCheckout(e)} className="mey">
          <div className="mb-3">
            <label htmlFor="first Name">First Name :</label>
            <input
              name="firstName"
              type="text"
              placeholder="Joseph"
              className="outline outline-1 text-[15px] rounded-sm w-full p-[10px]"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last name">Last Name</label>
            <input
              name="lastName"
              type="text"
              placeholder="John"
              className="outline outline-1 text-[15px] rounded-sm w-full p-[10px]"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone">Phone Number :</label>
            <input
              name="phone"
              type="Phone"
              placeholder="+234 912345678"
              className="outline outline-1 text-[15px] rounded-sm w-full p-[10px]"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address">Delivery Address :</label>
            <textarea
              type="address"
              name="address"
              className="outline outline-1 text-[15px] rounded-sm w-full p-[10px]"
              placeholder="No. 1 kareem laka"
            ></textarea>
          </div>
          <div>
            <button className="bg-blue-950 p-[10px] text-white rounded-lg">
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
