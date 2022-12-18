import {
    Button,
    Space,
    Tooltip,
} from "antd";
import { 
    SmileOutlined,
} from '@ant-design/icons';
import { getAllEmojis, getEmojiIcons } from "../../Components/Emoji";
import { AuthUtil, CookieUtil, Request } from "../../Utils";
import { useEffect, useState } from "react";


function generateEmojiButton(postId, renderPage) {
    let buttons = [];
    const emojiIcons = getEmojiIcons(25);
    const handleEmojiClick = (e) => {
        if (!AuthUtil.isLogin()) {
            alert("請先登入!");
            return;
        }
        const emojiId = parseInt(e.currentTarget.id.split("-").slice(-1)[0]);
        const formData = new FormData()
        formData.append("jwt", CookieUtil.getValue("token"));
        formData.append("post_id", postId);
        formData.append("emoji_id", emojiId);
        Request.post(
            "/api/emoji",
            {
                body: formData,
                success: (response) => {
                    renderPage();
                },
            }
        )
    }
    let index = 1;
    for (let emoji in emojiIcons) {
        let icon = emojiIcons[emoji];
        buttons.push(
            <Button
                key={ `emoji-button-${index}` }
                id={ `emoji-button-${index}` }
                onClick={ handleEmojiClick }
                style={{
                    backgroundColor: "transparent",
                    border: "none",
                }}
            >
                { icon }
            </Button>
        );
        index++;
    }
    return buttons;
}

function EmojiTooltip(props) {
    const postId = props.post;
    const onButtonClick = props.onClick;
    const tooltipContent = (
        <Space>
            { generateEmojiButton(postId, onButtonClick) }
        </Space>
    );
    const [currentEmoji, setCurrentEmoji] = useState(<SmileOutlined key="emoji" />);

    useEffect(() => {
        if (AuthUtil.isLogin()) {
            let userId = AuthUtil.getUserDetails().id;
            Request.get(
                `/api/emoji-record?post=${postId}&user=${userId}`,
                {
                    success: (response) => {
                        let emoji = response.emoji;
                        if (emoji) {
                            emoji = getEmojiIcons()[getAllEmojis()[emoji.id]];
                            setCurrentEmoji(_ => emoji);
                        }
                    }
                }
            );
        }
    }, [currentEmoji]);

    return (
        <Tooltip 
            title={ tooltipContent }
            overlayStyle={{
                maxWidth: '350px'
            }}
        >
            { currentEmoji }
        </Tooltip>
    )
}

export { EmojiTooltip };
