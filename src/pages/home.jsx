import Header from "../components/header/header";
import Categories from "../components/catagories/catagories";
import Products from "../components/products/products";
import Cardtotals from "../components/cart/carttotals";
import { useEffect, useState } from "react";
import { Spin } from "antd";


const Home = () => {
  const [categories, setCategories] = useState()
  const [products, setProducts] = useState()
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState("")
  const [admin, setAdmin] = useState(false)




  useEffect(() => {
    const adminmi = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('posUser'));
        const isAdmin = JSON.parse(atob(user.userToken.split('.')[1])).isAdmin

        
        setAdmin(isAdmin);

      } catch (error) {
        console.log(error)
      }

    };
    adminmi();

  }, [])



  useEffect(() => {
    const getCategories = async () => {


      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/categories/get-all");
        const data = await res.json();
        //console.log(data);


        data &&
          setCategories(data?.map((item) => {
            return { ...item, value: item.title };
          }));


      } catch (error) {
        console.log(error)
      }

    };
    getCategories();

  }, [])



  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
        const data = await res.json();

        setProducts(data);

      } catch (error) {
        console.log(error)
      }

    };
    getProducts();

  }, [])



  //console.log(search);


  return (
    <>
      <Header setSearch={setSearch} />
      {products && categories ? (
        <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24 h-screen">
          <div className="categories  overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
            <Categories
              categories={categories}
              setCategories={setCategories}
              setFiltered={setFiltered}
              products={products}
              admin={admin}
            />
          </div>
          <div className="product flex-[8] max-h-[calc(100vh_-_112px)] overflow-auto pb-10 min-h-[500px]">
            <Products
              categories={categories}
              filtered={filtered}
              products={products}
              setProducts={setProducts}
              search={search}
              admin={admin}
            />
          </div>
          <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
            <Cardtotals />
          </div>
        </div>
      ) : <Spin size="large" className="absolute top-1/2  h-screen w-screen flex justify-center" />}
    </>
  )
}

export default Home