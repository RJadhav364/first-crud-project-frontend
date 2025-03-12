import React, { useEffect, useRef, useState } from 'react'
import useAuthStore from '../../../store/AuthStore'
import DashboardCountBox from '../../../components/DashboardCountBox';
import { getSubadminCount, getUserList } from './services/DashboardRelatedApi';
import adminImage from "../../../assets/admin.png"
import userImage from "../../../assets/user.png"

const Dashboard = () => {
  const {storedfirstname,token} = useAuthStore();
  const [subAdminRecordsCount,setSubAdminRecordsCount] = useState({
    subAdminCount: null,
    usersCount: null
  })
  const fetchTotalCountControl = useRef(false);
  const getSubadminTotalCount = async() => {
    const subadminTotalResponse = await getSubadminCount({token,current_page:"only_count"});
    const usersTotalResponse = await getUserList({token,current_page:"only_count"});
    const subadminTotalCount = await subadminTotalResponse.json();
    const UsersTotalCount = await usersTotalResponse.json();
    // console.log(subadminTotalCount)
    setSubAdminRecordsCount({subAdminCount:subadminTotalCount?.total_records,usersCount:UsersTotalCount?.total_records})
  }
  useEffect(()=>{
    if (fetchTotalCountControl.current) return;
    fetchTotalCountControl.current = true;
    getSubadminTotalCount();
  })
  return (
    <div className='w-full h-full text-white'>
      <div className='mx-[20px] py-[20px]'>
        <h1 className='text-xl'>Hi, {storedfirstname}</h1>
        <div className='grid grid-cols-4 gap-[60px] mt-[10px]'>
          <div className='p-4'>
            <DashboardCountBox gradient_color="bg-background-image" totalCount={subAdminRecordsCount.subAdminCount} boxHeading="SubAdmin Count" imgSource={adminImage} />
          </div>
          <div className='p-4'>
            <DashboardCountBox gradient_color="bg-background-image-reverse" totalCount={subAdminRecordsCount.usersCount} boxHeading="Users Count" imgSource={userImage} />
          </div>
          <div className='p-4'>
            <DashboardCountBox gradient_color="bg-background-image" totalCount={subAdminRecordsCount.usersCount} boxHeading="Users Count" imgSource={userImage} />
          </div>
          <div className='p-4'>
            <DashboardCountBox gradient_color="bg-background-image-reverse" totalCount={subAdminRecordsCount.usersCount} boxHeading="Users Count" imgSource={userImage} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
