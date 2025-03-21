import React, { useEffect, useRef, useState } from 'react'
import useAuthStore from '../../../store/AuthStore'
import DashboardCountBox from '../../../components/DashboardCountBox';
import { getSubadminCount, getUserList } from './services/DashboardRelatedApi';
import adminImage from "../../../assets/admin.png"
import userImage from "../../../assets/user.png"
import ListingLoader from '../../../components/ListingLoader';
import Relogin from '../../../components/Relogin';

const Dashboard = () => {
  const {storedfirstname,token} = useAuthStore();
  const [subAdminRecordsCount,setSubAdminRecordsCount] = useState({
    subAdminCount: null,
    usersCount: null,
    inActiveUsers: null,
    userData: null
  })
  const [isLoading,setIsLoading] = useState(false);
  const [isReloginModelOpen,setIsReloginModelOpen] = useState(false);
  const fetchTotalCountControl = useRef(false);
  const getSubadminTotalCount = async() => {
    try{
      setIsLoading(true);
      const subadminTotalResponse = await getSubadminCount({token,current_page:"only_count"});
      const usersTotalResponse = await getUserList({token,current_page:"only_count"});
      switch(true){
        case subadminTotalResponse.status == 401 || usersTotalResponse.status == 401:
          throw (401);
          break;
      }
      const subadminTotalCount = await subadminTotalResponse.json();
      const UsersTotalCount = await usersTotalResponse.json();
      // console.log(subadminTotalCount)
      setSubAdminRecordsCount(
        {subAdminCount:subadminTotalCount?.total_records,usersCount:UsersTotalCount?.totalUsersCount,
        inActiveUsers: UsersTotalCount?.inactiveUsers,
        assignedUserCount: UsersTotalCount?.assignedUserCount,
        userData: UsersTotalCount?.data
        }
      )
    } catch(err){
      console.log(err)
      switch(true){
        case err == 401:
          setIsReloginModelOpen(true);
          break;
      }
    } finally{
      setIsLoading(false);
    }
  }
  useEffect(()=>{
    if (fetchTotalCountControl.current) return;
    fetchTotalCountControl.current = true;
    getSubadminTotalCount();
  })
  return (
    <>
      <div className='w-full h-full text-white'>
        <div className='mx-[20px] py-[20px]'>
          <h1 className='text-xl'>Welcome, {storedfirstname}</h1>
          <div className='grid grid-cols-4 gap-[60px] mt-[10px]'>
            <div className='p-4'>
              <DashboardCountBox gradient_color="bg-background-image" totalCount={subAdminRecordsCount.subAdminCount} boxHeading="SubAdmin Count" imgSource={adminImage} loadingState={isLoading} />
            </div>
            <div className='p-4'>
              <DashboardCountBox gradient_color="bg-background-image-reverse" totalCount={subAdminRecordsCount.usersCount} boxHeading="Total Users" imgSource={userImage} loadingState={isLoading} />
            </div>
            <div className='p-4'>
              <DashboardCountBox gradient_color="bg-background-image" totalCount={subAdminRecordsCount.inActiveUsers} boxHeading="Inactive Users" imgSource={userImage} loadingState={isLoading} />
            </div>
            <div className='p-4'>
              <DashboardCountBox gradient_color="bg-background-image-reverse" totalCount={subAdminRecordsCount.assignedUserCount} boxHeading="Users Assigned" imgSource={userImage} loadingState={isLoading} />
            </div>
          </div>
          <div className="card bg-[#27293d] my-[30px] mx-[17px]">
            <div className="card-body p-[15px] rounded-[10px]">
              <div className="table-responsive ps w-full block">
                {isLoading ? <ListingLoader outerDivClass="w-full h-full flex justify-center items-center py-[50px]" insidedivClass="w-[100px] h-[100px]" /> : 
                <table className="tablesorter table w-full">
                  <thead className="text-primary">
                    <tr>
                      <th className=" text-left py-[12px] px-[7px]">First Name</th>
                      <th className=" text-left py-[12px] px-[7px]">Last Name</th>
                      <th className=" text-left py-[12px] px-[7px]">Email</th>
                      <th className=" text-left py-[12px] px-[7px]">Role</th>
                      <th className=" text-left py-[12px] px-[7px]">Assigned To</th>
                      <th className="text-left">Number</th>
                      <th className="text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subAdminRecordsCount.userData &&
                      subAdminRecordsCount.userData &&
                      subAdminRecordsCount.userData.length > 0 &&
                      subAdminRecordsCount.userData.map(
                        ({
                          firstname,
                          role,
                          id,
                          email,
                          lastname,
                          number,
                          authorizedDetails,
                          status,
                        }) => (
                          <tr key={id}>
                            {/* <td className='border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px] w-[48px]'><input checked={hasAllRights == "yes"} type="checkbox" name="" id="" onChange={() =>
                                          handleCheckboxChange(_id,hasAllRights)
                                          } />
                                          </td> */}
                            <td className="border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">
                              {firstname}
                            </td>
                            <td className="border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">
                              {lastname}
                            </td>
                            <td className="border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">
                              {email}
                            </td>
                            <td className="border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">
                              {role}
                            </td>
                            <td className="border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">
                              {(authorizedDetails && authorizedDetails.firstname) || "NA"}
                            </td>
                            <td className="border-t-[.0625rem] border-solid border-[#ffffff1a] py-[12px] px-[7px]">
                              {number}
                            </td>
                            {/* <td className="border-t-[.0625rem] border-solid border-[#ffffff1a]"><span className='text-[#e42855] bg-[#4e3b40] border border-transparent border-[#e4285533] flex justify-center items-center leading-[1] rounded-[.25rem] p-[.5rem] font-[500] text-sm tracking-[0.5px]'>{status}</span></td> */}
                            <td className="border-t-[.0625rem] border-solid border-[#ffffff1a]">
                              <span
                                className={`${
                                  status == "Active" ? "text-[#00a261]" : "text-[#e42855]"
                                } ${
                                  status == "Active" ? "bg-[#194633]" : "bg-[#4e3b40]"
                                } border border-transparent border-[#e4285533] leading-[1] rounded-[.25rem] py-[2px] px-[3px] font-[500] text-sm tracking-[0.5px]`}
                              >
                                {status}
                              </span>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
                }
                <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                  <div className="ps__thumb-x" tabIndex={0} style={{ left: 0, width: 0 }} />
                </div>
                <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
                  <div className="ps__thumb-y" tabIndex={0} style={{ top: 0, height: 0 }} />
                </div>
                <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                  <div className="ps__thumb-x" tabIndex={0} style={{ left: 0, width: 0 }} />
                </div>
                <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
                  <div className="ps__thumb-y" tabIndex={0} style={{ top: 0, height: 0 }} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Relogin 
      isReloginModelOpen={isReloginModelOpen}
      onReloginModelClosed={() => setIsReloginModelOpen(false)}
      />
    </>
  )
}

export default Dashboard
