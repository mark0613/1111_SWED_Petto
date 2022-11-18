import { useState, useEffect, } from "react";
    import {
    Layout,
} from "antd";

import "./Template.css";


const { Header, Content } = Layout;

function Template(props) {
    
    const LogincontentBlock = props.LogincontentBlock;
    const RegistercontentBlock = props.RegistercontentBlock;
    const NavBarcontentBlock = props.NavBarcontentBlock;
    const [] = useState(false);
    return (
    <>
    <Layout>
        <Header
            style={{
                backgroundColor:'antiquewhite',
                paddingBottom:'120px',
            }}
            >
                <div className="site-layout-header">
                    { NavBarcontentBlock }
                </div>
        </Header>

        <Content
            style={{
                //lineHeight:'300px',
                //backgroundColor:'antiquewhite',
                //blockSize:'500px'
                paddingBottom:'500px',
            }}
            >
                <div className="site-layout-content">
                    { LogincontentBlock },
                    { RegistercontentBlock },
                </div>
        </Content>
    </Layout>
    
    </>
    )
};


export { Template };
