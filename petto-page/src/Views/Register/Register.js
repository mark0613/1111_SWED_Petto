import { useState } from "react";
import {
    Form,
    Input,
    Space,
    Button,
    Layout,
    Typography,
} from "antd";
import "./Register.css";
import {OtherPageNavBarNoLogin} from "../../Components/NavBar/OtherPageNavBarNoLogin" ;


const { Title } = Typography;
const api = "/api/register";
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        username: '${label} is not a valid username!',
        Password: '${label} is not a valid Password!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

function Register(props) {
    const [message, setMessage] = useState(null);
    const OtherPageNavBarNoLoginHeaderBlock = props.OtherPageNavBarNoLoginHeaderBlock;
    const onFinish = (values) => {
        let userData = values.user;
        let data = new FormData();
        data.append("email", userData.email);
        data.append("username", userData.username);
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
            console.log(data);
            alert(data.message)
            if(data.message === "註冊成功!") {
                window.location.href='/login';
            } 
        })
        .catch((error) => {
            console.log(`Error: ${error}`);
        })
    };
    const RegisterContentBlock = (
        <>
            <Layout>
                <Space direction="vertical">
                    <Title 
                        style={{
                            fontSize:'40px',
                            textAlign:'center',
                        }}
                        level={3}
                    >
                        註冊
                    </Title>
                </Space>

                <Space
                    style={{
                        justifyContent:'center',
                    }}
                >

                    <Form 
                        {...layout} 
                        name="nest-messages" 
                        onFinish={onFinish} 
                        validateMessages={validateMessages}
                    >
                        <Form.Item 
                            name={['user', 'email']} 
                            label="Email" 
                            rules={[{ type: 'email' }]}
                        >
                            <Input 
                                style={{
                                    width:'250px',
                                }}
                                placeholder="請輸入帳號...." 
                            />
                        </Form.Item>

                        <Form.Item name={['user', 'username']} label="Username" rules={[{ type: 'username' }]}>
                            <Input 
                                style={{
                                    width:'250px',
                                }}
                                placeholder="請輸入名稱...."
                            />
                        </Form.Item>

                        <Form.Item 
                            name={['user', 'password']} 
                            label="Password"
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
                                justifyContent:'center',
                                display: 'flex',
                            }}
                            wrapperCol={{ 
                                ...layout.wrapperCol, 
                                offset: 8 ,
                            }}
                        >
                            <Button 
                                type="primary" 
                                htmlType="submit"
                                onClick={ () => Form.submit()}
                            >
                                立即註冊
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
                        已有帳號?
                        <Button
                            type="link" size="20px"
                            style={{
                                padding:'0px 0px 16px 2px',
                            }}
                        >
                            <a href="/login">
                                <u>立即登入</u>
                            </a>
                        </Button>
                    </div>
                </Space>
            </Layout>
        </>
    )

    return (
        <OtherPageNavBarNoLogin
            RegisterContentBlock={ RegisterContentBlock }
            OtherPageNavBarNoLoginHeaderBlock={ OtherPageNavBarNoLoginHeaderBlock }
        />
    );
};

export { Register };
