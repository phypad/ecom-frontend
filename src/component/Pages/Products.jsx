import { useContext } from "react"
import EcomContext from "../../context/EcomContext"
import ProductItems from "../ProductItems"


function Products() {
    const {product} = useContext(EcomContext)

  return (

    <div className="mx-[5%]">
    <h1 className="py-[10px] text-xl font-bold">All Products</h1>
    <div className="grid md:grid-cols-2 lg:grid-cols-4">
        {product.map((item)=>(
          <ProductItems key={item._id} item={item} />
        ))}
    </div>
    </div>
  )
}

export default Products