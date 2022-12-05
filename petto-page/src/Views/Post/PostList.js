import { useState, useEffect, } from "react";
import {
    Col,
    Row,
    Card,
    Form,
    Input,
    Space,
    Button,
    Layout,
    Select,
    Avatar,
    BackTop,
    Statistic,
    Typography,
} from "antd";
import 'antd/dist/antd.css';
import { MessageOutlined } from '@ant-design/icons';
import React from 'react'
import { HomePageNavBarLogin } from "../../Components/NavBar/HomePageNavBarLogin";
import { HomePageNavBarNoLogin } from "../../Components/NavBar/HomePageNavBarNoLogin";
import { AuthUtil } from '../../Utils'
import "./PostList.css"


const api = "/api/posts";
const { Paragraph, Title } = Typography;

function fetchApi(api, callback) {
    fetch(api)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            callback(data)
        })
        .catch((error) => {
            console.log(`Error: ${error}`);
        })
}

function getCard(post) {
    let countEmoji = 0;
    for (let emoji of post.emojis) {
        console.log(emoji.type);
        countEmoji += emoji.count;
    }
    console.log(countEmoji);
    return (
        <Card
            style={{
                width: '910px',
                border: '1px solid',
                paddingLeft: '20px',
                borderRadius: '12px',
                marginBottom: '40px',
            }}
        >
            <Form.Item >
                <Space direction="horizontal">
                    <Space>
                        <Avatar
                            style={{
                                width: '60px',
                                height: '60px',
                            }}
                            src="https://joeschmoe.io/api/v1/random"
                        />

                        <h
                            style={{
                                fontSize: '24px',
                            }}
                        >
                            Name
                        </h>

                        <p
                            style={{
                                color: 'lightgray',
                                fontSize: '20px',
                                marginLeft:'30px',
                                marginBottom:'0px',
                            }}
                        >
                            {post.timestamp.substring(0, 10)}
                        </p>

                    </Space>
                </Space>
            </Form.Item>

            <Form.Item>
                <Space direction="vertical">
                    <Title level={3}>{post.title}</Title>
                    <Paragraph
                        style={{
                            width: '820px',
                            fontSize: '18px',
                        }}
                        ellipsis={{
                            rows: 3,
                        }}
                        onClick={() => window.location.href = '/Login'}
                    >
                        {post.content}
                    </Paragraph>
                </Space>
            </Form.Item>

            <Form.Item>
                <Space>
                    <Avatar.Group>
                        <Avatar src="https://cdn-icons-png.flaticon.com/512/4926/4926585.png" ></Avatar>
                        <Avatar src="https://cdn-icons-png.flaticon.com/512/742/742750.png" ></Avatar>
                        <Avatar src="https://cdn-icons-png.flaticon.com/512/742/742920.png" ></Avatar>
                        <Avatar src="https://cdn-icons-png.flaticon.com/512/742/742784.png" ></Avatar>
                        <Avatar src="https://cdn-icons-png.flaticon.com/512/743/743418.png" ></Avatar>
                    </Avatar.Group>

                    <Row>
                        <Statistic
                           value={ countEmoji }
                        />
                    </Row>
                </Space>

                <Space
                    style={{
                        marginLeft: '70px',
                    }}
                >
                    <Row>
                        <Col>
                            <Statistic
                                value={ post.replies.length }
                                prefix={<MessageOutlined />}
                            />
                        </Col>
                    </Row>
                </Space>

                <Space>
                    <BackTop />
                    <strong className="site-back-top-basic"></strong>
                </Space>
            </Form.Item>
        </Card>
    )
}

function PostList(props) {
    const [data, setData] = useState(null);
    const [list, setList] = useState([]);
    const [countEmoji, setcountEmoji] = useState([]);
    const OtherPageNavBarLoginHeaderBlock = props.OtherPageNavBarLoginHeaderBlock;
    const HomePageNavBarLoginHeaderBlock = props.HomePageNavBarLoginHeaderBlock;
    const HomePageNavBarNoLoginHeaderBlock = props.HomePageNavBarNoLoginHeaderBlock;
    const [] = useState(false);
    useEffect(() => {
        fetchApi(api, (resp) => {
            setData(_ => resp);
            for (let post of resp.posts) {
                setList(card => [...card, getCard(post)]);
            }
        });
    }, []);
    console.log(data);
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
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Space>
                                <Button
                                    type="primary"
                                    style={{
                                        width: '120px',
                                        borderRadius: '8px',
                                    }}
                                    onClick={() => window.location.href = '/CommonCreatePost'}
                                    htmlType="submit"
                                >
                                    建立一般文章
                                </Button>

                                <Button
                                    type="primary"
                                    style={{
                                        width: '120px',
                                        borderRadius: '8px',
                                    }}
                                    onClick={() => window.location.href = '/MDCreatePost'}
                                    htmlType="submit"
                                >
                                    建立MD文章
                                </Button>

                                <Button
                                    type="primary"
                                    style={{
                                        width: '120px',
                                        borderRadius: '8px',
                                    }}
                                    onClick={() => window.location.href = '/HomePageNavBarLogin'}
                                    htmlType="submit"
                                >
                                    建立投票
                                </Button>
                            </Space>
                        </Form.Item>

                        {list}
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
