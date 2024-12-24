import React, { useEffect, useRef, useState } from 'react'
import { getSubAdminsList } from './services/SubadminApicalls'
import ConfirmationBox from '../../../components/ConfirmationBox';
import useAuthStore from '../../../store/AuthStore';

const SubAdminList = () => {
    const fetchsubadminList = useRef(false); //to control api call of subadmins list
    const [subAdminsData , setSubAdminsData] = useState([]);
    const [isConfirmationModelOpen , setIsConfirmationModelOpen] = useState(false);
    const [isDropDownopen , setIsDropDownopen] = useState(false);
    const modalBody = useRef("");
    const userEdit = useRef("");
    const {token} = useAuthStore();
    const isDropDownRef = useRef();
    const allSubAdminList = async() => {
        const result = await getSubAdminsList({token});
        const data = await result.json();
        // console.log(await result.json());
        setSubAdminsData(data.data)
    }

    const handleConfirmButtonClick = () => {
        switch(true){
            case userEdit.current == "provideAllRights":
                alert("confirm button click")
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

    useEffect(()=>{
        if (fetchsubadminList.current) return;
        fetchsubadminList.current = true;
        // fetchsubadminList.current
     allSubAdminList();   
    },[])
    const handleDropDownOpen = (_id) => {
        setIsDropDownopen((prev) => (prev === _id ? null : _id));
    }
  return (
    <>
    <div className="w-full h-full text-white">
  <div className="card bg-[#27293d] m-[30px]">
    <div className="card-header pt-[15px] px-[15px]">
        <h4 className="card-title mb-[.75rem] text-white font-[100] leading-[1.45em] text-[1.0625rem]">Simple Table</h4>
        </div>
        <div className="card-body p-[15px]">
            <div className="table-responsive ps w-full block">
                <table className="tablesorter table w-full">
                    <thead className="text-primary">
                        <tr>
                            <th className=' text-left py-[12px] px-[7px]'></th>
                            <th className=' text-left py-[12px] px-[7px]'>Name</th>
                            <th className=' text-left py-[12px] px-[7px]'>Email</th>
                            <th className=' text-left py-[12px] px-[7px]'>Role</th>
                            <th className="text-left">Number</th>
                            <th className="text-left">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    subAdminsData && subAdminsData.length > 0 && subAdminsData.map(({firstname,role,_id,email,hasAllRights,mnumber})=>(
                                    <tr key={_id}>
                                        <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px] w-[48px]'><input checked={hasAllRights == "yes"} type="checkbox" name="" id="" onChange={() =>
                                        handleCheckboxChange(_id,hasAllRights)
                                      } />
                                        {/* <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M17.9 2.318A5 5 0 0 1 22.895 7.1l.005.217v10a5 5 0 0 1-4.783 4.995l-.217.005h-10a5 5 0 0 1-4.995-4.783l-.005-.217v-10a5 5 0 0 1 4.783-4.996l.217-.004h10Zm-.5 1.5h-9a4 4 0 0 0-4 4v9a4 4 0 0 0 4 4h9a4 4 0 0 0 4-4v-9a4 4 0 0 0-4-4Z" /></svg> */}

                                        </td>
                                        <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>{firstname}</td>
                                        <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>{email}</td>
                                        <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>{role}</td>
                                        <td className="border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">{mnumber}</td>
                                        <td className="border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">
                                        <div className="relative inline-block text-left">
                                        <button
                                            className="relative h-10 max-h-[20px] w-10 max-w-[20px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="button" 
                                            // onClick={()=> {handleOpenEditModel(_id)}}
                                            >
                                            <span className="absolute transhtmlForm -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                <svg xmlns="http:www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                                className="w-4 h-4">
                                                <path
                                                    d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
                                                </path>
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
    <ConfirmationBox
    isOpen={isConfirmationModelOpen}
    confirmationMessage={modalBody.current}
    confirmBtnText="Yes"
    cancelBtnText="Close"
    userEdit={userEdit.current}
    handleConfirmButtonFn={handleConfirmButtonClick}
    onClose={() => setIsConfirmationModelOpen(false)}
    />                                                   
    </>
  )
}

export default SubAdminList
