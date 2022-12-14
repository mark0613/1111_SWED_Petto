import {
    React,
    useState,
    useEffect
} from "react";
import {
    Avatar,
    Button,
    BackTop,
    Col,
    Card,
    Form,
    Row,
    Space,
    Statistic,
    Typography,
} from "antd";
import { MessageOutlined } from '@ant-design/icons';

import { PageTemplate } from "../Template";
import 'antd/dist/antd.css';
import "./PostList.css"


const { Paragraph, Title } = Typography;

const api = "/api/posts";

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
        countEmoji += emoji.count;
    }
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
            <Form.Item direction="horizontal">
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
                    { post.username }
                </h>

                <h
                    style={{
                        color: 'lightgray',
                        fontSize: '20px',
                        marginLeft: '30px',
                        marginBottom: '0px',
                    }}
                >
                    { post.timestamp.substring(0, 10) }
                </h>
            </Form.Item>

            <Form.Item>
                <Title level={3}>{ post.title }</Title>

                <Paragraph
                    style={{
                        width: '820px',
                        fontSize: '18px',
                    }}
                    ellipsis={{
                        rows: 3,
                    }}
                    onClick={ () => window.location.href = '/Login' }
                >
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </Paragraph>
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

                    <Row>
                        <Col>
                            <Statistic
                                value={ post.replies.length }
                                prefix={ <MessageOutlined /> }
                            />
                        </Col>
                    </Row>
                </Space>

                <BackTop />

                <strong className="site-back-top-basic"></strong>
            </Form.Item>
        </Card>
    )
}

function PostList() {
    const [data, setData] = useState(null);
    const [list, setList] = useState([]);
    const [] = useState(false);
    useEffect(() => {
        fetchApi(api, (resp) => {
            setData(_ => resp);
            for (let post of resp.posts) {
                setList(card => [...card, getCard(post)]);
            }
        });
    }, []);
    const contentBlock = (
        <>
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
                            onClick={ () => window.location.href = '/CommonCreatePost' }
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
                            onClick={ () => window.location.href = '/MDCreatePost' }
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
                            onClick={ () => window.location.href = '/HomePageNavBarLogin' }
                            htmlType="submit"
                        >
                            建立投票
                        </Button>
                    </Space>
                </Form.Item>

                { list }
            </Form>
        </>
    )
    return (
        <PageTemplate contentBlock={ contentBlock } />
    )
}

export { PostList };
