import { useState, useEffect, } from "react";
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import {
    Col, 
    Row,
    Card,
    Form,
    Badge,
    Input,
    Space,
    Button,
    Layout,
    Select,
    Avatar,
    BackTop,
    Tooltip,
    Statistic,
    Typography,
} from "antd";
import 'antd/dist/antd.css';
import { MessageOutlined } from '@ant-design/icons';
import React from 'react'
import { HomePageNavBarLogin } from "../../Components/NavBar/HomePageNavBarLogin";
import { HomePageNavBarNoLogin } from "../../Components/NavBar/HomePageNavBarNoLogin";
import { AuthUtil } from '../../Utils'
import { CookieUtil } from '../../Utils';
import ReactDOM from 'react-dom'
import "./PostList.css"

import "./0.good.png"
//PostList.get('/', request, response => { response.send('I Love Treehouse!'); });
const api = "/api/posts";
const { TextArea } = Input;
const { Option } = Select;
const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const onChange = (e) => {
    console.log('Change:', e.target.value);
};
const { Header, Content } = Layout;
const { Paragraph,Title  } = Typography;


function PostList(props) {
    const OtherPageNavBarLoginHeaderBlock = props.OtherPageNavBarLoginHeaderBlock;
    const HomePageNavBarLoginHeaderBlock = props.HomePageNavBarLoginHeaderBlock;
    const HomePageNavBarNoLoginHeaderBlock = props.HomePageNavBarNoLoginHeaderBlock;
    const [message, setMessage] = useState(null);
    const [] = useState(false);
    fetch(
        api,
        {
            method: "GET",
            //headers: headers,
        }
    )
    .then((response) => {
        //console.log(response);
        return response.json();
    })
    .then((data) => {
        console.log(data);
        //alert(data);
    })
    .catch((error) => {
        console.log(`Error: ${error}`);
    })
    
    const [rows] = useState(3);
    const article = "引入文章 Ant Design, a design language for background applications, is refined by Ant UED Team. AntDesign, a design language for background applications, is refined by Ant UED Team. AntDesign, a design language for background applications, is refined by Ant UED Team. AntDesign, a design language for background applications, is refined by Ant UED Team. AntDesign, a design language for background applications, is refined by Ant UED Team. AntDesign, a design language for background applications, is refined by Ant UED Team.";
    const PostListContentBlock = (
        <>
            <Layout>
                <Space
                    style={{
                        marginTop: '30px',
                        justifyContent: 'center',
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
                    >
                        <Form.Item 
                            style={{
                                justifyContent:'center',
                                display:'flex',
                            }}
                        >
                            <Space>
                                <Button
                                    type="primary" 
                                    style={{
                                        width:'120px',
                                        borderRadius:'8px',
                                    }}
                                    onClick={ () => window.location.href='/CommonCreatePost'}
                                    htmlType="submit"
                                >
                                    建立一般文章
                                </Button>

                                <Button
                                    type="primary" 
                                    style={{
                                        width:'120px',
                                        borderRadius:'8px',
                                    }}
                                    onClick={ () => window.location.href='/MDCreatePost'}
                                    htmlType="submit"
                                >
                                    建立MD文章
                                </Button>

                                <Button
                                    type="primary" 
                                    style={{
                                        width:'120px',
                                        borderRadius:'8px',
                                    }}
                                    onClick={ () => window.location.href='/HomePageNavBarLogin'}
                                    htmlType="submit"
                                >
                                    建立投票
                                </Button>
                            </Space>
                        </Form.Item>

                        <Card
                            style={{
                                width: '910px',
                                border: '1px solid',
                                paddingLeft: '20px',
                                borderRadius: '12px',
                            }}
                            onClick={ () => window.location.href='/Login'}
                                    
                        >
                            <Form.Item >
                                <Space direction="horizontal">
                                    <Space>
                                        <Avatar 
                                            style={{
                                                width:'60px',
                                                height:'60px',
                                            }}
                                            src="https://joeschmoe.io/api/v1/random" />
                                        <h
                                            style={{
                                                fontSize:'24px',
                                            }}
                                        >
                                            Name
                                        </h>
                                        
                                    </Space>
                                        
                                    <Space>
                                        <p
                                            style={{
                                                color: 'lightgray',
                                                fontSize:'20px',
                                            }}
                                        >
                                            YYYY/MM/DD
                                        </p>

                                    </Space>
                                </Space>
                            </Form.Item>

                            <Form.Item>
                                <Space direction="vertical">
                                    <Title level={3}>{api.title}</Title>
                                    <Paragraph
                                        ellipsis={{
                                            rows,
                                        }}
                                        style={{
                                            width:'820px',
                                            fontSize:'18px',
                                        }}
                                    >
                                        {article}

                                    </Paragraph>
                                </Space>
                            </Form.Item>

                            <Form.Item>
                                <Space>
                                    <Avatar.Group>
                                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                                        <Avatar src="0.good.png" />
                                        <Avatar
                                            style={{
                                                backgroundColor: '#f56a00',
                                            }}
                                        >
                                            K
                                        </Avatar>
                                        <Tooltip title="Ant User" placement="top">
                                            <Avatar
                                                style={{
                                                    backgroundColor: '#87d068',
                                                }}
                                                icon={<UserOutlined />}
                                            />
                                        </Tooltip>
                                        
                                        <Avatar
                                            style={{
                                                backgroundColor: '#1890ff',
                                            }}
                                            icon={<AntDesignOutlined />}
                                        />
                                    </Avatar.Group>
                                    
                                    <Row>
                                        <Statistic value={api.reply} />
                                    </Row>
                                </Space>

                                <Space
                                    style={{ 
                                        //paddingTop:'0px',
                                        marginLeft:'70px',
                                    }}
                                >
                                    <Row>
                                        <Col >
                                        <Statistic  
                                            value={api.emoji} prefix={<MessageOutlined />} />
                                        </Col>
                                    </Row>
                                </Space>

                                <Space>
                                    <BackTop />
                                    <strong className="site-back-top-basic"></strong>
                                </Space>
                                
                            </Form.Item>
                        </Card>
                    </Form>
                </Space>
            </Layout>
        </>
    )

    if (AuthUtil.isLogin()) {
        return (
            <HomePageNavBarLogin
                PostListContentBlock={PostListContentBlock}
                HomePageNavBarLoginHeaderBlock={HomePageNavBarLoginHeaderBlock}
            />
        )
    } else {
        return (
            <HomePageNavBarNoLogin
                PostListContentBlock={PostListContentBlock}
                HomePageNavBarNoLoginHeaderBlock={HomePageNavBarNoLoginHeaderBlock}
            />
        )
    }
};

export { PostList };
// {api.content}