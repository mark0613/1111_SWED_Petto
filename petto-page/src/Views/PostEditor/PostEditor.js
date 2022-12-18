import {
    Button,
    Col,
    Form,
    Input,
    Row,
    Typography,
} from "antd";

import { TagSelect } from "../../Components/TagSelect";
import { 
    CookieUtil,
    Request,
} from "../../Utils";
import { PageTemplate } from "../Template";
import { MarkdownEditor } from "./MdEditor";
import { TextEditor } from "./TextEditor";
import { VoteEditor } from "./VoteEditor";


const { Title } = Typography;

function PostEditor(props) {
    const type = props.type;
    let content;
    let tags;
    let editor;
    let title;
    const onEditorChange = (text) => { content=text };

    if (type === "md") {
        editor = <MarkdownEditor onChange={ onEditorChange } />
        title = "建立文章 - MD"
    }
    else if (type === "vote") {
        editor = <VoteEditor onChange={ onEditorChange } />
        title = "建立投票"
    }
    else {
        editor = <TextEditor onChange={ onEditorChange } />
        title = "建立文章"
    }


    const onFinish = (data) => {
        let formData = new FormData();
        console.log(tags);
        formData.append("title", data.title);
        if (type === "vote") {
            formData.append("options", content[1]);
            content = content[0]
        }
        formData.append("content", content);
        formData.append("mode", type);
        formData.append("tags", tags);
        formData.append("jwt", CookieUtil.getValue("token"));

        Request.post(
            "/api/post",
            {
                body : formData,
                success : (response) => {
                    alert(response.message);
                    window.location.href = `/post/${response.post_id}`;
                }
            }
        )
    }

    const contentBlock = (
        <>
        <Title 
            style={{
                color: '#4691ee',
                textAlign: "center",
                margin: '0px',
            }}
            level={ 2 }
        >
            { title }
        </Title>
            <Row>
                <Col span={ 3 } />
                <Col span={ 18 }
                    style={{
                        backgroundColor: "#c4e5ff",
                        padding: '15px 30px 15px 30px',
                        margin: '15px',
                        borderRadius: '8px',
                    }}
                >
                    <Form
                        name="post-form"
                        onFinish={ onFinish }
                        style={{
                            width: "60%",
                            marginLeft: "20%",
                        }}
                    >
                        <Form.Item
                            name={[ 'title' ]}
                            style={{
                                width: '70%',
                                textAlign: "center",
                            }}
                        >
                            <Row>
                                <Col span={ 3 }>
                                    <Title 
                                        level={ 4 }
                                        style={{
                                            color: '#306fc7',
                                            margin: '0px',
                                            lineHeight: '150%',
                                        }}
                                    >
                                        標題：
                                    </Title>
                                </Col>
                                <Col span={ 21 } >
                                    <Input 
                                        placeholder="請輸入文章標題..."
                                    />
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item
                            style={{
                                marginBottom: "8px",
                                width: "100%",
                            }}
                        >
                            { editor }
                        </Form.Item>

                        <Form.Item
                            style={{
                                marginBottom: "0px",
                                textAlign: "center"
                            }}
                        >
                            <Row>
                                <Col span={ 10 }>
                                    <TagSelect
                                        onChange={ value => tags=value }
                                    />
                                </Col>
                                <Col span={ 9 }></Col>
                                <Col span={ 5 }>
                                    <Button
                                        type="primary"
                                        style={{
                                            width: "120px",
                                            marginLeft: "50px",
                                            borderRadius: "8px",
                                        }}
                                        onClick={ Form.submit }
                                        htmlType="submit"
                                    >
                                        發佈
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={ 3 } />
            </Row>
        </>
    )

    
    return (
        <PageTemplate contentBlock={ contentBlock } />
    );
}

export { PostEditor };
