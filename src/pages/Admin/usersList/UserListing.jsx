import React, { useEffect, useState } from 'react'
import { getUserList } from './services/UserRelatedApis';
import useAuthStore from '../../../store/AuthStore';

const UserListing = () => {
  const [userData , setUserData] = useState([]);
  const {token} = useAuthStore();
  const allUserListFn = async() => {
    const result = await getUserList({token});
    const data = await result.json();
    // console.log(await result.json());
    setUserData(data.data)
  }
  useEffect(()=>{
          // if (fetchsubadminList.current) return;
          // fetchsubadminList.current = true;
          // fetchsubadminList.current
          allUserListFn();   
      },[])
  return (
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
                    <th className=' text-left py-[12px] px-[7px]'>First Name</th>
                    <th className=' text-left py-[12px] px-[7px]'>First Name</th>
                    <th className=' text-left py-[12px] px-[7px]'>Email</th>
                    <th className=' text-left py-[12px] px-[7px]'>Role</th>
                    <th className="text-left">Number</th>
                    <th className="text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userData && userData.length > 0 && userData.map(({firstname,role,_id,email,lastname,number})=>(
                      <tr key={_id}>
                        {/* <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px] w-[48px]'><input checked={hasAllRights == "yes"} type="checkbox" name="" id="" onChange={() =>
                        handleCheckboxChange(_id,hasAllRights)
                        } />
                        </td> */}
                        <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>{firstname}</td>
                        <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>{lastname}</td>
                        <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>{email}</td>
                        <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>{role}</td>
                        <td className="border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">{number}</td>
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
  )
}

export default UserListing
