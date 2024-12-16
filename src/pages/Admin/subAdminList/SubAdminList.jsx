import React, { useEffect, useRef, useState } from 'react'
import { getSubAdminsList } from './services/SubadminApicalls'

const SubAdminList = () => {
    const fetchsubadminList = useRef(false); //to control api call of subadmins list
    const [subAdminsData , setSubAdminsData] = useState([]);
    const allSubAdminList = async() => {
        const result = await getSubAdminsList();
        const data = await result.json();
        // console.log(await result.json());
        setSubAdminsData(data.data)
    }

    useEffect(()=>{
        if (fetchsubadminList.current) return;
        fetchsubadminList.current = true;
        // fetchsubadminList.current
     allSubAdminList();   
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
                            <th className=' text-left py-[12px] px-[7px]'></th>
                            <th className=' text-left py-[12px] px-[7px]'>Name</th>
                            <th className=' text-left py-[12px] px-[7px]'>Email</th>
                            <th className=' text-left py-[12px] px-[7px]'>Role</th>
                            <th className="text-center  text-left">Number</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    subAdminsData && subAdminsData.length > 0 && subAdminsData.map(({firstname,role,_id,email,hasAllRights,mnumber})=>(
                                    <tr key={_id}>
                                        <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px] w-[48px]'><input type="checkbox" name="" id="" />
                                        <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M17.9 2.318A5 5 0 0 1 22.895 7.1l.005.217v10a5 5 0 0 1-4.783 4.995l-.217.005h-10a5 5 0 0 1-4.995-4.783l-.005-.217v-10a5 5 0 0 1 4.783-4.996l.217-.004h10Zm-.5 1.5h-9a4 4 0 0 0-4 4v9a4 4 0 0 0 4 4h9a4 4 0 0 0 4-4v-9a4 4 0 0 0-4-4Z" /></svg>

                                        </td>
                                        <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>{firstname}</td>
                                        <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>{email}</td>
                                        <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>{role}</td>
                                        <td className="text-center border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">{mnumber}</td>
                                    </tr>
                                    ))
                                }
                                    {/* <tr>
                                        <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>Minerva Hooper</td>
                                        <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>Curaçao</td>
                                        <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>Sinaai-Waas</td>
                                        <td className="text-center border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">$23,789</td>
                                        </tr>
                                        <tr>
                                            <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>Sage Rodriguez</td>
                                            <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>Netherlands</td>
                                            <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>Baileux</td>
                                            <td className="text-center border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">$56,142</td>
                                            </tr>
                                            <tr>
                                                <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>Philip Chaney</td>
                                                <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>Korea, South</td>
                                                <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>Overland Park</td>
                                                <td className="text-center border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">$38,735</td>
                                                </tr>
                                                <tr>
                                                    <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>Doris Greene</td>
                                                    <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>Malawi</td>
                                                    <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>Feldkirchen in Kärnten</td>
                                                    <td className="text-center border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">$63,542</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>Mason Porter</td>
                                                        <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>Chile</td>
                                                        <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>Gloucester</td>
                                                        <td className="text-center border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">$78,615</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>Jon Porter</td>
                                                            <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>Portugal</td>
                                                            <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]'>Gloucester</td>
                                                            <td className="text-center border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">$98,615</td>
                                                            </tr> */}
                                                            </tbody>
                                                            </table>
                                                            <div className="ps__rail-x" style={{left: 0, bottom: 0}}>
                                                                <div className="ps__thumb-x" tabIndex={0} style={{left: 0, width: 0}} /></div>
                                                                <div className="ps__rail-y" style={{top: 0, right: 0}}>
                                                                    <div className="ps__thumb-y" tabIndex={0} style={{top: 0, height: 0}} /></div>
                                                                    <div className="ps__rail-x" style={{left: 0, bottom: 0}}>
                                                                        <div className="ps__thumb-x" tabIndex={0} style={{left: 0, width: 0}} /></div>
                                                                        <div className="ps__rail-y" style={{top: 0, right: 0}}><div className="ps__thumb-y" tabIndex={0} style={{top: 0, height: 0}} />
                                                                        </div>
                                                                        </div>
                                                                        </div>
                                                                        </div>
                                                                        </div>

  )
}

export default SubAdminList
