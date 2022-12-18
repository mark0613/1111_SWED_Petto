import {
    Button,
    Input,
    Progress,
} from "antd";
import { 
    PlusCircleOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from "react";
import {
    AuthUtil,
    CookieUtil,
    Request
} from "../../Utils";

import "./Vote.css";


function compare(a, b) {
    if (a.text > b.text) {
        return 1;
    }
    else if (a.text < b.text) {
        return -1;
    }
    else {
        return 0;
    }
}

function Options(props) {
    const options = props.data;
    const jwt = AuthUtil.isLogin() ? CookieUtil.getValue("token") : "";
    const handleVoteButtonClick = (e) => {
        let optionId = parseInt(e.currentTarget.id.split("-").slice(-1)[0]);
        const formData = new FormData();
        formData.append("jwt", jwt);
        formData.append("option_id", optionId);
        Request.post(
            "/api/vote",
            {
                body: formData,
                success: (response) => {
                    alert(response.message);
                    props.onClick();
                },
            }
        )
    };

    const result = [];
    options.sort(compare);
    for (let option of options) {
        result.push(
            <Input.Group compact key={ `vote-option-${option.id}` }>
                <Input 
                    style={{ 
                        width: "calc(100% - 32px)",
                        color: "#000",
                        backgroundColor: "#fff",
                        cursor: "text",
                        marginBottom: "20px",
                    }}
                    disabled
                    defaultValue={ option.text }
                />
                <Button 
                    type="primary"
                    icon={ <PlusCircleOutlined /> }
                    style={{
                        borderRadius: "0 30% 30% 0",
                    }}
                    id={ `vote-button-${option.id}` }
                    onClick={ handleVoteButtonClick }
                />
            </Input.Group>
        );
    }
    return result;
}

function Result(props) {
    const result = props.data;
    result.sort(compare);
    let count = 0;
    for(let option of result) {
        count += option.count;
    }

    const progress = [];
    let index = 0;
    for (let option of result) {
        progress.push(
            <Progress
                strokeColor="greent"
                key={ `progress-${index}` }
                format={ (percent) => `${option.text} ${percent}%` }
                percent={ parseInt(option.count / count * 100) }
                status="active"
                style={{
                    width: "80%",
                    marginBotton: "20px",
                }}
            />
        );
        index++;
    }

    return progress;
}

function Vote(props) {
    const [hasVoted, setHasVoted] = useState(false);
    const [renderCount, setRenderCount] = useState(0);
    const postId = props.post;
    const userId = AuthUtil.isLogin() ? AuthUtil.getUserDetails().id : -1;
    const options = props.options;
    const result = props.result;
    const render = () => {
        setHasVoted(true);
        setRenderCount(v => v+1);
    };

    useEffect(() => {
        Request.get(
            `/api/vote-record?post=${postId}&user=${userId}`,
            {
                success: (response) => {
                    if (response.option !== null) {
                        setHasVoted(true);
                    }
                },
            }
        )
    }, [])

    return (
        <div
            style={{
                padding: "3%",
            }}
        >
            {
                hasVoted ?
                <Result data={ result } /> :
                <Options data={ options } post={ postId } onClick={ render } />
            }
        </div>
    );
}

export { Vote };
