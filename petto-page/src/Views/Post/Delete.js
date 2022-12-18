import { 
    DeleteOutlined,
} from '@ant-design/icons';
import { 
    AuthUtil,
    CookieUtil,
    Request,
} from "../../Utils";

function onClick(id) {
    let formData = new FormData();
    formData.append("jwt", CookieUtil.getValue("token"));
    
    Request.delete(
        `/api/post/${id}`,
        {
            body : formData,
            success : (response) => {
                console.log(response);
                alert(response.message);
                window.location.href='/';
            }
        }
    )
}
function DeleteButton(props) {
    let name = "";
    if (AuthUtil.isLogin()) {
        name = AuthUtil.getUserDetails().username;
    }
    if (props.username === name) {
        return (
            <DeleteOutlined 
                onClick={ () => onClick(props.id) }
            />
        )
    }
    else {
        return (
            <></>
        )
    }
}

export { DeleteButton }
