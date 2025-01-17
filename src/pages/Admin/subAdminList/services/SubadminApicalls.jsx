import { Service_url, urlEnd } from "../../../../../config/app.config";

const getSubAdminsList = async({token,current_page}) => {
    try{
        const response = await fetch(`${Service_url}${urlEnd}admin-users?page=${current_page}`,{
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

// handle get particular subadmin data
const getSingleSubadmin = async({token,id}) => {
    // console.log(id)
    try{
        const response = await fetch(`${Service_url}${urlEnd}admin-users/${id}`,{
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

// handle create new admin or subadmin
const createNewAuthorizedPerson = async({body,token}) => {
    console.log(body,token);
    
    try{
        const response = await fetch(`${Service_url}${urlEnd}new-rolecontroller`,{
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

// handle update subadmin
const updateAuthorizedPerson = async({body,token,id}) => {
    console.log(body,token,id);
    
    try{
        const response = await fetch(`${Service_url}${urlEnd}admin-edit/${id}`,{
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

// handle delete subadmin
const deleteAuthorizedPerson = async({token,id}) => {
    // console.log(body,token);
    
    try{
        const response = await fetch(`${Service_url}${urlEnd}admin-delete/${id}`,{
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


export {getSubAdminsList , createNewAuthorizedPerson, getSingleSubadmin,updateAuthorizedPerson,deleteAuthorizedPerson}