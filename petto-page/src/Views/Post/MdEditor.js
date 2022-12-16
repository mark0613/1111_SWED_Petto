import { useState } from 'react';
import {
    Button,
    Card,
    Input,
} from "antd";
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'


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
            <Button type="primary" onClick={ changeMode }>
                {
                    (mode === "read") ? "編輯" : "預覽"
                }
            </Button>
            {
                (mode === "read") ? 
                <Card
                    style={{
                        border: "1px solid #d9d9d9",
                        height: "450px",
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
                    onChange={ handleTextAreaChange } 
                    value={ text } 
                    style={{
                        height: "450px",
                        resize: 'none',
                    }}
                    placeholder="可以使用 Markdown 語法!"
                />
            }
        </>
    );
}

export { MarkdownEditor };
