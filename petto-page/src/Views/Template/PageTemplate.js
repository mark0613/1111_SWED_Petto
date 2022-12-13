import { Layout } from "antd";
import { NavBar } from "../../Components/NavBar";

import "./Template.css";


const { Header, Content, Footer } = Layout;
function PageTemplate(props) {
    const headerType = props.type;
    const contentBlock = props.contentBlock;

    return (
        <Layout className="layout">
            <Header>
                <NavBar type={ headerType } />
            </Header>
            <Content>
                <div className="site-layout-content">
                    { contentBlock }
                </div>
            </Content>
            <Footer></Footer>
        </Layout>
    )
}

export { PageTemplate };
