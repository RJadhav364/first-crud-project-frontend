import { Service_url } from "../../../../config/app.config";

const loginUser = async(requestedcredentials) => {
    // await fetch(`${Service_url}/admin/userlogin`)
    // .then((res) => res.json())
    // .then((data) => {
    //     console.log("data", data);
    // })
    console.log(requestedcredentials)
    try{
        const response = await fetch(`${Service_url}admin/userlogin`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // Ensure the Content-Type is set to application/json
              },
            body: JSON.stringify(requestedcredentials)
        }
        );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data)
    // return data;
    } catch(error){
        console.log(error)
    }
}

export {loginUser}