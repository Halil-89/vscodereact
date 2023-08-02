import { useState } from "react"
import ProductItem from "./item"
import { PlusOutlined, EditOutlined } from "@ant-design/icons"
import Add from "../products/add"
import { useNavigate } from "react-router-dom"

const Products = ({ categories, filtered, products, setProducts, search, admin }) => {

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();




  return (
    <div className="products-wrapper grid grid-cols-card gap-4">
      {filtered
        .filter((product) => product.title.toLowerCase().includes(search))
        .map((item) => (
          <ProductItem item={item} key={item._id} />
        ))}

      {
        admin === true ?
          <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-purple-800 flex justify-center items-center hover:opacity-90 min-h-[180px]">
            <PlusOutlined className="text-white md:text-2xl" onClick={() => setIsAddModalOpen(true)} />
          </div>
          : null}
      {
        admin === true ?
          <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none
       bg-orange-800 flex justify-center items-center hover:opacity-90  min-h-[180px]" onClick={() => navigate("/product")}>
            <EditOutlined className="text-white md:text-2xl" />
          </div>
          : null}
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        setProducts={setProducts}
        products={products}
      />


    </div>
  )
}

export default Products
