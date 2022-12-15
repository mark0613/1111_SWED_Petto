import React from 'react';
import {
    Avatar,
    Button,
    Card,
    Form,
    Input,
    Space,
    Select,
} from "antd";

import BraftEditor from 'braft-editor';
import { 
    AuthUtil,
    CookieUtil,
} from '../../Utils';
import { PageTemplate } from "../Template";
import 'braft-editor/dist/index.css';
import "./CommonCreatePost.css"


const { Option } = Select;

let set1;
const handleChange = (value) => {
    console.log(`selected ${value}`);
    set1 = new Set(value);
};

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
        const { editorState } = this.state
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

            fetch(
                "/api/post",
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
                }
                else {
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
        const contentBlock = (
            <>  
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    onFinish={ onFinish }
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
                                    onChange={ this.handleChange }
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
                                    onChange={ handleChange }
                                    placeholder="選擇標籤.."
                                    optionLabelProp="label"
                                >
                                    <Option value={ 1 } label="犬">
                                        <div className="demo-option-label-item">
                                            犬
                                        </div>
                                    </Option>

                                    <Option value={ 2 } label="貓">
                                        <div className="demo-option-label-item">
                                            貓
                                        </div>
                                    </Option>

                                    <Option value={ 3 } label="鳥">
                                        <div className="demo-option-label-item">
                                            鳥
                                        </div>
                                    </Option>

                                    <Option value={ 4 } label="烏龜">
                                        <div className="demo-option-label-item">
                                            烏龜
                                        </div>
                                    </Option>

                                    <Option value={ 5 } label="守宮">
                                        <div className="demo-option-label-item">
                                            守宮
                                        </div>
                                    </Option>

                                    <Option value={ 6 } label="吉娃娃">
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
                                        onClick={ () => Form.submit() }
                                        htmlType="submit"
                                    >
                                        發佈
                                    </Button>
                                </div>
                            </Form.Item>
                        </Space>
                    </Card>
                </Form>
            </>

        )
        return (
            <PageTemplate contentBlock={ contentBlock } />
        )
    }
}

export { CommonCreatePost };
