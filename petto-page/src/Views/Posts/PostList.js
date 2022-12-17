import {
    React,
} from "react";
import {
    BackTop,
    Button,
    Col,
    Row,
} from "antd";

import { PostLists } from "../../Components/PostLists"
import { AuthUtil } from "../../Utils";
import { PageTemplate } from "../Template";

import "./PostList.css"
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
                type="primary"
                style={{
                    width: '120px',
                    borderRadius: '8px',
                    margin: 10,
                }}
                onClick={ () => window.location.href = '/post/new/text' }
            >
                建立一般文章
            </Button>

            <Button
                type="primary"
                style={{
                    width: '120px',
                    borderRadius: '8px',
                    margin: 10,
                }}
                onClick={ () => window.location.href = '/post/new/md' }
            >
                建立MD文章
            </Button>

            <Button
                type="primary"
                style={{
                    width: '120px',
                    borderRadius: '8px',
                    margin: 10,
                }}
                onClick={ () => window.location.href = '/post/new/vote' }
            >
                建立投票
            </Button>
        </div>
    </>
)

function PostList() {
    const contentBlock = (
        <>
            <Row>
                <Col span={ 3 } />
                <Col span={ 18 }>
                    { AuthUtil.isLogin() ? createButton : <></> }
                    < PostLists />
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

export { PostList };
