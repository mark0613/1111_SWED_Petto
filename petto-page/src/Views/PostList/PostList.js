import {
    useEffect,
    useState,
} from "react";
import {
    BackTop,
    Col,
    Empty,
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
    const [postList, setPostList] = useState(<Empty />);

    let title = "";
    let url = "/api/posts";
    if (props.type === "keep") {
        title = "我的收藏";
        let jwt = AuthUtil.isLogin() ? CookieUtil.getValue("token") : "";
        url = `/api/keep?jwt=${ jwt }`;
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
        if (searchParams.has("tag")) {
            title = "搜尋結果";
            let tag = searchParams.get("tag");
            url = `/api/posts?tag=${tag}`;
        }
    }

    useEffect(() => {
        Request.get(
            url,
            {
                success : (response) => {
                    let posts = response.posts;
                    posts.sort((a, b) => {
                        if (a.timestamp > b.timestamp) {
                            return -1;
                        }
                        else if (a.timestamp < b.timestamp) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    })
                    let list = posts.map(item => <PostItem key={ `post-item-${item.length}` } data={ item } />);
                    setPostList(_ => list);
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
