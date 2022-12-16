import {
    React,
    useState,
    useEffect
} from "react";
import {
    Select,
} from "antd";

import { Request } from "../../Utils";


function getOptions(tagsList) {
    let options = [];
    for (let tag of tagsList.tags) {
        options.push(
            {
                label: tag.text,
                value: tag.id,
            }
        )
    }
    return options;
}


function TagSelect(props) {
    const [options, setOptions] = useState([]);
    const handleSelectChange = props.onChange;

    useEffect(() => {
        Request.get(
            "/api/tags",
            {
                success : (response) => {
                    setOptions(_ => getOptions(response));
                }
            }
        );
    }, []);
    
    return  (
        <Select
            mode="multiple"
            style={{
                width: "100%",
                borderColor: "black",
            }}
            showArrow
            placeholder="選擇標籤.."
            optionLabelProp="label"
            options={ options }
            onChange={ handleSelectChange }
        />
    );
}
export { TagSelect };
