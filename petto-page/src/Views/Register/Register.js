import {
    Button,
    Card,
    Form,
    Input,
    Typography,
} from "antd";

import { PageTemplate } from "../Template";


const { Title } = Typography;

const validateMessages = {
    types: {
        email: '${label} is not a valid email!',
    },
};

const onFinish = (data) => {
    let userData = data.user;
    let formData = new FormData();
    formData.append("email", userData.email);
    formData.append("username", userData.username);
    formData.append("password", userData.password);
    fetch(
        "/api/register",
        {
            body : formData,
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
}

function Register() {
    const contentBlock = (
        <>
            <Card 
                style={{
                    borderRadius: 20,
                    padding: '3%',
                    backgroundColor: '#edf8ff',
                }}
            >
                <Title 
                    style={{
                        color: '#4691ee',
                        fontSize: '40px',
                        textAlign: 'center',
                    }}
                    level={ 3 }
                >
                    註冊
                </Title>
                    
                <Form 
                    labelCol={{ span: 10 }}
                    onFinish={ onFinish } 
                    validateMessages={ validateMessages }
                >
                    <Form.Item 
                        name={['user', 'email']} 
                        label="Email" 
                        rules={[
                            {
                                type: 'email' 
                            }
                        ]}
                    > 
                        <Input 
                            style={{
                                width:'250px',
                            }}
                            placeholder="請輸入帳號...." 
                        />
                    </Form.Item>

                    <Form.Item 
                        name={['user', 'username']}
                        label="Username"
                        rules={[
                            {
                                message: 'Please enter the username!',
                                required: true,
                            },
                        ]}
                    >
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
                        rules={[
                            {
                                message: 'Please enter the password!',
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
                            textAlign: "center",
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

                <div style={{ textAlign: "center" }}>
                    已有帳號?
                    <Button
                        type="link"
                        size="20px"
                        style={{
                            padding:'0px 0px 16px 2px',
                        }}
                    >
                        <a href="/login">
                            <u>立即登入</u>
                        </a>
                    </Button>
                </div>
            </Card>
        </>
    )
    return (
        <PageTemplate contentBlock={ contentBlock } />
    )
}

export { Register };
