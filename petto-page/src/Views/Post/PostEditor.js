import {
    Button,
    Col,
    Form,
    Input,
    Row,
} from "antd";

import { MarkdownEditor } from "./MdEditor";
import { PageTemplate } from "../Template";
import { TagSelect } from "../../Components/TagSelect";
import { CookieUtil, Request } from "../../Utils";



function PostEditor(props) {
    const type = props.type;
    let content;
    let tags;
    let editor;

    if (type === "md") {
        editor = <MarkdownEditor onChange={ value => content=value } />
    }

    const onFinish = (data) => {
        let formData = new FormData();
        console.log(tags);
        formData.append("title", data.title);
        formData.append("content", content);
        formData.append("mode", type);
        formData.append("tags", tags);
        formData.append("jwt", CookieUtil.getValue("token"));

        Request.post(
            "/api/post",
            {
                body : formData,
                success : (response) => {
                    console.log(response);
                }
            }
        )
    }

    const contentBlock = (
        <>
            <Form
                name="post-form"
                onFinish={ onFinish }
                style={{
                    width: "60%",
                    marginLeft: "20%",
                }}
            >
                <Form.Item
                    name={[ 'title' ]}
                >
                    <Input
                        placeholder="文章標題"
                    />
                </Form.Item>

                <Form.Item
                    style={{
                        marginBottom: "8px",
                    }}
                >
                    { editor }
                </Form.Item>

                <Form.Item
                    style={{
                        marginBottom: "0px",
                        textAlign: "center"
                    }}
                >
                    <Row>
                        <Col span={ 10 }>
                            <TagSelect
                                onChange={ value => tags=value }
                            />
                        </Col>
                        <Col span={ 9 }></Col>
                        <Col span={ 5 }>
                            <Button
                                type="primary"
                                style={{
                                    width: "120px",
                                    marginLeft: "50px",
                                    borderRadius: "8px",
                                }}
                                onClick={ Form.submit }
                                htmlType="submit"
                            >
                                發佈
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </>
    )

    
    return (
        <PageTemplate contentBlock={ contentBlock } />
    );
}

export { PostEditor };
