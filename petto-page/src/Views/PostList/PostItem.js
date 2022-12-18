import {
    Avatar,
    Col,
    Card,
    Row,
    Typography,
} from "antd";
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { getEmojiIcons } from "../../Components/Emoji/Emoji";
import {
    DateFormatter,
} from "../../Utils";


const { Paragraph, Title } = Typography;

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

function generateFooter(emojiCount, replyCount) {
    const emojiIconMap = getEmojiIcons(25);
    const emojiIcons = [];
    for (let emoji in emojiIconMap) {
        let icon = emojiIconMap[emoji];
        emojiIcons.push(icon);
    }

    return (
        <Row
            style={{
                fontSize:'18px'
            }}
        >
            <Col 
                span={ 4 }
                style={{
                    textAlign: "center",
                }}
            >
                <Avatar.Group>
                    { emojiIcons }
                </Avatar.Group>
            </Col>

            <Col span={ 2 }>
                { emojiCount }
            </Col>

            <Col span={ 1 }>
                <Avatar size={25} src="https://cdn-icons-png.flaticon.com/512/1370/1370907.png" />
            </Col>

            <Col span={ 17 }>
                { replyCount }
            </Col>
        </Row>
    );
}


function PostItem(props) {
    const post = props.data;

    let emojiCount = 0;
    for (let emoji of post.emojis) {
        emojiCount += emoji.count;
    }

    return (
        <Card
            style={{
                width: '800px',
                border: '1px solid #4691ee',
                padding: '8px',
                borderRadius: '12px',
                margin: '40px',
                backgroundColor: '#f0f9ff',
            }}
            hoverable = { true }
            onClick={ () => window.location.href=`/post/${post.id}` }
        >
            <div>
                <Avatar
                    style={{
                        width: '50px',
                        height: '50px',
                    }}
                    src={ `${process.env.PUBLIC_URL}/images/head.jpg` }
                />
                
                <span
                    style={{
                        paddingLeft: '20px',
                        fontSize: '25px',
                    }}
                >
                    { post.username }
                </span>

                <span
                    style={{
                        color: 'lightgray',
                        fontSize: '20px',
                        marginLeft: '30px',
                        marginBottom: '0px',
                    }}
                >
                    { DateFormatter.datetime(post.timestamp) }
                </span>
            </div>
            <div
                style={{
                    paddingLeft: '10px',
                    marginTop: '3%',
                }}
            >
                <Title level={3}>
                    { post.title }
                </Title>
                
                <Paragraph
                    style={{
                        width: '700px',
                        fontSize: '18px',
                    }}
                    ellipsis={{
                        rows: 3,
                    }}
                >
                    { generateContent(post.mode, post.content) }
                </Paragraph>
            </div>
            <div>
                { generateFooter(emojiCount, post.replies.length) }
            </div>               
        </Card>
    );
}

export { PostItem };
