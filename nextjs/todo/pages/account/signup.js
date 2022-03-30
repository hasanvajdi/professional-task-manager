import accountStyle from '../../styles/account.module.scss'
import { Row, Col, Form, Input, Button, Checkbox  } from 'antd';
import { UserOutlined, LockOutlined, GithubOutlined, GoogleOutlined, LinkedinOutlined } from '@ant-design/icons';
import Header from '../../components/Header'
import axios from 'axios';
import { useMutation } from "react-query"
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const sginupExpressApi = async (values)=>{
    const a = await axios.post("/api/account/signup/", values)
    console.log('in express', a)
}

const login = ()=>{
    const notify = () => toast("Wow so easy !");

    const { mutate:signupMutate, isError } = useMutation(sginupExpressApi, {
        onError:(err)=>{
            console.log("err: ", err.response)
            toast.error('🦄 Wow so easy!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    })




    
    const onFinish = (values) => {
        signupMutate(values)
    };

    return(
       <div className={accountStyle.allElements}>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <Row className={accountStyle.headerRow}>
                <Col className={accountStyle.headerCol} span={24}>
                    <img src="/account-header.svg" className={accountStyle.headerImage }/>
                </Col>
                <Col className={accountStyle.loginHeaderCol}>
                    <Header />
                </Col>
            </Row>

            <Row className={`${accountStyle.mainRow} animate__animated animate__fadeInRight animate__delay-0.5s`} align="top" justify='start' wrap="false">
                <Col className={accountStyle.allOfForm} span={24}>
                    <Row>
                        <Col span={24} className={accountStyle.loginFormHeader}>
                            <UserOutlined className={accountStyle.loginFormUserIcon}/>
                            <span className={accountStyle.loginFormLoginText}>ساخت حساب</span>
                        </Col>
                    </Row>

                    <Row className={accountStyle.selfFormRow}>
                        <Col span={24} className={accountStyle.selfFormCol}>
                          
                           <Form
                                name="normal_login"
                                className={accountStyle.selfLoginForm}
                                size="large"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                            >

                                <Form.Item
                                    name="username"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'لطفا نام کاربری را وارد کنید!',
                                    },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="نام کاربری" />
                                </Form.Item>

                                <Form.Item
                                    name="password1"
                                    style={{marginTop:"10px"}}
                                    rules={[
                                    {
                                        required: true,
                                        message: 'لطفا رمز عبور را وارد کنید!',
                                    },
                                    ]}
                                >
                                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="رمز عبور" />
                                </Form.Item>

                                <Form.Item
                                    name="password2"
                                    style={{marginTop:"10px"}}
                                    rules={[
                                    {
                                        required: true,
                                        message: 'لطفا تکرار رمز عبور را وارد کنید!',
                                    },
                                    ]}
                                >
                                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="تکرار رمز عبور" />
                                </Form.Item>


                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className={accountStyle.loginFormButton}>
                                        ایجاد
                                    </Button>

                                    <div className={accountStyle.loginCreateAccount}><span><Link href="/account/login"><a>قبلا حساب ساخته ام</a></Link></span></div>
                                </Form.Item>

                            </Form>


                        </Col>
                    </Row>

                    <Row className={accountStyle.loginSocial}>

                        <Col span={7} className={accountStyle.loginGithub}>
                            <GithubOutlined className={accountStyle.socialLoginIcon}/>
                            <span>Github</span>
                        </Col>

                        <Col span={7} className={accountStyle.loginGmail}>
                            <GoogleOutlined className={accountStyle.socialLoginIcon}/>
                            <span>Gmail</span>
                        </Col>

                        <Col span={7} className={accountStyle.loginLinkedin}>
                            <LinkedinOutlined className={accountStyle.socialLoginIcon}/>
                            <span>Linkedin</span>

                        </Col>

                    </Row>
                </Col>
                
                
            </Row>
            
            <Row className={`${accountStyle.loginSideTextRow} animate__animated animate__fadeIn animate__delay-1s`}>
                <Col span={20} className={accountStyle.loginSideTextCol} >
                    <p>
                    لورم ایپسوم یا طرح‌نما طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیرآنها با استفاده از خود را صفحه‌آرای را به پایان برند.                    </p>
                </Col>
            </Row>

       </div>

        
    )
}

export default login;