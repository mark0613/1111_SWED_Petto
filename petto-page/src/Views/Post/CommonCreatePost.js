import { useState, useEffect, } from "react";
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { 
    Layout,
    Card,
    Form, 
    Input,
    Space, 
    Button,
    Select,
    Avatar,
    Tooltip,
} from "antd";
import React from 'react'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import "./CommonCreatePost.css"
import { AuthUtil } from '../../Utils'
import { CookieUtil } from '../../Utils';

const api = "/api/post";
const { TextArea } = Input;
const { Option } = Select;
const handleChange = (value) => {
    console.log(`selected ${value}`);
    //let valueArray =[];
    //valueArray.push(value);
    //console.log(valueArray)
};
const onChange = (e) => {
    console.log('Change:', e.target.value);
};
const { Header, Content } = Layout;
//const [message, setMessage] = useState(null);
//const [] = useState(false);


class CommonCreatePost extends React.Component {
    state = {
        placeholder:'請輸入文章標題',
        editorState:BraftEditor.createEditorState(''), // 设置编辑器初始内容
        //outputHTML: '<p placeholder></p>'
        //placeholder
    }
    componentWillUnmount () {
        this.isLivinig = false
    }

    handleChange = (editorState) => {
        this.setState({
        editorState: editorState,
        outputHTML: editorState.toHTML()
        })
    }
    
    setEditorContentAsync = () => {
        this.isLivinig && this.setState({
            editorState: BraftEditor.createEditorState()
        })
    }
    

    render () {
        const { editorState, outputHTML } = this.state
        const onFinish = (values) => {
            let userData = values.user;
            let jwt = CookieUtil.getValue("token");
            let data = new FormData();
            data.append("jwt", jwt);
            data.append("title", userData.title);
            data.append("content", editorState.toHTML());
            data.append("mode", "md");
            data.append("tags", userData.tags);
            //console.log(data.get("content"));
            console.log(editorState.toHTML())
        
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
        
                if (data.hasOwnProperty("jwt")) {
                    console.log(data);
                    alert(data.message);
                    if(data.message === "建立成功!"){
                        window.location.href='/HomePageNavBarLogin';
                    } 
                }
                else {
                    console.log(data);
                    alert(data.message);
                    //setMessage(data.message)
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
                            marginTop:'30px',
                            justifyContent:'center',
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
                                    width:'910px',
                                    border:'1px solid',
                                    paddingLeft:'20px',
                                    borderRadius:'12px',
                                }}
                            >
                                <Form.Item>
                                    <Space
                                        style={{
                                            width:'675px',
                                        }}
                                    >
                                        <Avatar 
                                            src="https://joeschmoe.io/api/v1/random" 
                                            style={{
                                                width:'60px',
                                                height:'60px',
                                            }}
                                        />
                                        <h
                                            style={{
                                                fontSize:'24px',
                                            }}
                                        >
                                            Name
                                        </h>
                                    </Space>
                                </Form.Item>
                                
                                <Form.Item
                                    name={['user', 'title']}
                                    style={{
                                            marginBottom:'20px',
                                        }}
                                >
                                    <Input 
                                        style={{
                                            width:'820px',
                                            borderColor:'gray',
                                            borderWidth:'0 0 1px 0',
                                        }}
                                        placeholder="請輸入文章標題"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name={['user', 'content']}
                                    style={{
                                        marginBottom:'8px',
                                    }}
                                >
                                    <div 
                                        style={{
                                            width:'820px',
                                            height: 320,
                                            border:'1px solid',
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

                                <Form.Item
                                    name={['user', 'tags']}
                                    style={{
                                        marginBottom:'0px',
                                    }}
                                >
                                    <Space 
                                        style={{
                                            paddingTop:'20px',
                                        }}
                                        direction="horizontal"
                                    >
                                        <Select
                                            mode="multiple"
                                            style={{
                                                width: '415px',
                                                borderColor:'black ',
                                            }}
                                            showArrow
                                            placeholder="選擇標籤.."
                                            onChange={handleChange}
                                            optionLabelProp="label"
                                        >
                                            <Option value="china" label="China">
                                                <div className="demo-option-label-item">
                                                    <span role="img" aria-label="China">
                                                    🇨🇳
                                                    </span>
                                                    China (中国)
                                                </div>
                                            </Option>

                                            <Option value="usa" label="USA">
                                                <div className="demo-option-label-item">
                                                    <span role="img" aria-label="USA">
                                                    🇺🇸
                                                    </span>
                                                    USA (美国)
                                                </div>
                                            </Option>

                                            <Option value="japan" label="Japan">
                                                <div className="demo-option-label-item">
                                                    <span role="img" aria-label="Japan">
                                                    🇯🇵
                                                    </span>
                                                    Japan (日本)
                                                </div>
                                            </Option>

                                            <Option value="korea" label="Korea">
                                                <div className="demo-option-label-item">
                                                    <span role="img" aria-label="Korea">
                                                    🇰🇷
                                                    </span>
                                                    Korea (韩国)
                                                </div>
                                            </Option>
                                        </Select>
                                    
                                        <div
                                            style={{
                                                paddingLeft:'275px',
                                            }}
                                        >
                                                <Button
                                                    type="primary" 
                                                    style={{
                                                        width:'120px',
                                                        borderRadius:'8px',
                                                    }}
                                                    onClick={ () => Form.submit()}
                                                    htmlType="submit"
                                                >
                                                    發佈
                                                </Button>
                                        </div>
                                    </Space>
                                </Form.Item>
                            </Card>
                        </Form>
                    </Space>
                </Layout>
            </>
        )
    }
}

export { CommonCreatePost };
      