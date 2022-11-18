import { useState } from "react";
    import {
    Form,
    Button,
    Input,
    Space,
    Layout,
    Typography,
} from "antd";
import "./Register.css";
import {Template} from "../Template" ;

const { Title } = Typography;
const api = "/api/register";
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
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


function Register() {
    const [message, setMessage] = useState(null);
    
    const onFinish = (values) => {
        let userData = values.user;
        let data = new FormData();
        data.append("email", userData.email);
        data.append("username", userData.username);
        data.append("password", userData.password);

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
            console.log(data);
        })
        .catch((error) => {
            console.log(`Error: ${error}`);
        })
    };

    const RegistercontentBlock = (
        <>
            <Layout>
            <Space direction="vertical">
                <Title 
                    style={{
                        textAlign:'center',
                        fontSize:'40px',
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
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
     
                    <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
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

                    <Form.Item name={['user', 'password']} label="Password">
                        <Input.Password 
                            style={{
                                width:'250px',
                            }}
                            placeholder="請輸入密碼...."
                        />
                    </Form.Item>

                    <Form.Item 
                        wrapperCol={{ 
                            ...layout.wrapperCol, 
                            offset: 8 ,
                        }}
                        style={{
                            justifyContent:'center',
                            display: 'flex',
                        }} 
                    >
                        <Button 
                            type="primary" 
                            htmlType="submit"
                            // onClick={ () => handleClick()}
                            onClick={ () => Form.submit()}
                        >
                            立即註冊
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
                    已有帳號?
                    <Button 
                        style={{
                            padding:'0px 0px 16px 2px',
                            
                        }}

                        type="link" size="20px">
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
        <Template RegistercontentBlock={ RegistercontentBlock } />
    );
    
};

export { Register };
