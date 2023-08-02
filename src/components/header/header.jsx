import { Badge, Input, message } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";
import {
    SearchOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    CopyOutlined,
    UserOutlined,
    BarChartOutlined,
    LogoutOutlined,
    UserAddOutlined,
}
    from '@ant-design/icons';



const Header = ({ setSearch }) => {

    const cart = useSelector((state) => state.cart);


    const { pathname } = useLocation();
    const navigate = useNavigate();
    const logOut = () => {
        if (window.confirm("Çıkış yapmak istediğimize emin misiniz?")) {
            localStorage.removeItem("posUser");
             //localStorage.clear();
             //window.location.reload();
            navigate("/login")
            message.success("Çıkış Yapıldı");
        }
    }


    const user = JSON.parse(localStorage.getItem('posUser'));

    const isAdmin = JSON.parse(atob(user.userToken.split('.')[1])).isAdmin

    return (
        <div className="border-b mb-6">
            <header className="py-4 px-6 flex justify-between items-center gap-10">
                <div className="logo">
                    <a href='/'>
                        <h2 className="text-2xl font-bold md:text-4xl">
                            LOGO
                        </h2>

                    </a>
                </div>
                <div className="header-search flex-1 flex justify-center"
                    onClick={() => {
                        pathname !== "/" && navigate("/")
                    }}
                >
                    <Input size="large"
                        placeholder="Ürün Ara..."
                        prefix={<SearchOutlined />}
                        className="rounded-full max-w-[800px]"
                        onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
                    />
                </div>
                <div className="menu-links">


                    <Link
                        to={"/"}
                        className={`menu-link ${pathname === "/" && "active"}`}>
                        <HomeOutlined className="md:text-2xl text-xl" />
                        <span className="md:text-xs text-[10px]">Ana Sayfa</span>
                    </Link>
                    {
                        isAdmin === true ?

                            <Link
                                to={"/users"}
                                className={`menu-link ${pathname === "/users" && "active"}`}>
                                <UserAddOutlined className="md:text-2xl text-xl" />
                                <span className="md:text-xs text-[10px]">Kullanıcı İşlemleri</span>
                            </Link>
                            : null}
                    <Badge count={cart?.cartItems?.length} offset={[0, 0]} className="md:flex hidden">

                        <Link
                            to={"/cart"}
                            className={`menu-link ${pathname === "/cart" && "active"}`}>

                            <ShoppingCartOutlined className="md:text-2xl text-xl" />
                            <span className="md:text-xs text-[10px]">Sepet</span>

                        </Link>
                    </Badge>



                    {
                        isAdmin === true ?

                            <Link
                                to={"/bills"}
                                className={`menu-link ${pathname === "/bills" && "active"}`}>
                                <CopyOutlined className="md:text-2xl text-xl" />
                                <span className="md:text-xs text-[10px]">Faturalar</span>
                            </Link>

                            : null}

                    {
                        isAdmin === true ?

                            <Link
                                to={"/customers"}
                                className={`menu-link ${pathname === "/customers" && "active"}`}>
                                <UserOutlined className="md:text-2xl text-xl" />
                                <span className="md:text-xs text-[10px]">Müşteriler</span>
                            </Link>
                            : null}

                    {
                        isAdmin === true ?
                            <Link
                                to={"/statistic"}
                                className={`menu-link ${pathname === "/statistic" && "active"}`}>
                                <BarChartOutlined className="text-2xl" />
                                <span className="md:text-xs text-[10px]">İstatistikler</span>
                            </Link>

                            : null}
                    <div onClick={logOut}>
                        <Link
                            className={`menu-link`}>
                            <LogoutOutlined className="md:text-2xl text-xl" />
                            <span className="md:text-xs text-[10px]">Çıkış</span>
                        </Link>
                    </div>
                </div>
                <Badge count={cart?.cartItems?.length} offset={[0, 0]} className="md:hidden flex">

                    <Link
                        to={"/"}
                        className={`menu-link`}>

                        <ShoppingCartOutlined className="md:text-2xl text-xl" />
                        <span className="md:text-xs text-[10px]">Sepet</span>

                    </Link>
                </Badge>
            </header>

        </div>
    )
}

export default Header