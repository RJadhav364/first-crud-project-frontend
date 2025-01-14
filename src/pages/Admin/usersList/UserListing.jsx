import React, { useEffect, useRef, useState } from 'react'
import { getPartcularUser, getUserList } from './services/UserRelatedApis';
import useAuthStore from '../../../store/AuthStore';
import Button from '../../../components/Button';
import CreateUserModel from '../../../components/CreateUserModel';
import { getSubAdminsList } from '../subAdminList/services/SubadminApicalls';
import Relogin from '../../../components/Relogin';
import UpdateUserModel from '../../../components/UpdateUserModel';

const UserListing = () => {
  const [userData , setUserData] = useState([]);
  const [isCreateUserModel,setIsCreateUserModel] = useState(false); // to open create user model
  const [isUpdateUserModel,setIsUpdateUserModel] = useState(false); // to open update user model
  const {token,hasAllRights,storedrole} = useAuthStore();
  const storeAuthorizedData = useRef([]); //store admin and subadmin data
  const [isReloginModelOpen , setIsReloginModelOpen] = useState(false);
  const storePartcularUserData = useRef({})
  // all user list
  const allUserListFn = async() => {
    const result = await getUserList({token});
    const data = await result.json();
    // console.log(await result.json());
    switch(true){
      case result.status == 401:
          console.log("Token has expired");
          setIsReloginModelOpen(true);
          break;
      default:
          setUserData(data.data)
    }
  }
  // subadmin list call define
  const authorizedPersonData = async() => {
    const result = await getSubAdminsList({token,current_page:"no_pagination"});
    const data = await result.json();
    // console.log(await result.json());
    switch(true){
      case result.status == 401:
          setIsReloginModelOpen(true);
          break;
      default:
          storeAuthorizedData.current = data.data
    }
  }
  const handlePerformAction = async(id, actionToPerform) => {
    switch(true){
      case actionToPerform == "EditAction":
        const callUserById = await getPartcularUser({id:id, token: token});
        const data = await callUserById.json();
        // console.log(data);
        storePartcularUserData.current = data;
        setIsUpdateUserModel(true);
        break;
    }
  }
  useEffect(()=>{
          // if (fetchsubadminList.current) return;
          // fetchsubadminList.current = true;
          // fetchsubadminList.current
          allUserListFn();   
          authorizedPersonData();   
      },[])
  return (
    <>
      <div className="w-full h-full text-white">
        <div className="card bg-[#27293d] m-[30px]">
          <div className="card-header pt-[15px] px-[15px] flex justify-between">
            <h4 className="card-title mb-[.75rem] text-white font-[100] leading-[1.45em] text-[1.0625rem]">Simple Table</h4>
            <div className="card-title mb-[.75rem] text-white font-[100] leading-[1.45em] text-[1.0625rem]">
            <Button
                btn_title="Add New User"
                classes="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                onclickFn={() => setIsCreateUserModel(true)}
                // onclickFn={handleOpenToSHow}
            />
            </div>
          </div>
          <div className="card-body p-[15px]">
              <div className="table-responsive ps w-full block">
                <table className="tablesorter table w-full">
                  <thead className="text-primary">
                    <tr>
                      <th className=' text-left py-[12px] px-[7px]'>First Name</th>
                      <th className=' text-left py-[12px] px-[7px]'>Last Name</th>
                      <th className=' text-left py-[12px] px-[7px]'>Email</th>
                      <th className=' text-left py-[12px] px-[7px]'>Role</th>
                      <th className=' text-left py-[12px] px-[7px]'>Assigned To</th>
                      <th className="text-left">Number</th>
                      <th className="text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      userData && userData.length > 0 && userData.map(({firstname,role,id,email,lastname,number,authorizedDetails})=>(
                        <tr key={id}>
                          {/* <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px] w-[48px]'><input checked={hasAllRights == "yes"} type="checkbox" name="" id="" onChange={() =>
                          handleCheckboxChange(_id,hasAllRights)
                          } />
                          </td> */}
                          <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>{firstname}</td>
                          <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>{lastname}</td>
                          <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>{email}</td>
                          <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>{role}</td>
                          <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>{authorizedDetails && authorizedDetails.firstname || "NA"}</td>
                          <td className="border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">{number}</td>
                          <td className="border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">
                          <div className="relative inline-block text-left">
                            <button
                            className={`relative h-10 max-h-[20px] w-10 max-w-[20px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${storedrole == "subadmin" ? hasAllRights == "yes" ? "" : "cursor-not-allowed" : ""}`}
                            type="button"
                            // disabled={storedrole == "subadmin" ? hasAllRights == "yes" ? "" : "true" : ""} 
                            onClick={()=> {handlePerformAction(id, "EditAction")}}
                            >
                              <span className="absolute transhtmlForm -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                <svg xmlns="http:www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" aria-hidden="true"
                                className="w-4 h-4">
                                  <path
                                  d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
                                  </path>
                                  </svg>
                                  </span>
                            </button>
                            <button
                                        className={`relative h-10 max-h-[20px] w-10 max-w-[20px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${storedrole == "subadmin" ? hasAllRights == "yes" ? "" : "cursor-not-allowed" : ""}`}
                                        type="button"
                                        // disabled={storedrole == "subadmin" ? hasAllRights == "yes" ? "" : "true" : ""}
                                        // onClick={() => {
                                          onClick={()=> {handlePerformAction(id,"DeleteAction")}}
                                        // }}
                                    >
                                        <span className="absolute transhtmlForm -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                        <svg
                                            id="Layer_1"
                                            className="w-4 h-4"
                                            data-name="Layer 1"
                                            fill="white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 110.61 122.88"
                                        >
                                            <title>trash</title>
                                            <path d="M39.27,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Zm63.6-19.86L98,103a22.29,22.29,0,0,1-6.33,14.1,19.41,19.41,0,0,1-13.88,5.78h-45a19.4,19.4,0,0,1-13.86-5.78l0,0A22.31,22.31,0,0,1,12.59,103L7.74,38.78H0V25c0-3.32,1.63-4.58,4.84-4.58H27.58V10.79A10.82,10.82,0,0,1,38.37,0H72.24A10.82,10.82,0,0,1,83,10.79v9.62h23.35a6.19,6.19,0,0,1,1,.06A3.86,3.86,0,0,1,110.59,24c0,.2,0,.38,0,.57V38.78Zm-9.5.17H17.24L22,102.3a12.82,12.82,0,0,0,3.57,8.1l0,0a10,10,0,0,0,7.19,3h45a10.06,10.06,0,0,0,7.19-3,12.8,12.8,0,0,0,3.59-8.1L93.37,39ZM71,20.41V12.05H39.64v8.36ZM61.87,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Z" />
                                        </svg>
                                        </span>
                                    </button>
                          </div>
                          </td>
                          </tr>
                                      ))
                                  }
                                  </tbody>
                                  </table>
                                  <div className="ps__rail-x" style={{left: 0, bottom: 0}}>
                                      <div className="ps__thumb-x" tabIndex={0} style={{left: 0, width: 0}} />
                                      </div>
                                      <div className="ps__rail-y" style={{top: 0, right: 0}}>
                                          <div className="ps__thumb-y" tabIndex={0} style={{top: 0, height: 0}} />
                                          </div>
                                          <div className="ps__rail-x" style={{left: 0, bottom: 0}}>
                                              <div className="ps__thumb-x" tabIndex={0} style={{left: 0, width: 0}} />
                                              </div>
                                              <div className="ps__rail-y" style={{top: 0, right: 0}}>
                                                  <div className="ps__thumb-y" tabIndex={0} style={{top: 0, height: 0}} />
                                                  </div>
                                                  </div>
                                                  </div>
        </div>
      </div>
      <CreateUserModel 
        isUserModelOpen={isCreateUserModel}
        modelTitle="Create New User"
        passAuthorizedList={storeAuthorizedData.current}
        onClosed={() => setIsCreateUserModel(false)}
      />
      <Relogin 
            isReloginModelOpen={isReloginModelOpen}
            onReloginModelClosed={() => setIsReloginModelOpen(false)}
        />
      <UpdateUserModel 
        isUserModelOpen={isUpdateUserModel}
        modelTitle="Update User"
        passAuthorizedList={storeAuthorizedData.current}
        fetchSingleUserData={storePartcularUserData.current}
        onClosed={() => setIsUpdateUserModel(false)}
      />
    </>
  )
}

export default UserListing
