import { useParams } from "react-router-dom"
import { getUserInfo } from "./service/UserDailsRelatedApi";
import useAuthStore from "../../../store/AuthStore";
import { useEffect, useRef } from "react";

const UserDetailed = () => {
    const {id} = useParams();
    const {token} = useAuthStore();
    const fetchsubadminList = useRef(false);
    const getProvidedIdDetails = async() => {
        const detailsResponse = await getUserInfo({token,id});
        const data = await detailsResponse.json();
        switch(true){
            case data.status == 401:
                // console.log("Token has expired");
                // setIsReloginModelOpen(true);
                break;
            case data.status == 200:
                // setSubAdminsData(data);
                // setIsLoadingSubadminList(false);
                break;
        }
    }
    useEffect(()=>{
            if (fetchsubadminList.current) return;
            fetchsubadminList.current = true;
            // fetchsubadminList.current
            getProvidedIdDetails();   
        },[])
  return (
    <div className="card">
        <div className="card-body">
            <div className="flex lg:px-10 py-1.5 gap-2">
            <div className="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                <span className="text-white text-2xl lg:text-2.5xl leading-none font-semibold">
                624
                </span>
                <span className="text-white text-sm">Employees</span>
            </div>
            <span className="[&amp;:not(:last-child)]:border-e border-e-gray-300 my-1"></span>
            <div className="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                <span className="text-white text-2xl lg:text-2.5xl leading-none font-semibold">
                60.7M
                </span>
                <span className="text-white text-sm">Users</span>
            </div>
            <span className="[&amp;:not(:last-child)]:border-e border-e-gray-300 my-1"></span>
            <div className="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                <span className="text-white text-2xl lg:text-2.5xl leading-none font-semibold">
                369M
                </span>
                <span className="text-white text-sm">Revenue</span>
            </div>
            <span className="[&amp;:not(:last-child)]:border-e border-e-gray-300 my-1"></span>
            <div className="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                <span className="text-white text-2xl lg:text-2.5xl leading-none font-semibold">
                27
                </span>
                <span className="text-white text-sm">Company Rank</span>
            </div>
            <span className="[&amp;:not(:last-child)]:border-e border-e-gray-300 my-1"></span>
            </div>
        </div>
    </div>
  )
}

export default UserDetailed
