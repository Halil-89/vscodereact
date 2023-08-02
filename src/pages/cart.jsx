import React, { useState,useRef } from 'react';
import { Button, Card, Popconfirm, Table, message,Input, Space } from 'antd';
import Header from '../components/header/header';
import Createbill from '../components/cart/createbill';
import { useSelector, useDispatch } from "react-redux";
import { PlusCircleOutlined, MinusCircleOutlined,SearchOutlined } from '@ant-design/icons';
import { increase, decrease, deleteCart } from "../redux/cardslice";
import Highlighter from 'react-highlight-words';


function Cart() {
    // "modal" adında yeni bir state değişkeni tanımlayın.
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };

      const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
      };

      const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div
            style={{
              padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({
                    closeDropdown: false,
                  });
                  setSearchText(selectedKeys[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                close
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1890ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{
                backgroundColor: '#ffc069',
                padding: 0,
              }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });



    const columns = [
        {
            title: 'Ürün Görseli',
            dataIndex: 'img',
            key: 'img',
            width: "125px",
            render: (text) => {
                return (<img src={text} alt='' className='w-full h-20 object-cover' />)
            }
        },
        {
            title: 'Ürün Adı',
            dataIndex: 'title',
            key: 'title',
            ...getColumnSearchProps('title'),
        },
        {
            title: 'Kategori',
            dataIndex: 'category',
            key: 'category',
            ...getColumnSearchProps('category'),
        },
        {
            title: 'Ürün Fiyatı',
            dataIndex: 'price',
            key: 'price',
            render: (text) => {
                return (
                    <span>{text.toFixed(2)}₺</span>
                )
            },
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Ürün Adeti',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record) => {
                return (
                    <div className="flex items-center">
                        <Button
                            type="primary"
                            size="middle"
                            className="w-full flex items-center justify-center !rounded-full"
                            icon={<PlusCircleOutlined />}
                            onClick={() => dispatch(increase(record))}
                        />
                        <span className="font-bold w-6 inline-block text-center">
                            {record.quantity}
                        </span>
                        <Button
                            type="primary"
                            size="middle"
                            className="w-full flex items-center justify-center !rounded-full"
                            icon={<MinusCircleOutlined />}
                            onClick={() => {
                                if (record.quantity === 1) {
                                    if (window.confirm("Ürün Silinsin mi?")) {
                                        dispatch(decrease(record));
                                        message.success("Ürün Sepetten Silindi");
                                    }
                                }

                                if (record.quantity > 1) {
                                    dispatch(decrease(record));
                                }

                            }}
                        />
                    </div>
                )
            }
        },

        {
            title: 'Toplam Fiyat',
            render: (_, record) => { // record gönderilen deger demek
                return (
                    <span>{record.quantity * record.price.toFixed(2)}₺</span>
                )
            }
        },
        {
            title: 'İşlemler',
            render: (_, record) => {
                return (
                    <Popconfirm
                        title="Silmek istediğinize emin misiniz?"
                        onConfirm={() => {
                            dispatch(deleteCart(record));
                            message.success("Ürün Sepetten Silindi.");

                        }}
                        okText="Evet"
                        cancelText="Hayır"
                    >
                        <Button
                            type="link"
                            danger
                        >
                            Sil
                        </Button>
                    </Popconfirm>
                )
            }
        },
    ];

    return (
        <>
            <Header />
            <div>
                <Table
                    dataSource={cart.cartItems}
                    columns={columns}
                    bordered
                    pagination={false}
                    scroll={{
                        x: 1200,
                        y: 300,
                    }}

                />;
                <div className="cart-total flex justify-end mt-4">
                    <Card className="w-72">
                        <div className="flex justify-between">
                            <span>Ara Toplam</span>
                            <span>{cart.total > 0
                                ? (cart.total).toFixed(2)
                                : 0}₺</span>
                        </div>
                        <div className="flex justify-between my-2">
                            <span className="text-red-600">Kdv Toplam %8</span>
                            <span>
                                {((cart.total * cart.tax) / 100) > 0
                                    ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                                    : 0}₺
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <b>Toplam</b>
                            <b>
                                {(cart.total + (cart.total * cart.tax) / 100) > 0
                                    ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                                    : 0}₺
                            </b>
                        </div>
                        <Button
                            className="mt-4 w-full"
                            type="primary"
                            size="large"
                            onClick={() => setIsModalOpen(true)}
                            disabled={cart?.cartItems?.length === 0}>
                            Sipariş Oluştur
                        </Button>
                    </Card>
                </div>
            </div>
            <Createbill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    );
}

export default Cart







