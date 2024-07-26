import { useContext } from "react"
import EcomContext from "../context/EcomContext"
import ProductItems from "./ProductItems"
import { Link } from "react-router-dom"


function TopSelling() {
  const {topSelling} = useContext(EcomContext)

  return (
    <div className="mx-[5%]">
      <h1 className="py-[12px] text-xl tui font-bold">Top Selling</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2">
        {topSelling.map((item) =>(
          <ProductItems item={item} key={item._id} />
        ))}
      </div>
    </div>
  )
}

export default TopSelling