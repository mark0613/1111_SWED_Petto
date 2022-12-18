import { useState } from "react";
import {
    Avatar,
    Button,
    Form,
    Input,
    List,
} from "antd";
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
            <Form.Item>
                <TextArea 
                rows={ 4 } 
                onChange={ onChange } 
                value={ value } 
                style={{
                    resize: "none",
                }}
            />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                    Add Comment
                </Button>
            </Form.Item>
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
            key={ `reply-${reply.id}` }
        >
            <List.Item.Meta
                avatar={ <Avatar /> }
                title={ reply.username }
                description={ DateFormatter.datetime(reply.timestamp) }
            />
            { reply.content }
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
