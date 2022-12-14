import React from 'react';
import {
    Card,
    Form,
    Input,
    Space,
    Avatar,
    Button,
    Layout,
    Select,
    Dropdown,
} from "antd";
import { AudioOutlined, DownOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
import BraftEditor from 'braft-editor';

import { 
    AuthUtil,
    CookieUtil,
} from '../../Utils';

 import 'braft-editor/dist/index.css';
 import "./CommonCreatePost.css"


const api = "/api/post";

const { Option } = Select;

var set1;
const handleChange = (value) => {
    console.log(`selected ${value}`);
    set1 = new Set(value);
    console.log(set1);
};
const HeartSvg = () => (
    <svg
        fill="currentColor"
        width="1em"
        height="1em"
        viewBox="0 0 1024 1024"
    >
        <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
);
const HeartIcon = (props) => <Icon component={HeartSvg} {...props} />;
const { Search } = Input;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

class CommonCreatePost extends React.Component {
    state = {
        placeholder: '請輸入文章標題',
        editorState: BraftEditor.createEditorState(''), 
        outputHTML: '<p></p>'
    }
    componentWillUnmount() {
        this.isLivinig = false
    }
    handleChange = (editorState) => {
        this.setState({
            editorState: editorState,
            output: editorState.toHTML()
        })
    }
    setEditorContentAsync = () => {
        this.isLivinig && this.setState({
            editorState: BraftEditor.createEditorState()
        })
    }

    render() {
        const { editorState, outputHTML } = this.state
        const items = [
            {
                label: <a href="https://www.antgroup.com">我的文章</a>,
                key: '0',
            },
            {
                label: <a href="https://www.aliyun.com">我的收藏</a>,
                key: '1',
            },
            {
                label: <a href="https://ilearn2.fcu.edu.tw/">會員資料</a>,
                key: '3',
            },
            {
                label:
                    (
                        <Button
                            type="text"
                            style={{
                                display: 'flex',
                                paddingBottom: '0px',
                                justifyContent: 'center',
                            }}
                            htmlType="submit"
                        >
                            <a
                                href="https://www.youtube.com/"
                                style={{
                                    color: 'black',
                                }}
                            >
                                登出
                            </a>
                        </Button>
                    ),
                key: '4',
            },
        ];
        const onFinish = (values) => {
            let userData = values.user;
            let jwt = CookieUtil.getValue("token");
            let data = new FormData();
            userData.jwt = jwt;
            userData.content = editorState.toHTML();
            userData.mode = "md";
            data.append("jwt", userData.jwt);
            data.append("title", userData.title);
            data.append("content", userData.content);
            data.append("mode", userData.mode);
            data.append("tags", userData.tags);
            console.log(userData);

            fetch(
                api,
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
                    console.log(data);
                }
                else {
                    console.log(data);
                    alert(data.message);
                    if (data.message === "建立成功!") {
                        window.location.href = '/PostList';
                    }
                }
            })
            .catch((error) => {
                console.log(`Error: ${error}`);
            })
        };

        return (
            <>
                <Layout>
                    <Space
                        style={{
                            display: 'flex',
                            paddingTop: '30px',
                            paddingBottom: '80px',
                            ustifyContent: 'center',
                            backgroundColor: 'antiquewhite',
                        }}
                        direction="vertical"
                    >
                        <Space
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                            direction="horizontal"
                        >
                            <Space>
                                <HeartIcon
                                    style={{
                                        color: 'teal',
                                        fontSize: '50px',
                                    }}
                                />
                            </Space>

                            <Space
                                style={{
                                    marginLeft: '60px'
                                }}
                            >
                                <HeartIcon
                                    style={{
                                        color: 'teal',
                                        fontSize: '50px',
                                        paddingBottom: '0px',
                                        paddingLeft: '335px',
                                    }}
                                />
                            </Space>
                        </Space>

                        <Space
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <div
                                style={{
                                    paddingLeft: '460px',
                                }}
                            >
                                <Dropdown
                                    menu={{
                                        items,
                                    }}
                                    style={{
                                        margenBottom: '0px',
                                    }}
                                    trigger={['click']}
                                >
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space
                                            style={{
                                                color: 'black',
                                            }}
                                        >
                                            名字
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </div>
                        </Space>
                    </Space>

                    <Space
                        style={{
                            marginTop: '30px',
                            paddingBottom: '500px',
                            justifyContent: 'center',
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
                            <Card
                                style={{
                                    width: '910px',
                                    border: '1px solid',
                                    paddingLeft: '20px',
                                    borderRadius: '12px',
                                }}
                            >
                                <Form.Item>
                                    <Space
                                        style={{
                                            width: '675px',
                                        }}
                                    >
                                        <Avatar
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                            }}
                                        />

                                        <h
                                            style={{
                                                fontSize: '24px',
                                            }}
                                        >
                                            { AuthUtil.getUserDetails().username }
                                        </h>
                                    </Space>
                                </Form.Item>

                                <Form.Item
                                    name={['user', 'title']}
                                    style={{
                                        marginBottom: '20px',
                                    }}
                                >
                                    <Input
                                        style={{
                                            width: '820px',
                                            borderColor: 'gray',
                                            borderWidth: '0 0 1px 0',
                                        }}
                                        placeholder="請輸入文章標題"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name={['user', 'content']}
                                    style={{
                                        marginBottom: '8px',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '820px',
                                            height: 320,
                                            border: '1px solid',
                                        }}
                                        className="editor-wrapper"
                                    >
                                        <BraftEditor
                                            value={editorState}
                                            onChange={this.handleChange}
                                            placeholder="請輸入文章內容"
                                        />
                                    </div>
                                </Form.Item>

                                <Space
                                    style={{
                                        paddingTop: '20px',
                                    }}
                                    direction="horizontal"
                                >
                                    <Form.Item
                                        name={['user', 'tags']}
                                        style={{
                                            marginBottom: '0px',
                                        }}
                                    >
                                        <Select
                                            mode="multiple"
                                            style={{
                                                width: '415px',
                                                borderColor: 'black ',
                                            }}
                                            showArrow
                                            onChange={handleChange}
                                            placeholder="選擇標籤.."
                                            optionLabelProp="label"
                                        >
                                            <Option value={1} label="犬">
                                                <div className="demo-option-label-item">
                                                    犬
                                                </div>
                                            </Option>

                                            <Option value={2} label="貓">
                                                <div className="demo-option-label-item">
                                                    貓
                                                </div>
                                            </Option>

                                            <Option value={3} label="鳥">
                                                <div className="demo-option-label-item">
                                                    鳥
                                                </div>
                                            </Option>

                                            <Option value={4} label="烏龜">
                                                <div className="demo-option-label-item">
                                                    烏龜
                                                </div>
                                            </Option>

                                            <Option value={5} label="守宮">
                                                <div className="demo-option-label-item">
                                                    守宮
                                                </div>
                                            </Option>

                                            <Option value={6} label="吉娃娃">
                                                <div className="demo-option-label-item">
                                                    吉娃娃
                                                </div>
                                            </Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        style={{
                                            marginBottom: '0px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                paddingLeft: '275px',
                                            }}
                                        >
                                            <Button
                                                type="primary"
                                                style={{
                                                    width: '120px',
                                                    borderRadius: '8px',
                                                }}
                                                onClick={() => Form.submit()}
                                                htmlType="submit"
                                            >
                                                發佈
                                            </Button>
                                        </div>
                                    </Form.Item>
                                </Space>
                            </Card>
                        </Form>
                    </Space>
                </Layout>
            </>
        )
    }
}

export { CommonCreatePost };
