import { Table, Input, Space, Button, Spin, Modal, Form, message, Select } from 'antd';
import Header from '../components/header/header';
import React, { useState, useEffect, useRef } from 'react';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';


const User = () => {

  const [billItems, setBillItems] = useState();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(editingItem)
   }, [form, editingItem])



  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/users/get-all")
        const data = await res.json();
        setBillItems(data);

        // console.log(data);


      } catch (error) {
        console.log(error)
      }
    };

    getBills();

  }, [])

  //console.log(editingItem);

  const onFinish = (values) => {

       console.log(values.isAdmin);

      try {
      
         fetch(process.env.REACT_APP_SERVER_URL + "/api/users/update-user", {
           method: "PUT",
           body: JSON.stringify({ ...values, userId: editingItem._id,password:values.passwordEdit,isAdmin:values.isAdmin }),
         
       
           headers: { "Content-type": "application/json; charset=UTF-8" },
         });
         message.success("Kullanıcı başarıyla güncellendi.");


      } catch (error) {
        message.error("Bir şeyler yanlış gitti.");
        console.log(error);
      }
 };

  //console.log(editingItem);


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
      title: 'Kullanıcı Adı',
      dataIndex: 'username',
      key: 'username',
      ...getColumnSearchProps('username'),
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },



    {
      title: "Action",
      dataIndex: "action",
      width: "15%",
      render: (_, record) => {


        return (
          <div>
            <Button
              type="link"
              className="pl-0"
              onClick={() => {
                setIsEditModalOpen(true);
                setEditingItem(record);
              }}
            >
              Düzenle
            </Button>
            <Button
              type="link"
              danger
            //onClick={() => deleteCategory(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },


  ];

  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-4">Kullanıcı İşlemleri</h1>
      {billItems ? (
        <div className='px-6'>
          <Table
            dataSource={billItems}
            columns={columns}
            bordered
            pagination={false}
            scroll={{
              x: 1000,
              y: 300,
            }}
            rowKey="_id"
          />;



          <Modal

            title="Kullanıcı Güncelleme Ekranı"

            open={isEditModalOpen}
            onCancel={() => setIsEditModalOpen(false)}
            footer={false}
          >

            <Form
              layout="vertical"
              onFinish={onFinish}
             // onClick={() => clearFilters && handleReset(clearFilters)}
              form={form}
              initialValues={{editingItem}}
            >


               <Form.Item
                name="username"
                label="Kullanıcı Adı"
                 rules={[
                   { required: true, message: "Kullanıcı Adı Alanı Boş Geçilemez!" },
                 ]}
              >
                {
                  // if(editingItem)
                  <Input  defaultValue={editingItem.username} placeholder="Ürün adı giriniz." readOnly/>
                 
                }

              </Form.Item> 


               <Form.Item
                name="email"
                label="E-mail"
                 rules={[
                   { required: true, message: "Email Alanı Boş Geçilemez!" },
                 ]}
              >

                <Input defaultValue={editingItem.email} placeholder="Ürün fiyatı giriniz." readOnly />
              </Form.Item> 

            

              <Form.Item
                name="passwordEdit"
                label="Yeni Şifre"
                 rules={[
                   { required: true, message: "Şifre Alanı Boş Geçilemez!" },
                 ]}
              >

                <Input  placeholder="Yeni Şifre giriniz." />
              </Form.Item>

              <Form.Item
                name="isAdmin"
                label="Admin mi?"
                 rules={[
                   { required: true, message: "Şifre Alanı Boş Geçilemez!" },
                 ]}
              >

                <Select
                  showSearch
                  placeholder="Search to Select"
                  defaultValue={editingItem.isAdmin === true ? "Evet" : "Hayır"}
                  options={[
                    {
                      value: true,
                      label: 'Evet',
                    },
                    {
                      value: false,
                      label: 'Hayır',
                    },
                   
                  ]}
                />

              </Form.Item>



              <Form.Item className="flex justify-end mb-0">
                <Button type="primary" htmlType="submit">
                  Güncelle
                </Button>
              </Form.Item>
            </Form>

          </Modal>

        </div>
      ) : <Spin size="large" className="absolute top-1/2  h-screen w-screen flex justify-center" />}
    </>
  )
}

export default User

