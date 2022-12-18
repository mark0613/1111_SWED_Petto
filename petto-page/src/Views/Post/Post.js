import { useEffect, useState } from "react";
import {
    Avatar,
    Card,
    Col,
    Divider,
    Row,
    Space,
    Tag,
    Typography,
} from "antd";
import { 
    ShareAltOutlined,
    UserOutlined,
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


const { Meta } = Card;
const { Title } = Typography;

function generateContent(mode, content) {
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
                key={ `tag-${tag.id}` }
                color={colors[tag.id % colorSize]}
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
    return (
        <Row>
            <Col span={ 6 }></Col>
            <Col span={ 12 }>
                <Card 
                    className="post"
                    actions={[
                        <EmojiTooltip
                            post={ data.id }
                        />,
                        <Keep id={ data.id } />,
                        <ShareAltOutlined key="share" />,
                    ]}
                >
                    <Meta
                        avatar={ <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> }
                        title={ data.username }
                        description={ DateFormatter.datetime(data.timestamp) }
                    />
                    <div style={{marginLeft: "95%"}}>
                        <DeleteButton 
                            username={ data.username }
                            id={ data.id } 
                        />
                    </div>
                    <Title>
                        { data.title }
                    </Title>
                    <div style={{ minHeight: "200px" }}>
                        { generateContent(data.mode, data.content, data.options) }
                    </div>
                    <Divider />
                    <div>
                        { generateTags(data.tags) }
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        { generateEmojis(data.emojis) }
                    </div>
                </Card>
                <Card>
                    <UserReplies data={ data.replies } />
                    <br />
                    <Reply post={ data.id } onSubmit={ (response) => {renderPage()} } />
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
