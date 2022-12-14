import {
    Form,
    Input,
    Button,
    Typography,
} from "antd";

import { CookieUtil } from "../../Utils";
import { PageTemplate } from "../Template";
import "./Login.css";

const { Title } = Typography;

const onFinish = (values) => {
    let userData = values.user;
    let data = new FormData();
    data.append("account", userData.account);
    data.append("password", userData.password);
    fetch(
        "/api/login",
        {
            body: data,
            method: "POST",
        }
    )
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        if (data.hasOwnProperty("jwt")) {
            let token = data.jwt;
            CookieUtil.set("token", token);
            alert("登入成功!");
            if (data.message === "登入成功!") {
                window.location.href = '/PostList';
            }
        }
        else {
            alert("帳號或密碼錯誤!");
        }
    })
    .catch((error) => {
        console.log(`Error: ${error}`);
    })
}

function Login() {
    const contentBlock = (
        <>
            <Title
                style={{
                    fontSize: '40px',
                    textAlign: 'center',
                }}
                level={3}
            >
                登入
            </Title>

            <Form
                name="basic"
                labelCol={{ span: 8 }}
                onFinish={ onFinish }
                wrapperCol={{ span: 16 }}
                
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
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Input
                        style={{
                            width: '250px',
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
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Input.Password
                        style={{
                            width: '250px',
                        }}
                        placeholder="請輸入密碼...."
                    />
                </Form.Item>

                <Form.Item
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    wrapperCol={{
                        span: 16,
                        offset: 8,
                    }}
                >
                    <Button
                        type="primary"
                        onClick={ () => Form.submit() }
                        htmlType="submit"
                    >
                        登入
                    </Button>
                </Form.Item>
            </Form>

            <div style={{ textAlign: "center" }}>
                還沒有帳號?
                <Button
                    type="link"
                    size="20px"
                    style={{
                        padding: '0px 0px 16px 2px',
                    }}
                >
                    <a href="/register">
                        <u>立即註冊</u>
                    </a>
                </Button>
            </div>
        </>
    )
    return (
        <PageTemplate contentBlock={ contentBlock } />
    )
}

export { Login };
