import { Service_url, urlEnd } from "../../../../../config/app.config";

const getSubAdminsList = async({token}) => {
    try{
        const response = await fetch(`${Service_url}${urlEnd}admin-users`,{
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

export {getSubAdminsList}