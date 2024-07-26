import { useContext } from "react"
import EcomContext from "../context/EcomContext"
import ProductItems from "./ProductItems"
import { Link } from "react-router-dom";


function Featured() {
    const {featured} = useContext(EcomContext);

  return (
    <div className="mx-[5%]">
        <h1 className="py-[10px] text-xl tui font-bold">Featured Products</h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-2">
            {featured.map((item) =>(
            <ProductItems item={item} key={item._id} />
        ))}
        </div>
    </div>
  )
}

export default Featured