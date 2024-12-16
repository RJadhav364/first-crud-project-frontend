import { Service_url, urlEnd } from "../../../../../config/app.config";

const getSubAdminsList = async() => {
    try{
        const response = await fetch(`${Service_url}${urlEnd}admin-users`)
        // const result  = await response.json();
        // console.log(result);
        return response
    } catch(err){
        console.log(err);
        
    }
}

export {getSubAdminsList}