import { useState } from 'react';
import {
    Button,
    Card,
    Input,
} from "antd";
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { 
    EditOutlined,
    EyeOutlined,
} from '@ant-design/icons'
import "./Editor.css";


const { TextArea } = Input;

function MarkdownEditor(props) {
    const [mode, setMode] = useState(props.mode)  // mode = { read, write }
    const [text, setText] = useState(props.text);
    const handleTextAreaChange = (e) => {
        props.onChange(e.target.value);
        setText(_ => e.target.value);
    }
    const changeMode = () => {
        if (mode === "read") {
            setMode(_ => "write");
        }
        else {
            setMode(_ => "read");
            setText(_ => document.getElementById("textarea-md").value);
        }
    }

    return (
        <>
            <Button 
                style={{
                    margin: '0% 0% 1% 95%',
                }}
                type="primary"
                onClick={ changeMode }>
                {
                    (mode === "read") ? <EditOutlined /> : <EyeOutlined />
                }
            </Button>
            {
                (mode === "read") ? 
                <Card
                    className="editor"
                    style={{
                        overflowY: "scroll",
                    }}
                >
                    <ReactMarkdown 
                        rehypePlugins={[ rehypeHighlight ]}
                    >
                        { text }
                    </ReactMarkdown>
                </Card> :
                <TextArea 
                    id="textarea-md" 
                    className="editor"
                    onChange={ handleTextAreaChange } 
                    value={ text } 
                    placeholder="可以使用 Markdown 語法!"
                    style={{ 
                        resize: "none"
                    }}
                />
            }
        </>
    );
}

export { MarkdownEditor };
