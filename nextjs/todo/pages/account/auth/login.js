//React
import { useState } from 'react';
//other
import accountStyle from '../../../styles/account.module.scss'
import axios from 'axios';
import Header from '../../../components/headers/PublickHeader.js'
//adnt design
import { Row, Col, Form, Input, Button, Checkbox, Spin, Result } from 'antd';
import { LoadingOutlined, UserOutlined, LockOutlined, GithubOutlined, GoogleOutlined, LinkedinOutlined, ConsoleSqlOutlined } from '@ant-design/icons';

//react query
import { useMutation } from "react-query"

//next js
import Link from "next/Link";
import { useRouter } from 'next/router'

//tosify imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const loginExpressApi = async (values)=>{
    await axios.post("/api/account/auth/login/", values)
}


const login = ()=>{
    const nextRouter = useRouter();
    const [spinState, setSpinState] = useState(false)
    const [indicatorIcon, setIndicatorIcon] = useState(<LoadingOutlined style={{ fontSize: 50, color:"black" }}/>)

    const { mutate:loginMutate } = useMutation(loginExpressApi, {
        onError:(err)=>{
            setSpinState(false)
            
            if(err.response.data.error){
                toast.error(`${err.response.data.error}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        },
        
        onSuccess: ()=>{
            setIndicatorIcon(<Result
                status="success"
                title="اطلاعات شما صحیح است"
                subTitle="در حال انتقال به پروفایل شما..."
                className='animate__animated animate__fadeInDown'
            />)

            setTimeout(()=>{
                nextRouter.replace("/account/dashboard")
            }, 1000)
        }
    })
    
    const onFinish = (values) => {
        setSpinState(true)
        loginMutate(values)

    };

    return(
        <Spin spinning={spinState} indicator={indicatorIcon}>
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
                                <span className={accountStyle.loginFormLoginText}>ورود</span>
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
                                        name="password"
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

                                    

                                    <Form.Item>
                                        <Form.Item  valuePropName="checked" noStyle>
                                            <Checkbox>من را بخاطر بسپار</Checkbox>
                                        </Form.Item>
                                        <a className={accountStyle.loginForgot} href="">
                                            رمز عبورم را فرموش کردم
                                        </a>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className={accountStyle.loginFormButton}>
                                            ورود
                                        </Button>

                                        <div className={accountStyle.loginCreateAccount}><span><Link href="/account/signup"><a>ساخت حساب جدید</a></Link></span></div>
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
                        <img src="/login.svg" />
                    </Col>
                </Row>

            </div>
       </Spin>

        
    )
}

export default login;