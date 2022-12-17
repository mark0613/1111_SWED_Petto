import { useState } from "react";
import {
    Button,
    Form,
    Input,
} from "antd";


const { TextArea } = Input;

function ReplyEditor({ onChange, onSubmit, submitting, value }) {
    return (
        <>
            <Form.Item>
                <TextArea 
                rows={4} 
                onChange={onChange} 
                value={value} 
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
        if (!value) return;
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

function UserReplies(props) {
    return (
        <></>
    );
}

export { Reply, UserReplies }