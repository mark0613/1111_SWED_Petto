import { useEffect, useState } from "react";
import {
    Avatar,
    Card,
    Col,
    Divider,
    message,
    Row,
    Space,
    Tag,
    Typography,
} from "antd";
import { 
    ShareAltOutlined,
} from '@ant-design/icons';
import {
    useParams,
} from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

import { getEmojiIcons } from "../../Components/Emoji";
import { 
    DateFormatter,
    Request,
} from "../../Utils";
import { PageTemplate } from '../Template';
import { DeleteButton } from "./Delete";
import { EmojiTooltip } from "./EmojiTooltip";
import { Keep } from "./Keep";
import { Reply, UserReplies } from "./Reply";
import { Vote } from "./Vote";

import "./Post.css";


const { Meta } = Card;
const { Title } = Typography;

function generateContent(postId, mode, content, vote) {
    if (mode === "md") {
        return (
            <ReactMarkdown 
                rehypePlugins={[ rehypeHighlight ]}
            >
                { content }
            </ReactMarkdown>
        )
    }
    else if (mode === "vote") {
        return (
            <Vote 
                post={ postId }
                options={ vote.options }
                result={ vote.result }
            />
        );
        
    }
    else {
        return (
            <div dangerouslySetInnerHTML={{ __html: content }} />
        );
    }
}

function generateTags(tags) {
    let colors = ["magenta", "red", "volcano", "green", "cyan", "blue", "purple"];
    let colorSize = colors.length;
    let result = [];
    for (let tag of tags) {
        result.push(
            <Tag
                id={ `tag-${tag.id}` }
                key={ `tag-${tag.id}` }
                color={ colors[tag.id % colorSize] }
                onClick={(e) => {
                    let tagId = e.currentTarget.id.split("-").slice(-1)[0];
                    window.location.href = `/posts?tag=${tagId}`;
                }}
                style={{
                    cursor: "pointer",
                }}
            >
                { tag.text }
            </Tag>
        )
    }
    return result;
}

function generateEmojis(emojis) {
    const emojiCount = {};
    for (let emoji of emojis) {
        emojiCount[emoji.type] = emoji.count;
    }
    const emojiIcons = getEmojiIcons(30);
    const result = [];
    for (let emoji in emojiIcons) {
        let icon = emojiIcons[emoji];
        let count = emojiCount[emoji];
        if (count === undefined) {
            count = 0;
        }
        result.push(
            <Space key={ `emoji-${emoji}` }>
                { icon } {count}
            </Space>
        )
    }

    return (
        <>
            <Space
                size={ 10 }
            >
                { result }
            </Space>
        </>
    )
}

function generatePost(data, renderPage) {
    const result = [];
    for (let key in data.voteResult) {
        result.push({
            text : key,
            count : data.voteResult[key],
        })
    }
    let vote = {
        options : data.options,
        result : result,
    };
    console.log(data);

    return (
        <Row>
            <Col span={ 6 }></Col>
            <Col span={ 12 }>
                <Card 
                    style={{
                        border: '1px solid #4691ee',
                        padding: '8px',
                        borderRadius: '12px',
                        backgroundColor: '#f0f9ff',
                    }}
                    className="post"
                    actions={[
                        <EmojiTooltip
                            post={ data.id }
                            onClick={ () => { renderPage() } }
                        />,
                        <Keep id={ data.id } />,
                        <ShareAltOutlined 
                            key="share"
                            onClick={() => {
                                navigator.clipboard.writeText(`http://localhost:3000/post/${ data.id }`)
                                message.success('succesfully copied ');
                            }}
                        />,
                    ]}
                >
                    <Meta
                        avatar={ <Avatar src={ `${process.env.PUBLIC_URL}/images/head.jpg` } /> }
                        title={ 
                            <div>
                                { data.username }
                                <DeleteButton 
                                    username={ data.username }
                                    id={ data.id } 
                                />
                            </div>
                        }
                        description={ <p> { DateFormatter.datetime(data.timestamp) }</p> }
                    />
                    
                    <Title level={ 3 }>
                        { data.title }
                    </Title>
                    <div 
                        style={{ 
                            minHeight: "200px",
                            backgroundColor: "#c4e5ff",
                            borderRadius: "5%",
                            padding: "5%",
                        }
                    }>
                        { generateContent(data.id, data.mode, data.content, vote) }
                    </div>
                    <Divider />
                    <div>
                        { generateTags(data.tags) }
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        { generateEmojis(data.emojis) }
                    </div>
                </Card>
                <Card
                style={{
                    backgroundColor: "#c4e5ff",
                    padding: '8px',
                    marginTop: '3%',
                    borderRadius: '12px',
                }}>
                    <UserReplies data={ data.replies } />
                    <br />
                    <Reply post={ data.id } onSubmit={ (response) => { renderPage() } } />
                </Card>
            </Col>
            <Col span={ 6 }></Col>
        </Row>
    )
}

function Post() {
    const { id } = useParams();
    const [render, setRender] = useState(0);
    const [contentBlock, setContentBlock] = useState(<></>);
    const renderPage = () => { setRender(v => v + 1) };
    useEffect(() => {
        Request.get(
            `/api/post/${id}`,
            {
                success: (response) => {
                    let post = generatePost(response["posts"], renderPage);
                    setContentBlock(_ => post);
                }
            }
        )
    }, [render]);

    return (
        <PageTemplate contentBlock={ contentBlock } />
    )
}

export { Post };
