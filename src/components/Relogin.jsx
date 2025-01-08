import React from 'react'
import Button from './Button'
import useAuthStore from '../store/AuthStore';
import { useNavigate } from 'react-router-dom';

const Relogin = ({isReloginModelOpen,onReloginModelClosed}) => {
    const authStore = useAuthStore();
    const navigate = useNavigate();
    const handleLogOut = () => {
        // alert("Logout clicked")
        authStore.setAuth({
            isAuthenticated: false,
            // token: resp.data.accessToken,
            firstname: null,
            email: null,
            role: null,
            user_id: null,
            hasAllRights: null,
            token: null,
        });
        navigate("/");
        onReloginModelClosed();
        // console.log(onReloginModelClosed)
    }
  return (
    <>
      {
        isReloginModelOpen && (
            <>
              <div
                className="z-[102] fixed inset-0 bg-black/10 backdrop-blur-[1px] "
                // onClick={outsideClickAllowed == true && onClose}
                // onClick={outsideClickAllowed && typeof onClose === 'function' ? onClose : undefined}

              >
              </div>
              <div
                className={`z-[102] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto flex flex-col gap-4 p-0 bg-[#212529] rounded-lg shadow-lg  overflow-auto w-[400px] border-[1px] border-solid border-[#ffffff26] transition-all duration-700 ease-in-out`}
                onClick={(e) => e.stopPropagation()} 
              >
                <div className='h-full w-full'>
                    <div className="modal-header p-[1rem] border-b-[1px] border-solid border-[#949ca5]">
                    <h1 className="modal-title text-[1.25rem] text-white" id="exampleModalCenterTitle">Token has Expired</h1>
                    </div>
                    <h1 className="text-xl text-black p-[1rem] text-white modal-body border-b-[1px] border-solid border-[#949ca5]">Need to Relogin</h1>
                  <div className="flex gap-2 p-[1rem] justify-end">
                  <Button classes={`flex h-10 items-center justify-center gap-2 px-4 py-2 bg-[#0d6efd] text-white border-none rounded-md shadow-md ring-1 hover:ring-black/33% active:shadow-[inset_0_0_0_1px_rgb(0_0_0/13%),inset_0_2px_0_rgb(0_0_0/13%)] focus:outline-none focus:ring-2`} btn_title={"Log out"} onclickFn={handleLogOut} />
                  </div>
                </div>
              </div>
            </>
        )
      }
    </>
  )
}

export default Relogin
