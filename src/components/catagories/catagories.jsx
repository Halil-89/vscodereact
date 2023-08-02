import { PlusOutlined, EditOutlined } from "@ant-design/icons"
import { useState, useEffect } from "react";
import Add from "./add"
import Edit from "./edit"
import "./style.css"


const Catagories = ({ categories, setCategories, setFiltered, products, admin }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [categoryTitle, setCategoryTitle] = useState("Tümü");

   

    useEffect(() => {
        if (categoryTitle === "Tümü") {
            setFiltered(products);
        } else {
            setFiltered(products.filter((item) => item.category === categoryTitle))
        }

    }, [products, setFiltered, categoryTitle]);




    return (
        <ul className=" flex gap-4 md:flex-col text-lg ">

            {categories.map((item) =>
                <li className={`catagory-item ${item.title === categoryTitle && "!bg-pink-700"}`}
                    key={item._id}
                    onClick={() => setCategoryTitle(item.title)}
                >
                    <span>{item.title}</span>
                </li>
            )}

            {
                admin === true ?

                    <li className="catagory-item !bg-purple-800 hover:opacity-90" onClick={() => setIsAddModalOpen(true)}>
                        <PlusOutlined className="md:text-2xl" />
                    </li>
                    : null}

            {
                admin === true ?

                    <li className="catagory-item !bg-orange-800 hover:opacity-90" onClick={() => setIsEditModalOpen(true)}>
                        <EditOutlined className="md:text-2xl" />
                    </li>

                    : null}


            <Add
                isAddModalOpen={isAddModalOpen}
                setIsAddModalOpen={setIsAddModalOpen}
                categories={categories}
                setCategories={setCategories} />

            <Edit
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                categories={categories}
                setCategories={setCategories} />
        </ul>
    )
}

export default Catagories