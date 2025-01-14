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
// create new uer
const createNewUser = async({body,token}) => {
    console.log(body,token);
    
    try{
        const response = await fetch(`${Service_url}${urlEndForUser}users-create`,{
            method: "POST",
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

// handle partcular user fetch data
const getPartcularUser = async({id,token}) => {
    try{
        const response = await fetch(`${Service_url}${urlEndForUser}get-role-users/${id}`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        // const result  = await response.json();
        // console.log(result);
        return response
    } catch(err){
        console.log(err);
    }
}

export {getUserList,createNewUser,getPartcularUser}