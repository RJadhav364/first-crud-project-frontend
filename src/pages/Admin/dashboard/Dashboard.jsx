import React from 'react'
import useAuthStore from '../../../store/AuthStore'

const Dashboard = () => {
  const {storedfirstname} = useAuthStore();
  return (
    <div className='w-full h-full text-white'>
      <div className='mx-[20px] py-[20px]'>
        <h1 className='text-xl'>Hi, {storedfirstname}</h1>
        <div className='grid grid-cols-2 gap-[60px] mt-[10px]'>
          <div className='p-4'><div className="cardano p-[20px] before:animate-spinGradient after:animate-spinGradient my-0 mx-auto padding-[2em] w-full bg-[#1c1f2b] text-center rounded-[10px] relative after:contents-['*'] before:contents-['*'] after:absolute before:absolute after:h-full before:h-full after:w-full before:w-full after:top-2/4 after:left-2/4 before:top-2/4 before:left-2/4 after:translate-x-[-50%] after:translate-y-[-50%]  before:translate-x-[-50%] before:translate-y-[-50%] after:z-[-1]  before:z-[-1] after:p-[3px] before:p-[3px] after:rounded-[10px] before:rounded-[10px] before:opacity-[0.5] after:blur-[1.5rem] before:blur-[1.5rem] after:bg-background-image before:bg-background-image">
            <h1 className='text-white'>Animate Borders</h1>
            <p className='text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque ad exercitationem voluptatem ullam et, natus impedit quae veniam optio a doloremque officiis beatae, itaque nesciunt nostrum quasi molestiae laudantium dolor asperiores soluta sint sed ratione cupiditate. Laudantium earum reiciendis enim.</p>
        </div></div>
          <div className='p-4'><div className="cardano p-[20px] before:animate-spinGradient after:animate-spinGradient my-0 mx-auto padding-[2em] w-full bg-[#1c1f2b] text-center rounded-[10px] relative after:contents-['*'] before:contents-['*'] after:absolute before:absolute after:h-full before:h-full after:w-full before:w-full after:top-2/4 after:left-2/4 before:top-2/4 before:left-2/4 after:translate-x-[-50%] after:translate-y-[-50%]  before:translate-x-[-50%] before:translate-y-[-50%] after:z-[-1]  before:z-[-1] after:p-[3px] before:p-[3px] after:rounded-[10px] before:rounded-[10px] before:opacity-[0.5] after:blur-[1.5rem] before:blur-[1.5rem] after:bg-background-image before:bg-background-image">
            <h1 className='text-white'>Animate Borders</h1>
            <p className='text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque ad exercitationem voluptatem ullam et, natus impedit quae veniam optio a doloremque officiis beatae, itaque nesciunt nostrum quasi molestiae laudantium dolor asperiores soluta sint sed ratione cupiditate. Laudantium earum reiciendis enim.</p>
        </div></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
