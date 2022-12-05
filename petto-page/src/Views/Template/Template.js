import { useState, useEffect, } from "react";
import { Layout } from "antd";
import "./Template.css";


const { Header, Content } = Layout;
function Template(props) {
    const LoginContentBlock = props.LoginContentBlock;
    const PostListContentBlock = props.PostListContentBlock;
    const RegisterContentBlock = props.RegisterContentBlock;
    const MDCreatePostContentBlock = props.MDCreatePostContentBlock;
    const CommonCreatePostContentBlock = props.CommonCreatePostContentBlock;
    const HomePageNavBarLoginHeaderBlock = props.HomePageNavBarLoginHeaderBlock;
    const OtherPageNavBarLoginHeaderBlock = props.OtherPageNavBarLoginHeaderBlock;
    const HomePageNavBarNoLoginHeaderBlock = props.HomePageNavBarNoLoginHeaderBlock;
    const OtherPageNavBarNoLoginHeaderBlock = props.OtherPageNavBarNoLoginHeaderBlock;
    const [] = useState(false);

    return (
        <>
            <Layout>
                <Header
                    style={{
                        paddingBottom:'190px',
                        backgroundColor:'antiquewhite',
                    }}
                    >
                    { HomePageNavBarLoginHeaderBlock }    
                    { OtherPageNavBarLoginHeaderBlock }
                    { HomePageNavBarNoLoginHeaderBlock }
                    { OtherPageNavBarNoLoginHeaderBlock }
                </Header>

                <Content
                    style={{
                        paddingBottom:'500px',
                    }}
                >
                    { LoginContentBlock }
                    { PostListContentBlock }
                    { RegisterContentBlock } 
                    { MDCreatePostContentBlock }
                    { CommonCreatePostContentBlock }
                </Content>
            </Layout>
        </>
    )
};

export { Template };
