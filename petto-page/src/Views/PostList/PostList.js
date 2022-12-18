import {
    useEffect,
    useState,
} from "react";
import {
    BackTop,
    Col,
    Row,
    Typography,
} from "antd";
import { useSearchParams } from 'react-router-dom';
import { 
    AuthUtil,
    CookieUtil,
    Request,
} from "../../Utils";
import { PageTemplate } from "../Template";
import { CreatePostButton } from "./CreatePostButton";

import "./PostList.css";
import 'antd/dist/antd.css';
import { PostItem } from "./PostItem";


const { Title } = Typography;

function PostList(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [postList, setPostList] = useState([]);

    let title = "";
    let url = "/api/posts";
    let method = "get";
    let formData = new FormData();
    if (props.type === "keep") {
        title = "我的收藏";
        let jwt = AuthUtil.isLogin() ? CookieUtil.getValue("token") : "";
        url = `/api/keep?jwt=${ jwt }`;
    }
    else if (props.type === "tag") {
        title = "搜尋結果";
        url = "/api/posts";
        let tags = props.tags === undefined ? [] : props.tags;
        formData.append("tags", tags);
        method = "post";
    }
    else if (props.type === "mine") {
        title = "我的文章";
        let userId = AuthUtil.isLogin() ? AuthUtil.getUserDetails().id : -1;
        url = `/api/posts/${ userId }`;
    }
    else {
        if (searchParams.has("keyword")) {
            title = "搜尋結果";
            let keyword = searchParams.get("keyword");
            url = `/api/posts?keyword=${ keyword }`;
        }
    }

    useEffect(() => {
        Request.get(
            url,
            {
                success : (response) => {
                    for (let post of response.posts) {
                        setPostList(cards => [...cards, <PostItem key={ `post-item-${cards.length}` } data={ post } />]);
                    } 
                }
            }
        )
    }, []);

    const contentBlock = (
        <>
            <Row>
                <Col span={ 3 } />
                <Col span={ 18 }>
                    <Title 
                        level={ 3 }
                        style={{
                            textAlign: "center",
                            color: '#4691ee',
                        }}
                    >
                        { title }
                    </Title>
                        { AuthUtil.isLogin() ? <CreatePostButton /> : <></> }
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
                            { postList }
                        </Col>
                        <Col span={ 10 } />
                    </Row>
                </Col>
                <Col span={ 3 } />
            </Row>
            <BackTop />
        </>
    );

    return (
        <PageTemplate 
            type = "home"
            contentBlock={ contentBlock } 
        />
    );
}

export { PostList };