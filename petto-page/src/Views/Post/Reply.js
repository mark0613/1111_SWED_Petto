import { useState } from "react";
import {
    Avatar,
    Button,
    Col,
    Form,
    Input,
    List,
    Row,
} from "antd";
import { 
    SendOutlined,
} from '@ant-design/icons';

import { 
    AuthUtil, 
    CookieUtil, 
    DateFormatter,
    Request,
} from "../../Utils";


const { TextArea } = Input;

function ReplyEditor({ onChange, onSubmit, submitting, value }) {
    return (
        <>
            <Row>
                <Col span={ 22 }>
                    <Form.Item>
                        <TextArea 
                            rows={ 4 } 
                            onChange={ onChange } 
                            value={ value } 
                            style={{
                                resize: "none",
                            }}
                            placeholder="說點甚麼吧!"
                        />
                    </Form.Item>
                </Col>
                <Col span={ 2 }>
                    <Form.Item>
                        <Button 
                            htmlType="submit" 
                            loading={ submitting }
                            onClick={ onSubmit }
                            type="primary"
                            style={{
                                marginLeft: "40%",
                                marginTop: "100%",
                            }}
                        >
                            <SendOutlined />
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            
        </>
    );
}

function Reply(props) {
    const postId = props.post;
    const onSubmit = props.onSubmit;
    const [text, setText] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = () => {
        if (!text) {
            alert("說點什麼吧!");
            return;
        }
        if (!AuthUtil.isLogin()) {
            alert("要先登入喔!");
            return;
        }
        setSubmitting(true);
        let formData = new FormData();
        formData.append("jwt", CookieUtil.getValue("token"));
        formData.append("post_id", postId);
        formData.append("content", text)
        Request.post(
            "/api/reply",
            {
                body: formData,
                success: (response) => {
                    alert(response.message)
                    setText(_ => "");
                    setSubmitting(_ => false);
                    onSubmit(response.message);
                    window.scrollTo(0, window.pageYOffset-350);
                },
            }
        )
    };
    const handleChange = (e) => {
        setText(_ => e.target.value);
    };

    return (
        <ReplyEditor
            onChange={ handleChange }
            onSubmit={ handleSubmit }
            submitting={ submitting }
            value={ text }
        />
    )
}

function generateReply(reply) {
    return (
        <List.Item
            style={{ 
                backgroundColor: "#edf8ff",
                borderRadius: "1%",
                padding: "3%",
                marginBottom: "1%",
                border: "1px solid #306fc7"
            }}
            key={ `reply-${reply.id}` }
        >
            <List.Item.Meta
                avatar={ <Avatar src={ `${process.env.PUBLIC_URL}/images/head.jpg` } /> }
                title={
                    <Row>
                        <Col span={ 17 }>
                            { reply.username }
                        </Col>
                        <Col span={ 7 }
                            style={{
                                color: "#bfbfbf",
                            }}
                        >
                            { DateFormatter.datetime(reply.timestamp) } 
                        </Col>
                    </Row> 
                }
            />
            <span
                style={{
                    paddingLeft: "8%",
                }}
            >
                { reply.content }
            </span>
        </List.Item>
    )
}

function UserReplies(props) {
    const reverseCompare = (a, b) => {
        if (a.timestamp > b.timestamp) {
            return -1;
        }
        else if (a.timestamp < b.timestamp) {
            return 1;
        }
        else {
            return 0;
        }
    }
    const data = props.data;
    data.sort(reverseCompare);
    return (
        <List
            itemLayout="vertical"
            pagination={{
                pageSize: 5,
            }}
            dataSource={ data }
            renderItem={ reply => generateReply(reply) }
        />
    );
}

export { Reply, UserReplies }
