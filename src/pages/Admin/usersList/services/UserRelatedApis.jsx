import { Service_url, urlEndForUser } from "../../../../../config/app.config";

const getUserList = async({token,current_page}) => {
    console.log(current_page)
    try{
        const response = await fetch(`${Service_url}${urlEndForUser}get-role-users?page=${current_page}`,{
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

const updateUser = async({body,token,id,hasAllRights}) => {
    try{
        const response = await fetch(`${Service_url}${urlEndForUser}get-role-users/${id}`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({body,hasAllRights})
        })
        // const result  = await response.json();
        // console.log(result);
        return response
    } catch(err){
        console.log(err);
    }
}

const deleteUserById = async({token,id}) => {
    try{
        const response = await fetch(`${Service_url}${urlEndForUser}get-role-users/${id}`,{
            method: "DELETE",
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

export {getUserList,createNewUser,getPartcularUser,updateUser,deleteUserById}