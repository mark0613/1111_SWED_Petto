import {
    React,
    useState,
    useEffect
} from "react";
import {
    Avatar,
    Col,
    Card,
    Row,
    Typography,
} from "antd";
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

import {
    AuthUtil,
    CookieUtil, 
    DateFormatter,
    Request,
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

function generatePost(post) {
    let countEmoji = 0;
    for (let emoji of post.emojis) {
        countEmoji += emoji.count;
    }
    return (
        <>
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
                onClick={ () => window.location.href = `/post/${post.id}` }
            >
                <p>
                    <Avatar
                        style={{
                            width: '50px',
                            height: '50px',
                        }}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjLF1bThQuAsw3u0oFraBB3oXn_DXnbxSvM3hb-MCnKKqR7suZdhsEe2wdM1lcScYembA&usqp=CAU"
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
                </p>
                <p
                    style={{
                        paddingLeft: '10px',
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
                </p>
                <p>
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
                                <Avatar size={25} src="https://cdn-icons-png.flaticon.com/512/4926/4926585.png" />
                                <Avatar size={25} src="https://cdn-icons-png.flaticon.com/512/742/742750.png" />
                                <Avatar size={25} src="https://cdn-icons-png.flaticon.com/512/742/742920.png" />
                                <Avatar size={25} src="https://cdn-icons-png.flaticon.com/512/742/742784.png" />
                                <Avatar size={25} src="https://cdn-icons-png.flaticon.com/512/743/743418.png" />
                            </Avatar.Group>
                        </Col>

                        <Col span={ 2 }>
                            { countEmoji }
                        </Col>

                        <Col span={ 1 }>
                            <Avatar size={25} src="https://cdn-icons-png.flaticon.com/512/1370/1370907.png" />
                        </Col>

                        <Col span={ 17 }>
                            { post.replies.length }
                        </Col>
                    </Row>
                </p>                
            </Card>
        </>
    )
}

function PostList(props) {
    const [list, setList] = useState([]);
    let url = "/api/posts";
    if (props.type === "tag") {
        url = "/api/posts";
    }
    else if (props.type === "mine") {
        url = `/api/posts/${AuthUtil.getUserDetails().id}`
    }
    else if (props.type === "keep") {
        url = `/api/keep?jwt=${CookieUtil.getValue("token")}`
    }
    useEffect(() => {
        Request.get(
            url,
            {
                success : (response) => {
                    for (let post of response.posts) {
                        setList(card => [...card, generatePost(post)]);
                    } 
                }
            }
        )
    }, []);

    return (
            <Row
                style={{
                    backgroundColor:"#c4e5ff",
                    padding: '5px',
                    borderRadius: '2%',
                    margin: '2px',
                }}
            >
                <Col span={ 2 } />
                <Col span={ 12 }>
                    { list }
                </Col>
                <Col span={ 10 } />
            </Row>

    )
}

export { PostList }
