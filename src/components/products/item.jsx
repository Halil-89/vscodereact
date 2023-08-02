
import { message } from "antd";
import { addProduct } from "../../redux/cardslice"
import { useDispatch } from "react-redux"


const Item = ({ item }) => {



    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(addProduct({ ...item, quantity: 1 }));
        message.success("Ürün Sepete Eklendi");
    }; 

   


    return (
        <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none" onClick={handleClick}>
            <div className="product-image">
                <img
                    src={item.img}
                    alt=""
                    className="h-28 object-cover w-full border-b" />
            </div>
            <div className="product-info flex flex-col p-3">
                <span className="font-bold">{item.title}</span>
                <span>{item.price}₺</span>
            </div>
        </div>
    )
}

export default Item