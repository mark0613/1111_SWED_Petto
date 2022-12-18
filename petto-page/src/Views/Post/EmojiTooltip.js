import {
    Button,
    Space,
    Tooltip,
} from "antd";
import { 
    SmileOutlined,
} from '@ant-design/icons';
import { getEmojiIcons } from "../../Components/Emoji";
import { AuthUtil, CookieUtil, Request } from "../../Utils";


function generateEmojiButton(postId) {
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
                    alert(response.message);
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

function EmojiTooltip(porps) {
    const postId = porps.post;
    const tooltipContent = (
        <Space>
            { generateEmojiButton(postId) }
        </Space>
    );

    return (
        <Tooltip 
            title={ tooltipContent }
            overlayStyle={{
                maxWidth: '350px'
            }}
        >
            <SmileOutlined key="emoji" />
        </Tooltip>
    )
}

export { EmojiTooltip };
