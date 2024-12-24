import { Service_url, urlEndForUser } from "../../../../../config/app.config";

const getUserList = async({token}) => {
    try{
        const response = await fetch(`${Service_url}${urlEndForUser}get-role-users`,{
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
        console.log(err);
    }
}

export {getUserList}