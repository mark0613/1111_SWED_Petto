import { useState } from "react";
    import {
    Form,
    Button,
    Input,
    Space,
    Layout,
    Typography,
} from "antd";
import "./Login.css";
import {OtherPageNavBarNoLogin} from "../../Components/NavBar/OtherPageNavBarNoLogin" ;

const { Title } = Typography;
const api = "/api/login";

function Login(props) {
    const [message, setMessage] = useState(null);
    const OtherPageNavBarNoLoginHeaderBlock = props.OtherPageNavBarNoLoginHeaderBlock;
    const onFinish = (values) => {
        let userData = values.user;
        let data = new FormData();
        data.append("account", userData.account);
        data.append("password", userData.password);
        console.log(userData)
    
        fetch(
            api,
            {
                method : "POST",
                body : data,
            }
        )
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            if (data.hasOwnProperty("jwt")) {
                console.log(data);
                alert("登入成功!");
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
        <Layout
            
            style={{
                //backgroundColor:'aliceblue',
            }}
            >
                <Space 
                    style={{
                        paddingTop:'20px',
                    }}
                    direction="vertical"
                >
                    <Title 
                        style={{
                            textAlign:'center',
                            fontSize:'40px',
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
                    wrapperCol={{
                        span: 16,
                    }}
                    onFinish={onFinish}
                    >
                        <Form.Item
                            label="Account"
                            name={['user', 'account']}
                            
                            rules={[
                            {
                                required: true,
                                message: 'Please enter your account!',
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
                            label="Password"
                            name={['user', 'password']}
                            rules={[
                            {
                                required: true,
                                message: 'Please enter your password!',
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
                            wrapperCol={{
                            offset: 8,
                            span: 16,
                            }}
                            style={{
                                justifyContent:'center',
                                display: 'flex',
                            }} 
                        >
                            <Button 
                                type="primary" 
                                htmlType="submit"
                                onClick={ () => Form.submit()}
                            >
                                登入
                            </Button>
                        </Form.Item>
                    </Form>
                </Space> 
                <Space
                
                style={{
                    justifyContent:'center',
                    display: 'flex',
                }}
                >
                    <div>
                        還沒有帳號?
                        <Button 
                            style={{
                                padding:'0px 0px 16px 2px',
                                
                            }}
                            type="link" size="20px">
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
