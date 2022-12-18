import {
    Avatar,
} from "antd";


const emojiUrl = {
    good : `${process.env.PUBLIC_URL}/images/good.png`,
    love : `${process.env.PUBLIC_URL}/images/love.png`,
    funny : `${process.env.PUBLIC_URL}/images/funny.png`,
    sad : `${process.env.PUBLIC_URL}/images/sad.png`,
    angry : `${process.env.PUBLIC_URL}/images/angry.png`,
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
