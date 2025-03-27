import avtar_guy from "../../../assets/undraw_pic-profile_nr49.svg"

const UserEdit = () => {
  return (
    <div className='p-10'>
      <h2 className="text-2xl text-[#cbf5e3]">My Profile</h2>
      <div className='bg-[#27293D] card-box border-20 pt-[45px] px-[60px] pb-[50px] mt-[15px] rounded-[20px]'>
        <div className='user-avatar-setting d-flex align-items-center mb-[15px]'>
          <img src={avtar_guy} className="w-[100px] h-[100px] bg-[#E5E6E8] rounded-[50%]" alt="" />
        </div>
        <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 gap-[30px]">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="" className="block text-[20px] text-[#f0fff9] mb-[10px]">Name*</label>
            <input type="text" className="w-full h-[55px] tracking-[-0.16px] rounded-[7px] px-[20px] border-[#e5e5e5]" placeholder="Name" />
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="" className="block text-[20px] text-[#f0fff9] mb-[10px]">Email*</label>
            <input type="text" className="w-full h-[55px] tracking-[-0.16px] rounded-[7px] px-[20px] border-[#e5e5e5]" placeholder="Email" />
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="" className="block text-[20px] text-[#f0fff9] mb-[10px]">Number*</label>
            <input type="text" className="w-full h-[55px] tracking-[-0.16px] rounded-[7px] px-[20px] border-[#e5e5e5]" placeholder="Number" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserEdit
