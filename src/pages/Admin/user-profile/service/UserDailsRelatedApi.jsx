import { Service_url , urlEnd} from "../../../../../config/app.config";

const getUserInfo = async({token,id}) => {
    // console.log(id)
    try{
        const response = await fetch(`${Service_url}${urlEnd}admin-users/${id}?page=detailed`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        // const result  = await response.json();
        // console.log(result);
        return response
    } catch(err){
        // console.log(err);
        throw err;
    }
}

const updateProfileDetails = async({body,token,id}) => {
    try{
        const response = await fetch(`${Service_url}${urlEnd}profile-edit/${id}`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        // const result  = await response.json();
        // console.log(result);
        return response
    } catch(err){
        console.log(err);
    }
}
export {getUserInfo,updateProfileDetails}