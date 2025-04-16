import { useParams } from "react-router-dom"
import { getUserInfo, updateProfileDetails } from "./service/UserDailsRelatedApi";
import useAuthStore from "../../../store/AuthStore";
import { useEffect, useRef, useState } from "react";
import undrawpicprofile from "../../../assets/undraw_pic-profile_nr49.svg"
import { emailregx } from "../../../validation/InputValidation";
import ConfirmationBox from "../../../components/ConfirmationBox";
import Relogin from "../../../components/Relogin";
import { toast } from "react-toastify";

const UserDetailed = () => {
    const {id} = useParams();
    const {token,storedrole} = useAuthStore();
    const fetchsubadminList = useRef(false);
    const [storedApiResult,setStoredApiResult] = useState({
        totalAdminsCount: 0,
        totalUsersCount: 0,
        totalInactiveUsersCount: 0,
        uerDetailById: null,
        assignedUserCount: 0
    })
    const editFieldData = useRef({
        firstname: "",
        email: "",
        mnumber: "",
        lastname: undefined
    }); 
    const [isEditModelOpen,setIsEditModelOpen] = useState(false);
    const modalDetails = useRef({
        modalBody: "",
        showConfirmButton: "",
        showCancelButton: "",
        modelTitleCon: "",
        storeEditedValues: {}
    })
    const [isConfirmationModelOpen , setIsConfirmationModelOpen] = useState(false);
    const [isReloginModelOpen , setIsReloginModelOpen] = useState(false);
    const getProvidedIdDetails = async() => {
        const detailsResponse = await getUserInfo({token,id});
        const data = await detailsResponse.json();
        switch(true){
            case detailsResponse.status == 401:
                // console.log("Token has expired");
                setIsReloginModelOpen(true);
                break;
            case detailsResponse.status == 200:
                setStoredApiResult({
                    uerDetailById : data.data,
                    totalAdminsCount : data.totalSubAdminCount,
                    totalUsersCount : data.totalUserCount,
                    totalInactiveUsersCount : data.inActiveUserCount,
                    assignedUserCount : data.countUserData
                })
                break;
        }
    }
    useEffect(()=>{
            if (fetchsubadminList.current) return;
            fetchsubadminList.current = true;
            // fetchsubadminList.current
            getProvidedIdDetails();   
        },[storedApiResult])

    const handleSubmitData = () => {
        switch(true){
            case editFieldData.current.firstname.value == "" || editFieldData.current?.lastname?.value == "" || editFieldData.current.email.value == "" || editFieldData.current.mnumber.value == "":
                alert("All fields are required");
                break;
            case !emailregx.test(editFieldData.current.email.value):
                alert("Enter valid email");
                break;
            default: 
            let formData = {
                firstname: editFieldData.current.firstname.value,
                email: editFieldData.current.email.value,
                mnumber: editFieldData.current.mnumber.value,
                lastname: editFieldData.current?.lastname?.value
            }
            // console.log(formData)
            const editedFields = Object.keys(formData).filter(
                (key) => formData[key] !== storedApiResult?.uerDetailById[key]
            );
            const editedValues = {};
            editedFields.forEach((field) => {
                editedValues[field] = formData[field];
            })
            switch(true){
                case Object.keys(editedValues).length == 0:
                    setIsConfirmationModelOpen(true);
                    modalDetails.current.modalBody = "Not made any changes";
                    modalDetails.current.showConfirmButton = false;
                    modalDetails.current.showCancelButton = true;
                    modalDetails.current.modelTitleCon = "Oops...";
                    break;
                default:
                    setIsConfirmationModelOpen(true);
                    modalDetails.current.modalBody = "Are you sure you want to update Profile";
                    modalDetails.current.showConfirmButton = true;
                    modalDetails.current.showCancelButton = true;
                    modalDetails.current.modelTitleCon = "Oops...";
                    modalDetails.current.storeEditedValues = editedValues;
            }
        }
    }
    const handleEditProfile = async() => {
        // console.log(modalDetails.current.storeEditedValues)
        const profileEditResponse = await updateProfileDetails({body: modalDetails.current.storeEditedValues, token, id});
        switch(true){
            case profileEditResponse.status == 200:
                toast.success("Profile Updated Successfully!",{
                    position: "top-center",
                    theme: "dark"
                })
                setIsConfirmationModelOpen(false);
                setIsEditModelOpen(false);
                getProvidedIdDetails();
                break;
            case profileEditResponse.status == 401:
                setIsReloginModelOpen(true);
                break;
            default:
                toast.error("Something went wrong! Try after sometime",{
                    position: "top-center",
                    theme: "dark"
                });
        }
    }
  return (
    <>
        <div className="card w-full h-full flex justify-center items-center max-[721px]:px-[20px]">
            <div className="card-body bg-[#27293d] w-[700px] py-10 rounded-md relative">
                <div className="outer-img-div absolute bg-[#27293D] left-2/4 translate-x-[-50px] top-[-60px] rounded-[50%]">
                    <img src={undrawpicprofile} className="w-[100px] h-[100px]" alt="" />
                </div>
                    <p className="text-center text-xl text-white mt-[5px]">{storedApiResult?.uerDetailById?.firstname}</p>
                    <p className="flex justify-center items-center">
                    <button onClick={()=> {setIsEditModelOpen(true)}} className="m-2 text-[13px] p-[5px_15px] text-center uppercase transition-all duration-500 bg-gradient-to-r from-[#FF512F] via-[#F09819] to-[#FF512F] text-white rounded-lg block border-0 font-bold shadow-[0px_0px_14px_-7px_#f09819] cursor-pointer select-none touch-manipulation group-hover:bg-[right_center] hover:text-white active:scale-[0.95]">
                        Edit
                    </button>

                    </p>
                    {
                        storedrole != "User" && (
                            <div className="flex py-1.5 gap-2 max-[613px]:grid max-[613px]:grid-cols-2 max-[613px]:gap-[30px]">
                            <div className="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                                <span className="text-white text-2xl lg:text-2.5xl leading-none font-semibold">
                                {storedApiResult.totalAdminsCount}
                                </span>
                                <span className="text-white text-sm">Employees</span>
                            </div>
                            <span className="[&amp;:not(:last-child)]:border-e border-e-gray-300 my-1 max-[613px]:hidden"></span>
                            <div className="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                                <span className="text-white text-2xl lg:text-2.5xl leading-none font-semibold">
                                {storedApiResult.totalUsersCount}
                                </span>
                                <span className="text-white text-sm">Users</span>
                            </div>
                            <span className="[&amp;:not(:last-child)]:border-e border-e-gray-300 my-1 max-[613px]:hidden"></span>
                            <div className="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                                <span className="text-white text-2xl lg:text-2.5xl leading-none font-semibold">
                                {storedApiResult.assignedUserCount}
                                </span>
                                <span className="text-white text-sm">Assigned User</span>
                            </div>
                            <span className="[&amp;:not(:last-child)]:border-e border-e-gray-300 my-1 max-[613px]:hidden"></span>
                            <div className="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                                <span className="text-white text-2xl lg:text-2.5xl leading-none font-semibold">
                                {storedApiResult.totalInactiveUsersCount}
                                </span>
                                <span className="text-white text-sm">Inactive User</span>
                            </div>
                            <span className="[&amp;:not(:last-child)]:border-e border-e-gray-300 my-1 max-[613px]:hidden"></span>
                            </div>
                        )
                    }
                <div className="px-[46px] pt-[5px] text-white grid grid-cols-2 gap-[10px] max-[480px]:grid-cols-1">
                    <div className="info">
                        <div className="title-head p-[5px]">First Name</div>
                        <p className="bg-[#17171e] p-[5px]">{storedApiResult?.uerDetailById?.firstname}</p>
                    </div>
                    {
                        storedrole == "User" && (
                            <div className="info">
                                <div className="title-head p-[5px]">Last Name</div>
                                <p className="bg-[#17171e] p-[5px]">{storedApiResult?.uerDetailById?.lastname}</p>
                            </div>
                        )
                    }
                    <div className="info">
                        <div className="title-head p-[5px]">Email</div>
                        <p className="bg-[#17171e] p-[5px]">{storedApiResult?.uerDetailById?.email}</p>
                    </div>
                    <div className="info">
                        <div className="title-head p-[5px]">Number</div>
                        <p className="bg-[#17171e] p-[5px]">{storedApiResult?.uerDetailById?.mnumber}</p>
                    </div>
                    <div className="info">
                        <div className="title-head p-[5px]">Role</div>
                        <p className="bg-[#17171e] p-[5px]">{storedApiResult?.uerDetailById?.role.charAt(0).toUpperCase() + storedApiResult?.uerDetailById?.role.slice(1).toLowerCase()}</p>
                    </div>
                    {
                        storedrole == "User" && (
                            <>
                            <div className="info">
                                <div className="title-head p-[5px]">Status</div>
                                <p className="bg-[#17171e] p-[5px]">{storedApiResult?.uerDetailById?.status}</p>
                            </div>
                            <div className="info">
                                <div className="title-head p-[5px]">Authorizer Name</div>
                                <p className="bg-[#17171e] p-[5px]">{storedApiResult?.uerDetailById?.AuthorizerName}</p>
                            </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
        {/* edit component start */}
        <div className={`fixed inset-0 bg-black/10 backdrop-blur-[1px] flex justify-center transition-all duration-500 ease-in-out transform origin-top items-center ${isEditModelOpen ? "block scale-y-100" : "hidden scale-y-0"}`} onClick={()=> setIsEditModelOpen(false)}></div>
            <div className={`p-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#27293D] rounded-[20px] w-[1300px] transition-all duration-700 ease-in-out ${isEditModelOpen ? "scale-y-100" : "scale-y-0"}`}>
            {/* <div className={`group m-2 p-4 text-center uppercase bg-gradient-to-r text-white rounded-lg block border-0 font-bold shadow-[0px_0px_14px_-7px_#f09819] cursor-pointer select-none transition-all duration-500 ease-in-out transform origin-top 
            `}> */}
                 {/* ${isEditModelOpen ? "scale-y-100" : "scale-y-0"} */}
                <h2 className="text-2xl text-[#cbf5e3]">My Profile</h2>
                <div className='card-box border-20 pt-[25px] px-[60px] pb-[50px] mt-[15px]'>
                    <div className='user-avatar-setting d-flex align-items-center mb-[15px]'>
                    <img src={undrawpicprofile} className="w-[100px] h-[100px] bg-[#E5E6E8] rounded-[50%]" alt="" />
                    </div>
                    <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 gap-[30px]">
                    <div className="dash-input-wrapper mb-30">
                        <label htmlFor="" className="block text-[20px] text-[#f0fff9] mb-[10px]">First Name*</label>
                        <input type="text" className="w-full h-[55px] tracking-[-0.16px] rounded-[7px] px-[20px] border-[#e5e5e5]" defaultValue={storedApiResult?.uerDetailById?.firstname} ref={(e)=>{editFieldData.current.firstname = e}} placeholder="Name" />
                    </div>
                    {
                        storedrole == "User" && (
                            <div className="dash-input-wrapper mb-30">
                                <label htmlFor="" className="block text-[20px] text-[#f0fff9] mb-[10px]">Last Name*</label>
                                <input type="text" className="w-full h-[55px] tracking-[-0.16px] rounded-[7px] px-[20px] border-[#e5e5e5]" defaultValue={storedApiResult?.uerDetailById?.lastname} ref={(e)=>{editFieldData.current.lastname = e}} placeholder="Name" />
                            </div>
                        )
                    }
                    <div className="dash-input-wrapper mb-30">
                        <label htmlFor="" className="block text-[20px] text-[#f0fff9] mb-[10px]">Email*</label>
                        <input type="text" defaultValue={storedApiResult?.uerDetailById?.email} ref={(e)=>{editFieldData.current.email = e}} className="w-full h-[55px] tracking-[-0.16px] rounded-[7px] px-[20px] border-[#e5e5e5]" placeholder="Email" />
                    </div>
                    <div className="dash-input-wrapper mb-30">
                        <label htmlFor="" className="block text-[20px] text-[#f0fff9] mb-[10px]">Number*</label>
                        <input type="text" defaultValue={storedApiResult?.uerDetailById?.mnumber} ref={(e)=>{editFieldData.current.mnumber = e}} className="w-full h-[55px] tracking-[-0.16px] rounded-[7px] px-[20px] border-[#e5e5e5]" placeholder="Number" />
                    </div>
                    </div>
                    <div className="btns grid grid-cols-2 mt-[25px] gap-[30px]">
                        <button className="bg-[#39838A] p-[12px] rounded-[5px] text-white" onClick={handleSubmitData}>Submit</button>
                        <button className="bg-[#84634F] p-[12px] rounded-[5px] text-white" onClick={()=> setIsEditModelOpen(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        
        {/* edit component end */}
        <ConfirmationBox 
            confirmBtnText="OK"
            cancelBtnText="Cancel"
            isOpen={isConfirmationModelOpen}
            confirmationMessage={modalDetails.current.modalBody}
            confirmButtonVisible={modalDetails.current.showConfirmButton}
            cancelButtonVisible={modalDetails.current.showCancelButton}
            modal_title={modalDetails.current.modelTitleCon}
            handleConfirmButtonFn={handleEditProfile}
            onClose={() => setIsConfirmationModelOpen(false)}
        />
        <Relogin 
            isReloginModelOpen={isReloginModelOpen}
            onReloginModelClosed={() => setIsReloginModelOpen(false)}
        />
    </>
  )
}

export default UserDetailed
