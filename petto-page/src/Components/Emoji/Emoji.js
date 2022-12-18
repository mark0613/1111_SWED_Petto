import {
    Avatar,
} from "antd";


const emojiUrl = {
    good : "https://cdn-icons-png.flaticon.com/512/4926/4926585.png",
    love : "https://cdn-icons-png.flaticon.com/512/742/742750.png",
    funny : "https://cdn-icons-png.flaticon.com/512/742/742920.png",
    sad : "https://cdn-icons-png.flaticon.com/512/742/742784.png",
    angry : "https://cdn-icons-png.flaticon.com/512/743/743418.png",
};

function getAllEmojis() {
    let result = {};
    let index = 1;
    for (let emoji in emojiUrl) {
        result[index] = emoji;
        index++;
    }
    return result;
}

function getEmojiIcons(size=25) {
    const emojiIcons = {};
    let index = 0;
    for (let emoji in emojiUrl) {
        emojiIcons[emoji] = (
            <Avatar
                key={ `emoji-icon-${index}` }
                size={ size } 
                src={ emojiUrl[emoji] } 
            />
        );
        index++;
    }
    return emojiIcons;
}

export { getAllEmojis, getEmojiIcons };
