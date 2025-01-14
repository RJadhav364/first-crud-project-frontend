import React, { useEffect, useRef, useState } from 'react'
import { deleteAuthorizedPerson, getSingleSubadmin, getSubAdminsList } from './services/SubadminApicalls'
import ConfirmationBox from '../../../components/ConfirmationBox';
import useAuthStore from '../../../store/AuthStore';
import Button from '../../../components/Button';
import Relogin from '../../../components/Relogin';
import SubAdminModel from '../../../components/SubAdminModel';
import SubAdminEditModel from '../../../components/SubAdminEditModel';

const SubAdminList = () => {
    const fetchsubadminList = useRef(false); //to control api call of subadmins list
    const [subAdminsData , setSubAdminsData] = useState([]);
    const [isConfirmationModelOpen , setIsConfirmationModelOpen] = useState(false);
    const [isReloginModelOpen , setIsReloginModelOpen] = useState(false);
    const [isCreateEditModel,setIsCreateEditModel] = useState(false);
    const [isUpdateModel,setIsUpdateModel] = useState(false);
    const modalBody = useRef("");
    const adminfetchData = useRef(null);
    const userEdit = useRef("");
    const storedSubadminId = useRef("");
    const {token,storedrole} = useAuthStore();
    const allSubAdminList = async(pageNumber) => {
        const result = await getSubAdminsList({token,current_page:pageNumber});
        const data = await result.json();
        // console.log(data);
        switch(true){
            case result.status == 401:
                console.log("Token has expired");
                setIsReloginModelOpen(true);
                break;
            default:
                setSubAdminsData(data);
        }
    }

    const handleConfirmButtonClick = async() => {
        switch(true){
            case userEdit.current == "provideAllRights":
                alert("confirm button click")
                break;
            case userEdit.current == "deleteSubadmin":
                // alert("Record deleted")
                const deletedApiCall = await deleteAuthorizedPerson({token, id:storedSubadminId.current});
                switch(true){
                    case deletedApiCall.status == 200:
                        setIsConfirmationModelOpen(false);
                        allSubAdminList(1);
                        break;
                    case deletedApiCall.status == 401:
                        setIsReloginModelOpen(true);
                        break;
                }
                break;
            default:
                alert("Remove all rights")
        }
    }

    const handleCheckboxChange = (id,hasAllRights) => {
        // console.log(id);
        switch(true){
            case hasAllRights == "yes":
                modalBody.current = "Are you sure you want to remove rights";
                userEdit.current  = "removeRights"
                setIsConfirmationModelOpen(true);
                break;
            default: 
                modalBody.current = "Are you sure you want to provide all rights";
                userEdit.current  = "provideAllRights"
                setIsConfirmationModelOpen(true);
                break;
        }
        // modalBody.current = "Are you sure you want to provide all rights"
        // setIsConfirmationModelOpen(true);
    }

    const handleOpenModel = async(id,actionTaken) => {
        // alert();
        // console.log(id,actionTaken);
        switch(true){
            case actionTaken == "DeleteAction":
                modalBody.current = "Are you sure you want to delete this subadmin";
                userEdit.current  = "deleteSubadmin"
                storedSubadminId.current = id;
                setIsConfirmationModelOpen(true);
                break;
            case actionTaken == "EditAction":
                const result = await getSingleSubadmin({token,id});
                const data = await result.json();
                adminfetchData.current = data.data;
                setIsUpdateModel(true);
                break;
        }
    }

    useEffect(()=>{
        if (fetchsubadminList.current) return;
        fetchsubadminList.current = true;
        // fetchsubadminList.current
     allSubAdminList(1);   
    },[])
    // const handleDropDownOpen = (_id) => {
    //     setIsDropDownopen((prev) => (prev === _id ? null : _id));
    // }
    const handlePageChange = (gotNumber) => {
        // alert(gotNumber)
        // isCreateEditModel.current = true;
        allSubAdminList(gotNumber); 
    }
  return (
    <>
        <div className="w-full h-full text-white">
            <div className="card bg-[#27293d] m-[30px]">
                <div className="card-header pt-[15px] px-[15px] flex justify-between">
                    <h4 className="card-title mb-[.75rem] text-white font-[100] leading-[1.45em] text-[1.0625rem]">
                    Simple Table
                    </h4>
                    <div className="card-title mb-[.75rem] text-white font-[100] leading-[1.45em] text-[1.0625rem]">
                        {
                            storedrole == "admin" && (
                                <Button
                                    btn_title="Add New User"
                                    classes="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                                    onclickFn={() => setIsCreateEditModel(true)}
                                    // onclickFn={handleOpenToSHow}
                                />
                            )
                        }
                    </div>
                </div>
                <div className="card-body p-[15px]">
                    <div className="table-responsive ps w-full block">
                    <table className="tablesorter table w-full">
                        <thead className="text-primary">
                        <tr>
                            <th className=" text-left py-[12px] px-[7px]"></th>
                            <th className=" text-left py-[12px] px-[7px]">Name</th>
                            <th className=" text-left py-[12px] px-[7px]">Email</th>
                            <th className=" text-left py-[12px] px-[7px]">Role</th>
                            <th className="text-left">Number</th>
                            {
                                storedrole == "admin" && (
                                    <th className="text-left">Action</th>
                                )
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {subAdminsData && subAdminsData.data &&
                            subAdminsData.data.length > 0 &&
                            subAdminsData.data.map(
                            ({ firstname, role, _id, email, hasAllRights, mnumber }) => (
                                <tr key={_id}>
                                <td className="border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px] w-[48px]">
                                    {
                                        role == "subadmin" && storedrole == "admin"  && (
                                            <input
                                                checked={hasAllRights == "yes"}
                                                type="checkbox"
                                                name=""
                                                id=""
                                                onChange={() =>
                                                    handleCheckboxChange(_id, hasAllRights)
                                                }
                                            />
                                        )
                                    }
                                    {/* <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M17.9 2.318A5 5 0 0 1 22.895 7.1l.005.217v10a5 5 0 0 1-4.783 4.995l-.217.005h-10a5 5 0 0 1-4.995-4.783l-.005-.217v-10a5 5 0 0 1 4.783-4.996l.217-.004h10Zm-.5 1.5h-9a4 4 0 0 0-4 4v9a4 4 0 0 0 4 4h9a4 4 0 0 0 4-4v-9a4 4 0 0 0-4-4Z" /></svg> */}
                                </td>
                                <td className="border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">
                                    {firstname}
                                </td>
                                <td className="border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">
                                    {email}
                                </td>
                                <td className="border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">
                                    {role}
                                </td>
                                <td className="border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">
                                    {mnumber}
                                </td>
                                {
                                    storedrole == "admin" && (
                                        <td className="border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">
                                            <div className="relative flex text-left">
                                            <button
                                                className="relative h-10 max-h-[20px] w-10 max-w-[20px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                type="button"
                                                onClick={() => {
                                                handleOpenModel(_id, "EditAction");
                                                }}
                                            >
                                                <span className="absolute transhtmlForm -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                <svg
                                                    xmlns="http:www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="white"
                                                    aria-hidden="true"
                                                    className="w-4 h-4"
                                                >
                                                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                                                </svg>
                                                </span>
                                            </button>
                                            <button
                                                className="relative h-10 max-h-[20px] w-10 max-w-[20px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                type="button"
                                                onClick={() => {
                                                handleOpenModel(_id, "DeleteAction");
                                                }}
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
                                    )
                                }
                                </tr>
                            ),
                            )}
                        </tbody>
                    </table>
                    <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                        <div
                        className="ps__thumb-x"
                        tabIndex={0}
                        style={{ left: 0, width: 0 }}
                        />
                    </div>
                    <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
                        <div
                        className="ps__thumb-y"
                        tabIndex={0}
                        style={{ top: 0, height: 0 }}
                        />
                    </div>
                    <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                        <div
                        className="ps__thumb-x"
                        tabIndex={0}
                        style={{ left: 0, width: 0 }}
                        />
                    </div>
                    <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
                        <div
                        className="ps__thumb-y"
                        tabIndex={0}
                        style={{ top: 0, height: 0 }}
                        />
                    </div>
                    </div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <a
                        href="#"
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                        Previous
                        </a>
                        <a
                        href="#"
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                        Next
                        </a>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{subAdminsData && subAdminsData.current_page}</span> to <span className="font-medium">{subAdminsData && subAdminsData.data && subAdminsData.data.length}</span> of{' '}
                            <span className="font-medium">{subAdminsData && subAdminsData.data && subAdminsData.total_records}</span> results
                        </p>
                        </div>
                        <div>
                        <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm gap-[5px]">
                            {/* <a
                            href="#"
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                            <span className="sr-only">Previous</span> */}
                            {/* <ChevronLeftIcon aria-hidden="true" className="size-5" /> */}
                            <Button btn_title="Previous" classes="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" onclickFn={() => {handlePageChange(subAdminsData.current_page - 1)}} disbaledLogic={subAdminsData.current_page == 1} />
                            
                            {/* </a> */}
                            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                            {Array.from(
                                { length: subAdminsData.total_page },
                                (_, index) => index + 1
                                )
                                .filter(
                                    (pageNumber) =>
                                    // Display only a range of pages(e.g., 2 pages before and 2 pages after the current page)
                                    pageNumber >= Math.max(1, subAdminsData.current_page - 2) &&
                                    pageNumber <=
                                        Math.min(subAdminsData.total_page, subAdminsData.current_page + 2)
                                )
                                .map((pageNumber) => (
                                    // console.log(pageNumber)
                                    <Button
                                    key={pageNumber}
                                    onclickFn={() => handlePageChange(pageNumber)}
                                    // ml={2}
                                    // background={
                                    //     pageNumber === subAdminsData.current_page
                                    //     ? "red"
                                    //     : "gray.300"
                                    // }
                                    // color={
                                    //     pageNumber === subAdminsData.current_page ? "white" : "black"
                                    // }
                                    btn_title={pageNumber}
                                    classes="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 h-full"
                                    />
                            ))}
                            {/* <a
                            href="#"
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                            <span className="sr-only">Next</span> */}
                            <Button classes="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" btn_title="Next" onclickFn={() => {handlePageChange(subAdminsData.current_page + 1)}} disbaledLogic={subAdminsData.total_page == subAdminsData.current_page} />
                            {/* <ChevronRightIcon aria-hidden="true" className="size-5" /> */}
                            {/* </a> */}
                        </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ConfirmationBox
            isOpen={isConfirmationModelOpen}
            confirmationMessage={modalBody.current}
            confirmBtnText="Yes"
            cancelBtnText="Close"
            userEdit={userEdit.current}
            handleConfirmButtonFn={handleConfirmButtonClick}
            onClose={() => setIsConfirmationModelOpen(false)}
        />
        <Relogin 
            isReloginModelOpen={isReloginModelOpen}
            onReloginModelClosed={() => setIsReloginModelOpen(false)}
        />
        <SubAdminModel 
            toOpenModel={isCreateEditModel}
            modelTitle="Create new Authorized Admin"
            onClosed={() => setIsCreateEditModel(false)}
            token={token}
            handleRecallListing={allSubAdminList}
        />
        <SubAdminEditModel 
            toOpenModel={isUpdateModel}
            modelTitle="Update Authorized Admin"
            onClosed={() => setIsUpdateModel(false)}
            token={token}
            handleRecallListing={allSubAdminList}
            userEditData={adminfetchData.current}
        />
    </>
  )
}

export default SubAdminList
