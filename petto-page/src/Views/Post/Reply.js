import { useState } from "react";
import {
    Avatar,
    Button,
    Form,
    Input,
    List,
} from "antd";
import { DateFormatter } from "../../Utils";


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

function Reply() {
    const [value, setValue] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = () => {
        if (!value) {
            return;
        }
        setSubmitting(true);
    };
    const handleChange = (e) => {
        console.log(e.target.value);
        setValue(_ => e.target.value);
    };

    return (
        <ReplyEditor
            onChange={ handleChange }
            onSubmit={ handleSubmit }
            submitting={ submitting }
            value={ value }
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