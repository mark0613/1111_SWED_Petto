import { useEffect, useState } from "react";
import {
    Avatar,
    Card,
    Col,
    Divider,
    Row,
    Space,
    Tag,
    Tooltip,
    Typography,
} from "antd";
import { 
    ShareAltOutlined,
    SmileOutlined,
    TagOutlined,
    UserOutlined,
} from '@ant-design/icons';
import Moment from 'moment';
import {
    useParams,
} from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

import { getEmojiIcons } from "../../Components/Emoji";
import { Request } from "../../Utils";
import { PageTemplate } from '../Template';
import { Reply } from "./Reply";



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
        return content;
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

function generatePost(data) {
    console.log(data);
    return (
        <Row>
            <Col span={ 6 }></Col>
            <Col span={ 12 }>
                <Card 
                    className="post"
                    actions={[
                        <SmileOutlined key="emoji" />,
                        <TagOutlined key="keep" />,
                        <ShareAltOutlined key="share" />,
                    ]}
                >
                    <Meta
                        avatar={ <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> }
                        title={ data.username }
                        description={ Moment(data.timestamp).format('YYYY-MM-DD HH:mm:ss') }
                    />
                    <Title>
                        { data.title }
                    </Title>
                    <p style={{ minHeight: "200px" }}>
                        { generateContent(data.mode, data.content, data.options) }
                    </p>
                    <Divider />
                    <div>
                        { generateTags(data.tags) }
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        { generateEmojis(data.emojis) }
                    </div>
                </Card>
                <Card>
                    <Reply />
                </Card>
            </Col>
            <Col span={ 6 }></Col>
        </Row>
    )
}

function Post() {
    const { id } = useParams();
    const [contentBlock, setContentBlock] = useState(<></>);
    useEffect(() => {
        Request.get(
            `/api/post/${id}`,
            {
                success: (response) => {
                    let post = generatePost(response["posts"]);
                    setContentBlock(_ => post);
                }
            }
        )
    }, []);

    return (
        <PageTemplate contentBlock={ contentBlock } />
    )
}

export { Post };
