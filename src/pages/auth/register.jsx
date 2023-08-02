
import { Button, Form, Input, Carousel, message } from "antd"
import FormItem from "antd/es/form/FormItem"
import { Link } from "react-router-dom"
import { reset } from "../../redux/cardslice";
import { useDispatch } from "react-redux";
import AuthCarousel from "../../components/registerauth/authcarousel";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await fetch(process.env.REACT_APP_SERVER_URL +"/api/auth/register", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            if (res.status === 200) {
                message.success("Kullanıcı başarıyle oluşturuldu.");
                dispatch(reset());
                navigate("/login");
                setLoading(false);

            }

        } catch (error) {
            console.log(error);
            message.error("Birşeyler yanlış gitt.");
        }
    }

    return (
        <div className="h-screen">
            <div className="flex justify-between h-full">
                <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
                    <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
                    <Form layout="vertical" onFinish={onFinish}>
                        <FormItem
                            label="Kullanıcı Adı"
                            name={"username"}
                            rules={[{
                                required: true,
                                message: "Kullanıcı Adını Girniz"
                            }]}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label="Email"
                            name={"email"}
                            rules={[{
                                required: true,
                                message: "E-mail Girniz"
                            }]}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label="Şifre"
                            name={"password"}
                            rules={[{
                                required: true,
                                message: "Şifre Girniz"
                            }]}
                        >
                            <Input.Password />
                        </FormItem>
                        <FormItem
                            label="Şifre Tekrar"
                            name={"passwordAgain"}
                            rules={[{
                                required: true,
                                message: "Şifre Tekrar Girniz"
                            }]}
                        >
                            <Input.Password />
                        </FormItem>
                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full"
                                size="large"
                                loading={loading}
                            >
                                Kaydol

                            </Button>
                        </FormItem>
                    </Form>
                    <div className="flex justify-center absolute left-0 bottom-10 w-full">Bir Hesabınız mı varmı? &nbsp;
                        <Link to="/login" className="text-blue-500">Şimdi giriş yap</Link>
                    </div>
                </div>
                <div className=" xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden min-w[800px] bg-[#6c63ff] h-full">
                    <div className="w-full h-full flex items-center">
                        <div className="w-full">

                            <Carousel className="!h-full px-6" autoplay >
                                <AuthCarousel
                                    img={"/images/responsive.svg"}
                                    title={"Responsive"}
                                    desc={"Tüm Cihaz Boyutlarında Uyumluluk"}
                                />
                                <AuthCarousel
                                    img={"/images/statistic.svg"}
                                    title={"İstatistikler"}
                                    desc={"Geniş Tutulan İstatistikler"}
                                />
                                <AuthCarousel
                                    img={"/images/customer.svg"}
                                    title={"Mişteri Memnuniyeti"}
                                    desc={"Deneyim Sonunda Üründen Menunun Müşteriler"}
                                />
                                <AuthCarousel
                                    img={"/images/admin.svg"}
                                    title={"Yönetici Paneli"}
                                    desc={"Tek Yerden Yönetim"}
                                />

                            </Carousel>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register