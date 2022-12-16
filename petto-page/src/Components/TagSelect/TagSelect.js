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
                id: tag.id,
                label: tag.text,
                value: tag.text, 
            }
        )
    }
    return options;
}


function TagSelect() {
    const [options, setOptions] = useState([]);
    useEffect(() => {
        Request.get(
            "/api/tags",
            (response) => {
                console.log(response);
                setOptions(_ => getOptions(response));
            }
        );
    }, []);
    
    return  (
        <Select
            mode="multiple"
            style={{
                width: '424px',
                borderColor: 'black ',
            }}
            showArrow
            placeholder="選擇標籤.."
            optionLabelProp="label"
            options={ options }
        />
    );
}
export { TagSelect };
