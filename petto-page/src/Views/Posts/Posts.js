import {
    React,
} from "react";
import {
    BackTop,
    Button,
    Col,
    Image,
    Row,
    Typography,
} from "antd";

import { PostList } from "../../Components/PostList"
import { AuthUtil } from "../../Utils";
import { PageTemplate } from "../Template";

import "./Posts.css"
import 'antd/dist/antd.css';


const { Title } = Typography;

const createButton = (
    <>
        <div
            id="button"
            style={{
                textAlign: "center",
                margin: 5,
            }}
        >
            <Button
                className="btn"
                style={{
                    color: 'white',
                    width: '70px',
                    height: '50px',
                    borderRadius: '8px',
                    margin: 10,
                    backgroundColor: '#c4e5ff',
                    border: '1px solid #306fc7',
                }}
                onClick={ () => window.location.href = '/post/new/text' }
            >
                <Image 
                    src="https://cdn-icons-png.flaticon.com/512/1170/1170221.png"
                    preview={ false }
                    width={ 35 }
                />
            </Button>

            <Button
                className="btn"
                style={{
                    color: 'white',
                    width: '70px',
                    height: '50px',
                    borderRadius: '8px',
                    margin: 10,
                    backgroundColor: '#c4e5ff',
                    border: '1px solid #306fc7',
                }}

                onClick={ () => window.location.href = '/post/new/md' }
            >
                <Image 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Octicons-markdown.svg/600px-Octicons-markdown.svg.png"
                    preview={ false }
                    width={ 35 }
                />
            </Button>

            <Button
                className="btn"
                style={{
                    color: 'white',
                    width: '70px',
                    height: '50px',
                    borderRadius: '8px',
                    margin: 10,
                    backgroundColor: '#c4e5ff',
                    border: '1px solid #306fc7',
                }}
                onClick={ () => window.location.href = '/post/new/vote' }
            >
                <Image 
                    src="https://cdn-icons-png.flaticon.com/512/3179/3179218.png"
                    preview={ false }
                    width={ 35 }
                />
            </Button>
        </div>
    </>
)


function Posts(props) {
    let title = "";
    if (props.type === "keep") {
        title = "我的收藏"
    }
    else if (props.type === "search" || props.type === "tag") {
        title = "搜尋結果"
    }
    else if (props.type === "mine") {
        title = "我的文章"
    }
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
                        >{ title }</Title>
                    { AuthUtil.isLogin() ? createButton : <></> }
                    < PostList type={ props.type } />
                </Col>
                <Col span={ 3 } />
            </Row>
            <BackTop />
        </>
    )
    return (
        <PageTemplate 
            type = "home"
            contentBlock={ contentBlock } 
        />
    )
}

export { Posts };
