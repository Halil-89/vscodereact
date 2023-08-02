
import { Button, Form, Input, Carousel, Checkbox, message } from "antd"
import FormItem from "antd/es/form/FormItem"
import { Link } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthCarousel from "../../components/registerauth/authcarousel";


const Login = () => {


    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)




    const onFinish = async (values) => {
        //console.log(values);

        setLoading(true);

        try {
            const res = await fetch(process.env.REACT_APP_SERVER_URL +"/api/auth/login", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });

            const user = await res.json();

            if (res.status === 200) { 

                 
                       localStorage.setItem(
                           "posUser",
                           JSON.stringify({
                               username: user.user.username,
                               email: user.user.email,
                               userToken:user.userToken
                               
                           })
                       );

              
                message.success("Giriş İşlemi Başarılı.");
                
                navigate("/");
                setLoading(false);

            } else if (res.status === 404) {
                message.error("Kullanıcı adı bulunamadı!.");
            } else if (res.status === 403) {
                message.error("Şifre Yanlış!.");
            }
            setLoading(false);

        } catch (error) {
            console.log(error);
            message.error("Birşeyler yanlış gitti.");
            setLoading(false);
        }
    }
    return (
        <div className="h-screen">
            <div className="flex justify-between h-full">
                <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
                    <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
                    <Form layout="vertical" onFinish={onFinish} initialValues={{ remember: false }}>

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
                        <FormItem name={"remember"} valuePropName="checked">
                            <div className="flex justify-between items-center">
                                <Checkbox>Remember me</Checkbox>
                                <Link>Forgot Password?</Link>
                            </div>
                        </FormItem>

                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full"
                                size="large"
                                loading={loading}
                                >
                                    Giriş Yap
                            </Button>
                        </FormItem>
                    </Form>
                    <div className="flex justify-center absolute left-0 bottom-10 w-full">Henüz bir Hesabınız mı yok mu? &nbsp;
                        <Link to="/register" className="text-blue-500">Şimdi Kaydol</Link>
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

export default Login