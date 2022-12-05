import { useState } from "react";
import {
    Form,
    Input,
    Space,
    Button,
    Layout,
    Typography,
} from "antd";
import "./Login.css";
import { CookieUtil } from "../../Utils";
import {OtherPageNavBarNoLogin} from "../../Components/NavBar/OtherPageNavBarNoLogin" ;


const api = "/api/login";
const { Title } = Typography;

function Login(props) {
    const [message, setMessage] = useState(null);
    const OtherPageNavBarNoLoginHeaderBlock = props.OtherPageNavBarNoLoginHeaderBlock;
    const onFinish = (values) => {
        let userData = values.user;
        let data = new FormData();
        data.append("account", userData.account);
        data.append("password", userData.password);
    
        fetch(
            api,
            {
                body : data,
                method : "POST",
            }
        )
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            if (data.hasOwnProperty("jwt")) {
                console.log(data);
                let token = data.jwt;
                CookieUtil.set("token", token);
                alert("登入成功!");
                if(data.message === "登入成功!"){
                    window.location.href='/PostList';
                } 
            }
            else {
                console.log(data);
                alert("帳號或密碼錯誤!");
                setMessage(data.message)
            }
        })
        .catch((error) => {
            console.log(`Error: ${error}`);
        })
    };

    const LoginContentBlock = (
        <>
            <Layout>
                <Space 
                    style={{
                        paddingTop:'20px',
                    }}
                    direction="vertical"
                >
                    <Title 
                        style={{
                            fontSize:'40px',
                            textAlign:'center',
                        }}
                        level={3}
                    >
                        登入
                    </Title>
                </Space>

                <Space
                    style={{
                        justifyContent:'center',
                    }}
                >
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        onFinish={onFinish}
                        wrapperCol={{
                            span: 16,
                        }}
                    >
                        <Form.Item
                            name={['user', 'account']}
                            label="Account"
                            rules={[
                                {
                                    message: 'Please enter your account!',
                                    required: true,
                                },
                            ]}
                        >
                            <Input 
                                style={{
                                    width:'250px',
                                }}
                                placeholder="請輸入帳號或名稱...." 
                            />
                        </Form.Item>
    
                        <Form.Item
                            name={['user', 'password']}
                            label="Password"
                            rules={[
                                {
                                    message: 'Please enter your password!',
                                    required: true,
                                },
                            ]}
                        >
                            <Input.Password 
                                style={{
                                    width:'250px',
                                }}
                                placeholder="請輸入密碼...."
                            />
                        </Form.Item>
    
                        <Form.Item
                            style={{
                                display: 'flex',
                                justifyContent:'center',
                            }}
                            wrapperCol={{
                                span: 16,
                                offset: 8,
                            }}
                        >
                            <Button 
                                type="primary" 
                                onClick={ () => Form.submit()}
                                htmlType="submit"
                            >
                                登入
                            </Button>
                        </Form.Item>
                    </Form>
                </Space> 

                <Space
                    style={{
                        display: 'flex',
                        justifyContent:'center',
                    }}
                >
                    <div>
                        還沒有帳號?
                        <Button 
                            type="link" size="20px"
                            style={{
                                padding:'0px 0px 16px 2px',
                            }}
                        >
                            <a href="/register">
                                <u>立即註冊</u>
                            </a>
                        </Button>
                    </div>
                </Space>
            </Layout>
        </>
    )

    return (
        <OtherPageNavBarNoLogin 
            LoginContentBlock = { LoginContentBlock } 
            OtherPageNavBarNoLoginHeaderBlock = { OtherPageNavBarNoLoginHeaderBlock }
        />
    ) 
};

export { Login };
