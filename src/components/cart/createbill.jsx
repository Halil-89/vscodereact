import { Modal, Form, Input, Select, Button, Card, message } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/cardslice";
import { useNavigate } from 'react-router-dom';

const Createbill = ({ isModalOpen, setIsModalOpen }) => {

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate= useNavigate();

    const onFinish = async (values) => {
        // console.log('Success:', values);
        try {
            const res = await fetch(process.env.REACT_APP_SERVER_URL +"/api/bills/add-bill", {
                method: "POST",
                body: JSON.stringify({
                    ...values,
                    subTotal: cart.total,
                    tax: (cart.total * cart.tax) / 100,
                    totalNumber: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
                    cartItems: cart.cartItems,

                }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            if (res.status === 200) {
                message.success("Fatura başarıyle oluşturuldu.");
                dispatch(reset());
                navigate("/bills");
            }

        } catch (error) {
            console.log(error);
            message.error("Fatura  oluşturulamadı.");
        }
    };

    return (
        <>
            <Modal title="Fatura Oluştur"
                open={isModalOpen}
                footer={false}
                onCancel={() => setIsModalOpen(false)}


            >

                <Form layout={"vertical"} onFinish={onFinish}>
                    <Form.Item
                        label="Müşteri Adı"
                        name="custumerName"

                        rules={[
                            {
                                required: true,
                                message: 'Lütfen Müşteri adınızı giriniz',
                            },
                        ]}
                    >
                        <Input placeholder="Müşteri Adını Giriniz" />
                    </Form.Item>

                    <Form.Item
                        label="Tel No"
                        name="custumerPhoneNumber"

                        rules={[
                            {
                                required: true,
                                message: 'Lütfen Telefon Numaranızı Giriniz',
                            },
                        ]}
                    >
                        <Input placeholder="Tel No Giriniz" maxLength={11} />
                    </Form.Item>
                    <Form.Item
                        label="Ödeme Yöntemi"
                        name="paymentMode"
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen Ödeme Yöntemini Giriniz',
                            },
                        ]}
                    >
                        <Select placeholder="Ödeme Yönetemi Seçiniz">
                            <Select.Option value="Nakit">Nakit </Select.Option>
                            <Select.Option value="Kredi Kartı">Kredi Kartı </Select.Option>


                        </Select>
                    </Form.Item>


                    <Card>
                        <div className="flex justify-between">
                            <span>Ara Toplam</span>
                            <span>{cart.total > 0
                                ? (cart.total).toFixed(2)
                                : 0}₺</span>
                        </div>
                        <div className="flex justify-between my-2">
                            <span className="text-red-600">Kdv Toplam %{cart.tax}</span>
                            <span className="text-red-700">
                                {((cart.total * cart.tax) / 100) > 0
                                    ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                                    : 0}₺</span>
                        </div>
                        <div className="flex justify-between">
                            <b>Toplam</b>
                            <b>{(cart.total + (cart.total * cart.tax) / 100) > 0
                                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                                : 0}₺</b>
                        </div>
                        <div className="flex justify-end">
                            <Button className="mt-4"
                                type="primary"
                                size="large"
                                onClick={() => setIsModalOpen(true)}
                                htmlType="submit"

                            >
                                Sipariş Oluştur
                            </Button>
                        </div>

                    </Card>



                </Form>

            </Modal>
        </>
    )
}

export default Createbill