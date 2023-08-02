import { Button, Form, Input, message, Modal } from "antd";
import React from "react";




const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setCategories,
}) => {
  const [form] = Form.useForm();

  console.log(categories);

  const onFinish = (values) => {
    try {

      const user = JSON.parse(localStorage.getItem('posUser'));

      const isAdmin = JSON.parse(atob(user.userToken.split('.')[1])).isAdmin

      if (isAdmin === true) {
       
        fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/add-category", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "x-auth-token": user.userToken
          },
        });
        message.success("Kategori başarıyla eklendi.");
        form.resetFields();
        setCategories([
          ...categories,
          {
            _id: Math.random(),
            title: values.title,
          },
        ]);
      }else{
        message.error("Kategori eklemeye yetkiniz yok.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Yeni Kategori Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Kategori Ekle"
          rules={[{ required: true, message: "Kategori Alanı Boş Geçilemez!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
