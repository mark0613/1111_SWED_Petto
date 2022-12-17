import {
    React,
} from "react";
import {
    BackTop,
    Button,
    Col,
    Row,
} from "antd";

import { PostList } from "../../Components/PostList"
import { AuthUtil } from "../../Utils";
import { PageTemplate } from "../Template";

import "./Posts.css"
import 'antd/dist/antd.css';


const createButton = (
    <>
        <div
            style={{
                textAlign: "center",
                margin: 5,
            }}
        >
            <Button
                style={{
                    color: 'white',
                    width: '120px',
                    borderRadius: '8px',
                    margin: 10,
                    backgroundColor: '#306fc7',
                    border: '0px', 
                }}
                onClick={ () => window.location.href = '/post/new/text' }
            >
                建立一般文章
            </Button>

            <Button
                style={{
                    color: 'white',
                    width: '120px',
                    borderRadius: '8px',
                    margin: 10,
                    backgroundColor: '#306fc7',
                    border: '0px',
                }}

                onClick={ () => window.location.href = '/post/new/md' }
            >
                建立MD文章
            </Button>

            <Button
                style={{
                    color: 'white',
                    width: '120px',
                    borderRadius: '8px',
                    margin: 10,
                    backgroundColor: '#306fc7',
                    border: '0px', 
                }}
                onClick={ () => window.location.href = '/post/new/vote' }
            >
                建立投票
            </Button>
        </div>
    </>
)

function Posts() {
    const contentBlock = (
        <>
            <Row>
                <Col span={ 3 } />
                <Col span={ 18 }>
                    { AuthUtil.isLogin() ? createButton : <></> }
                    < PostList />
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