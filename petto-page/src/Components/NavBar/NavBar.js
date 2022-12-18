import {
    Button,
    Col,
    Image,
    Input,
    Row,
    Select,
    Space,
} from "antd";
import { AuthUtil } from "../../Utils";


const { Search } = Input;
const onSearch = (text) => {
    window.location.href = `/posts?keyword=${text}`;
}
const searchBar = (
    <Search 
        className="search-bar"
        placeholder="請輸入關鍵字搜尋...." 
        onSearch={ onSearch } 
        enterButton
    />
)

const onSelectChange = (option) => {
    console.log(option);
}

function NavBar(props) {
    let username;
    if (AuthUtil.isLogin()) 
        username = AuthUtil.getUserDetails().username
    const dropdownOptions = [
        {
            label : <a href="/posts/mine">我的文章</a>,
            key: '0',
        },
        {
            label : <a href="/posts/keep">我的收藏</a>,
            key: '1',
        },
        {
            label : <a href="">聊天室</a>,
            key: '2',
        },
        {
            label : (
                <Button 
                    type="text"
                    style={{
                        display: 'flex',
                        paddingBottom:'0px',
                        justifyContent:'center',
                    }} 
                    onClick={ () => AuthUtil.logout()}
                    htmlType="submit"
                >
                    <a 
                        style={{
                            color:'black',
                        }}
                        href='/'
                    >
                        登出
                    </a>
                </Button>
            ),
            key: '3',
        },
    ];

    return (
        <>
            <Row>
                <Col span={ 3 } >
                    <a href="/posts">

                        <Image 
                            src="https://i.imgur.com/YenWz4J.png"
                            preview={ false }
                        />
                    </a>
                </Col>
                <Col span={ 3 } />
                <Col span={ 10 }>
                    { (props.type === "home") ? searchBar : <></> }
                </Col>
                <Col span={ 5 } />
                <Col span={ 3 }>
                    {
                        AuthUtil.isLogin() ?
                            <Select
                                style={{
                                    textAlign: "center",
                                    width: 100,
                                }}
                                defaultValue={ username }
                                options={ dropdownOptions }
                                onChange={ onSelectChange }
                            />
                         :
                        <Space>
                            <Button>
                                <a href="/register">
                                    註冊
                                </a>
                            </Button>
                            <Button>
                                <a href="/login">
                                    登入
                                </a>
                            </Button>
                        </Space>
                    }
                </Col>
            </Row>
        </>
    )
}

export { NavBar };
