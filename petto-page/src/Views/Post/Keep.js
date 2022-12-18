import { 
    CookieUtil,
    Request,
} from "../../Utils";


function Keep(id) {
    let formData = new FormData();
    formData.append("jwt", CookieUtil.getValue("token"));
    
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

export { Keep }