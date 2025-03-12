import { Service_url, urlEnd, urlEndForUser } from "../../../../../config/app.config";

const getSubadminCount = async({token,current_page}) => {
    try{
        const response = await fetch(`${Service_url}${urlEnd}admin-users?page=${current_page}`,{
          method: "GET",
          headers: {
              'ngrok-skip-browser-warning': 'true',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
      })
      return response;
      } catch(err){
        throw err
      }
}

const getUserList = async({token,current_page}) => {
    try{
        const response = await fetch(`${Service_url}${urlEndForUser}get-role-users?page=${current_page}`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok){
            throw Error()
        }
        // const result  = await response.json();
        console.log(response);
        return response
    } catch(err){
        console.log(err);
    }
}

export {getSubadminCount,getUserList}