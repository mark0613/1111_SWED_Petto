import { useState, useEffect, } from "react";
    import {
    Layout,
} from "antd";

import "./Template.css";


const { Header, Content } = Layout;

function Template(props) {
    
    const LoginContentBlock = props.LoginContentBlock;
    const RegisterContentBlock = props.RegisterContentBlock;
    const OtherPageNavBarNoLoginHeaderBlock = props.OtherPageNavBarNoLoginHeaderBlock;
    const OtherPageNavBarLoginHeaderBlock = props.OtherPageNavBarLoginHeaderBlock;
    const HomePageNavBarLoginHeaderBlock = props.HomePageNavBarLoginHeaderBlock;
    const [] = useState(false);
    return (
    <>
    <Layout>
        <Header
            style={{
                backgroundColor:'antiquewhite',
                paddingBottom:'190px',
            }}
            >
                { HomePageNavBarLoginHeaderBlock }
                { OtherPageNavBarNoLoginHeaderBlock }
                { OtherPageNavBarLoginHeaderBlock }
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
