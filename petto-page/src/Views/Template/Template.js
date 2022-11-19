import { useState, useEffect, } from "react";
import { Layout } from "antd";
import "./Template.css";


const { Header, Content } = Layout;
function Template(props) {
    const LoginContentBlock = props.LoginContentBlock;
    const RegisterContentBlock = props.RegisterContentBlock;
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
                    { RegisterContentBlock }   
                </Content>
            </Layout>
        </>
    )
};

export { Template };
