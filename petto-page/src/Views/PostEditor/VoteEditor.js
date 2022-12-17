import {
    Form,
    Input,
} from "antd";


const { TextArea } = Input;

function VoteEditor(props) {
    let text = "";
    const optionValue = ["", "", "", ""];
    const optionInput = [];
    const handleTextAreaChange = (e) => {
        text = e.target.value;
        props.onChange([text, optionValue]);
    }
    const handleVoteOptionTextChange = (e) => {
        let id = parseInt(e.target.id.split("-").slice(-1)[0]);
        optionValue[id - 1] = e.target.value;
        props.onChange([text, optionValue]);
    }
    for (let i=1; i<=4; i++) {
        optionInput.push(
            <Form.Item
                key={ `form-item-${i}` }
                label={ `${i} ` }
                name={ `option${i}` }
            >
                <Input
                    id={ `vote-option-${i}` }
                    onChange={ handleVoteOptionTextChange } 
                    placeholder={ `選項 ${i}` }
                />
            </Form.Item>
        )
    }


    return (
        <>
            <TextArea 
                onChange={ handleTextAreaChange }
                placeholder="建立投票!"
                style={{
                    resize: "none",
                    height: "300px",
                    marginBottom: "30px",
                }}
            />
            { optionInput }
        </>
    )
}

export { VoteEditor };
