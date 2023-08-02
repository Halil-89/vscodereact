import Header from '../components/header/header';
import StatisticCard from "../components/statistics/statisticCart"
import { useState, useEffect } from 'react';
import { Area, Pie } from '@ant-design/plots';
import { Spin } from 'antd';


const Statistic = () => {

  const [data, setData] = useState();
  const [products, setProducts] = useState([])
  const user = JSON.parse(localStorage.getItem("posUser"))

 

  useEffect(() => {
    asyncFetch();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL +"/api/products/get-all");
        const data = await res.json();

        setProducts(data);

      } catch (error) {
        console.log(error)
      }

    };
    getProducts();

  }, [])

  const asyncFetch = () => {
    fetch('http://localhost:5000/api/bills/get-all')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };



  const config = {
    data,
    xField: 'custumerName',
    yField: 'subTotal',
    xAxis: {
      range: [0, 1],
    },
  };

  const config1 = {
    appendPadding: 10,
    data,
    angleField: 'subTotal',
    colorField: 'custumerName',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Toplam\nDeğer',
      },
    },
  };
  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalNumber + total, 0);
    return `${amount.toFixed(2)} ₺`
  }


  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-4">İstatistiklerim</h1>

      {data ? (
        <div className='px-6 md:pb-0 pb-20'>
          <div className='statistic-section'>
            <h2 className='text-large'>Hoş Geldin
              <span className='text-green-700 font-bold text-xl'>{user.username}</span>
            </h2>
            <div className="statistic-carts grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
              <StatisticCard
                title={"Toplam Müşteri"}
                amaout={data?.length}
                img={"images/user.jpeg"} />
              <StatisticCard
                title={"Toplam Kazanç"}
                amaout={totalAmount()}
                img={"images/money.jpeg"} />
              <StatisticCard
                title={"Toplam Satış"}
                amaout={data?.length}
                img={"images/sale.png"} />
              <StatisticCard title={"Toplam Ürun"}
                amaout={products?.length}
                img={"images/total.png"} />

            </div>
            <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
              <div className="lg:w-1/2 lg:h-80 h8h-80">
                <Area {...config} />
              </div>
              <div className="lg:w-1/2 lg:h-80 h-72">
                <Pie {...config1} />

              </div>
            </div>
          </div>
        </div>
      ) : <Spin size="large" className="absolute top-1/2  h-screen w-screen flex justify-center" />}
    </>
  )
}

export default Statistic