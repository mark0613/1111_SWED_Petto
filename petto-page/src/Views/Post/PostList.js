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
import { 
    AuthUtil,
    Request 
} from "../../Utils";
import 'antd/dist/antd.css';
import "./PostList.css"


const { Paragraph, Title } = Typography;

const createButton = (
    <>
        <div
            style={{
                textAlign: "center",
                margin: 5,
            }}
        >
            <Button
                type="primary"
                style={{
                    width: '120px',
                    borderRadius: '8px',
                    margin: 10,
                }}
                onClick={ () => window.location.href = '/CommonCreatePost' }
            >
                建立一般文章
            </Button>

            <Button
                type="primary"
                style={{
                    width: '120px',
                    borderRadius: '8px',
                    margin: 10,
                }}
                onClick={ () => window.location.href = '/MDCreatePost' }
            >
                建立MD文章
            </Button>

            <Button
                type="primary"
                style={{
                    width: '120px',
                    borderRadius: '8px',
                    margin: 10,
                }}
                onClick={ () => window.location.href = '/HomePageNavBarLogin' }
            >
                建立投票
            </Button>
        </div>
    </>
)

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
    const [list, setList] = useState([]);
    useEffect(() => {
        Request.get(
            "/api/posts",
            {
                success : (response) => {
                    for (let post of response.posts) {
                        setList(card => [...card, getCard(post)]);
                    } 
                }
            }
        )
    }, []);

    const contentBlock = (
        <>
            <Row>
                <Col span={ 3 } />
                <Col span={ 18 }>
                    { AuthUtil.isLogin() ? createButton : <></> }
                    { list }    
                </Col>
                <Col span={ 3 } />
            </Row>
        </>
    )
    return (
        <PageTemplate 
            type = "home"
            contentBlock={ contentBlock } 
        />
    )
}

export { PostList };
