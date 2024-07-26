import { Link } from "react-router-dom"
import { useContext, useEffect } from "react"
import EcomContext from "../../context/EcomContext"
import { useSearchParams } from "react-router-dom"

function ThankYou() {
  const {createOrder} = useContext(EcomContext)
  const [searchParams] = useSearchParams()
  const tx_ref = searchParams.get("tx_ref")
  const transaction_id = searchParams.get("transaction_id")

  useEffect(() => {
    if (transaction_id && tx_ref) {
      createOrder(transaction_id, tx_ref)
    }
  }, [transaction_id, tx_ref, createOrder])


  return (
    <div className="py-[5%] px-[10%] bg-cover bg-no-repeat text-center mb-[10%]" style={{backgroundImage:`url(/img/thanks.jpg)`, height: `100vh`}}>
        <div className="bg-white rounded-md py-[20px] opacity-85">
        <p className="text-xl">Thank you for your purchase. A representative will contact you shortly, Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit molestiae expedita soluta ducimus sequi repellat sapiente labore natus nostrum fugiat.</p>
        <Link to="/products">
            <button className="bg-blue-950 p-[10px] rounded-lg mt-[10px] text-white">Back to product</button>
        </Link>
        </div>
    </div>
  )
}

export default ThankYou