import { 
    TagOutlined,
} from '@ant-design/icons';
import {
    AuthUtil,
    CookieUtil,
    Request,
} from "../../Utils";


function keepPost(id) {
    let formData = new FormData();
    if (AuthUtil.isLogin()) {
        formData.append("jwt", CookieUtil.getValue("token"));    
    }
    Request.post(
        `/api/keep/${id}`,
        {
            body : formData,
            success : (response) => {
                console.log(response);
                alert(response.message);
            }
        }
    )
}

function Keep(props) {    
    return (
        <TagOutlined 
            key="keep"
            onClick={ () => keepPost(props.id) }
        />
    )
}

export { Keep }