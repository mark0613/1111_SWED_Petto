import {
    Button,
    Col,
    Input,
    Row,
    Select,
    Space,
} from "antd";
import { AuthUtil } from "../../Utils";


const { Search } = Input;
const onSearch = (text) => {
    console.log(text);
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
            label : <a href="">我的文章</a>,
            key: '0',
        },
        {
            label : <a href="">我的收藏</a>,
            key: '1',
        },
        {
            label : <a href="">會員資料</a>,
            key: '3',
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
            key: '4',
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
                <Col span={ 1 }></Col>
                <Col span={ 6 }>
                    { (props.type == "home") ? searchBar : <></> }
                </Col>
                <Col span={ 8 }></Col>
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
