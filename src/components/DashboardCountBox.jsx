import React from 'react'

const DashboardCountBox = ({gradient_color,totalCount,boxHeading,imgSource}) => {
    // console.log(gradient_color)
  return (
    <div className={`cardano p-[20px] before:animate-spinGradient after:animate-spinGradient my-0 mx-auto padding-[2em] w-full bg-[#1c1f2b] rounded-[10px] relative after:contents-['*'] before:contents-['*'] after:absolute before:absolute after:h-full before:h-full after:w-full before:w-full after:top-2/4 after:left-2/4 before:top-2/4 before:left-2/4 after:translate-x-[-50%] after:translate-y-[-50%]  before:translate-x-[-50%] before:translate-y-[-50%] after:z-[-1]  before:z-[-1] after:p-[3px] before:p-[3px] after:rounded-[10px] before:rounded-[10px] before:opacity-[0.5] after:blur-[1.5rem] before:blur-[0] ${gradient_color == "bg-background-image" ? "before:bg-background-image after:bg-background-image" : "before:bg-background-image-reverse after:bg-background-image-reverse"}`}>
        {/* before:blur-[0] after:${gradient_color} before:${gradient_color}`}> */}
        <div className='grid grid-cols-2 mb-[10px] items-center'>
            <div className='text-[24px] text-nowrap'>
                {boxHeading}
            </div>
            <div>
                <p className='flex justify-end'>
                    <img src={imgSource} alt={imgSource} className='bg-[#600d6091] rounded-[10px] p-[10px] w-[50px]' />

                </p>
            </div>
        </div>
                <p className='text-[50px] font-bold'>
                    {totalCount}
                </p>
    </div>
  )
}

export default DashboardCountBox
