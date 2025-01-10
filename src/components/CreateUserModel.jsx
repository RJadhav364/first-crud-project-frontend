import React, { useRef } from 'react'
import ConfirmationBox from './ConfirmationBox'
import Button from './Button'
import useAuthStore from '../store/AuthStore'
import { emailregx } from '../validation/InputValidation'
import { createNewUser } from '../pages/Admin/usersList/services/UserRelatedApis'

const CreateUserModel = ({isUserModelOpen,modelTitle,onClosed,passAuthorizedList}) => {
    const {token} = useAuthStore();
    const createPersonData = useRef({
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        password: "",
        number: "",
        handledSubAdmin: ""
    });
    const handleCreateUser = async() => {
        console.log(createPersonData.current.firstname.value)
        let formValues = {};
        switch(true){
            case createPersonData.current.firstname.value == "" || createPersonData.current.lastname.value == "" || createPersonData.current.email.value == "" || createPersonData.current.role.value == "" || createPersonData.current.password.value == ""|| createPersonData.current.number.value == "" || createPersonData.current.handledSubAdmin.value == "":
                alert("All fields are required");
                break;
            case !emailregx.test(createPersonData.current.email.value):
                alert("Enter valid email");
                break;
            default:
                for(let key in createPersonData.current){
                    console.log(key)
                    // createPersonData.current[key] = createPersonData.current[key].value
                    formValues[key] = createPersonData.current[key].value;
                }
                const getCreatedUserResult = await createNewUser({body: formValues, token: token});
        }
    }
  return (
    <>
      <>
            <div className={`z-[102] fixed inset-0 bg-black/10 backdrop-blur-[1px] ${isUserModelOpen ? "block" : "hidden"}`} onClick={onClosed}>
            </div>
            <div
                className={`z-[102] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto flex flex-col gap-4 p-0 bg-[#212529] rounded-lg shadow-lg  overflow-auto w-[800px] border-[1px] border-solid border-[#ffffff26] transition-all duration-700 ease-in-out ${isUserModelOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"}`}
                onClick={(e) => e.stopPropagation()} 
              >
                <div className='h-full w-full'>
                    <div className="modal-header p-[1rem] border-b-[1px] border-solid border-[#949ca5]">
                    <h1 className="modal-title text-[1.25rem] text-white" id="exampleModalCenterTitle">{modelTitle}</h1>
                    </div>
                    <div className="relative mt-12 w-full sm:mt-[15px]">
            <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
                <div
                    className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
                    <div className="flex flex-col p-[13px]">
                        {/* <h3 className="text-xl font-semibold leading-6 tracking-tighter text-white">Login</h3> */}
                    </div>
                    <div className="p-6 pt-0">
                        <form className='grid grid-cols-2 gap-[8px]'>
                            <div>
                                <div>
                                    <div
                                        className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                        <div className="flex justify-between">
                                            <label
                                                className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">First Name</label>
                                            <div className="absolute right-3 translate-y-2 text-green-200">
                                                    </div>
                                        </div>
                                        <input type="text" name="firstname" placeholder="Username"
                                            autoComplete="off"
                                            // value={createPersonData.current.firstname} 
                                            // onChange={(e)=>{createPersonData.current.firstname = e}}
                                            ref={(e)=>{createPersonData.current.firstname = e}}
                                            className="text-white block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div
                                        className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                        <div className="flex justify-between">
                                            <label
                                                className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Last Name</label>
                                            <div className="absolute right-3 translate-y-2 text-green-200">
                                                    </div>
                                        </div>
                                        <input type="text" name="lastname" placeholder="LastName"
                                            autoComplete="off"
                                            // value={createPersonData.current.firstname} 
                                            // onChange={(e)=>{createPersonData.current.firstname = e}}
                                            ref={(e)=>{createPersonData.current.lastname = e}}
                                            className="text-white block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div
                                        className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                        <div className="flex justify-between">
                                            <label
                                                className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Select Subadmin</label>
                                            <div className="absolute right-3 translate-y-2 text-green-200">
                                                    </div>
                                        </div>
                                        {/* <input type="text" name="lastname" placeholder="LastName"
                                            autoComplete="off"
                                            // value={createPersonData.current.firstname} 
                                            // onChange={(e)=>{createPersonData.current.firstname = e}}
                                            // ref={(e)=>{createPersonData.current.firstname = e}}
                                            className="text-white block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground" /> */}
                                        <select name="handledSubAdmin" id="handledSubAdmin" className="text-white block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground mt-[7px]" ref={(e)=>{createPersonData.current.handledSubAdmin = e}}>
                                        <option value="" selected disabled>Select Authorized Person</option>
                                        {
                                            passAuthorizedList && passAuthorizedList.length > 0 && passAuthorizedList.map(({_id,firstname})=>(
                                                <option className='text-black' key={_id} value={_id}>{firstname}</option>
                                            ))
                                        }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div>
                                    <div
                                        className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                        <div className="flex justify-between">
                                            <label
                                                className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Email</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="email" name="email"
                                            // onChange={(e)=>{handleInputChange("email",e.target.value)}}
                                            ref={(e)=>{createPersonData.current.email = e}}
                                            placeholder="Email"
                                                className="text-white block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div>
                                    <div
                                        className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                        <div className="flex justify-between">
                                            <label
                                                className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Role</label>
                                        </div>
                                        <div className="flex items-center">
                                        <input type="role" name="role"
                                            ref={(e)=>{createPersonData.current.role = e}}
                                            value="User"
                                            // defaultValue={userEditData && userEditData.role}
                                            placeholder="Role"
                                                className="text-white block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground" disabled />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div>
                                    <div
                                        className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                        <div className="flex justify-between">
                                            <label
                                                className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Password</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="password" name="password"
                                            // onChange={(e)=>{handleInputChange("password",e.target.value)}}
                                            ref={(e)=>{createPersonData.current.password = e}}
                                            placeholder="Password"
                                                className="text-white block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div>
                                    <div
                                        className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                        <div className="flex justify-between">
                                            <label
                                                className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Number</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="text" name="mnumber"
                                            // onChange={(e)=>{handleInputChange("mnumber",e.target.value)}}
                                            ref={(e)=>{createPersonData.current.number = e}}
                                            placeholder="Number"
                                                className="text-white block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
                  <div className="flex gap-2 p-[1rem] justify-end">
                        <Button classes={`font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2`} btn_title={"Create"} 
                        onclickFn={handleCreateUser} 
                        />
                  </div>
                </div>
            </div>
        </>
        {/* <ConfirmationBox 
            isOpen={isConfirmationModelOpen}
            confirmationMessage={modalBody.current}
            confirmBtnText="OK"
            modal_title="Oops..."
            handleConfirmButtonFn={() => setIsConfirmationModelOpen(false)}
        /> */}
    </>
  )
}

export default CreateUserModel
