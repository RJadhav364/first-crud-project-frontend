import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { createNewAuthorizedPerson, getSingleSubadmin, updateAuthorizedPerson } from '../pages/Admin/subAdminList/services/SubadminApicalls'
import ConfirmationBox from './ConfirmationBox';

const SubAdminEditModel = ({toOpenModel,modelTitle,onClosed,token,handleRecallListing,userEditData}) => {
    // console.log(userEditData && userEditData.role.charAt(0).toUpperCase() + userEditData && userEditData.role.slice(1).toLowerCase())
    const createPersonData = useRef({
        firstname: "",
        email: "",
        role: "",
        mnumber: ""
    });
    const modalBody = useRef("");
    const modelTitleCon = useRef("")
    const userEdit = useRef("");
    const storeEditedValues = useRef({});
    const [isConfirmationModelOpen , setIsConfirmationModelOpen] = useState(false);
    const handleUpdatePerson = async() => {
        const emailregx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        switch(true){
            case createPersonData.current.firstname.value == "" || createPersonData.current.email.value == "" || createPersonData.current.role.value == "" || createPersonData.current.mnumber.value == "":
                alert("All fields are required");
                break;
            case !emailregx.test(createPersonData.current.email.value):
                alert("Enter valid email");
                break;
            default:
                let formData = {
                    firstname: createPersonData.current.firstname.value,
                    email: createPersonData.current.email.value,
                    role: createPersonData.current.role.value,
                    mnumber: createPersonData.current.mnumber.value,
                }
                // console.log(formData)
                const editedFields = Object.keys(formData).filter(
                    (key) => formData[key] !== userEditData[key]
                );
                console.log(editedFields)
                const editedValues = {};
                editedFields.forEach((field) => {
                  editedValues[field] = formData[field];
                });  
                // console.log(editedValues)  
                switch(true){
                    case Object.keys(editedValues).length == 0:
                        modalBody.current = "Not made any changes";
                        userEdit.current  = "notMadeAnyChanges"
                        modelTitleCon.current = "Oops..."
                        setIsConfirmationModelOpen(true);
                        break;
                    default:
                        modalBody.current = "Are you sure you want to update this record";
                        userEdit.current = "updateSubAdmin"
                        modelTitleCon.current = "Confirmation";
                        storeEditedValues.current = editedValues
                        setIsConfirmationModelOpen(true);
                        // const createAuthorizedPerson = await updateAuthorizedPerson({body:editedValues,token:token,id:userEditData.id});
                        // const data = await createAuthorizedPerson.json();
                        // switch(true){
                        //     case createAuthorizedPerson.status == 200:
                        //         onClosed();
                        //         handleRecallListing();
                        //         break;
                        //     case createAuthorizedPerson.status == 409:
                        //         modalBody.current = "Email ID Already exist";
                        //         // userEdit.current  = "deleteSubadmin"
                        //         setIsConfirmationModelOpen(true);
                        // }
                }         
        }
    }
    const handleFinalAction = async() =>{
        const modifyAuthorizedPerson = await updateAuthorizedPerson({body:storeEditedValues.current,token:token,id:userEditData.id});
        const data = await modifyAuthorizedPerson.json();
        switch(true){
            case modifyAuthorizedPerson.status == 200:
                setIsConfirmationModelOpen(false);
                onClosed();
                handleRecallListing();
                break;
            case modifyAuthorizedPerson.status == 409:
                modalBody.current = "Email ID Already exist";
                // userEdit.current  = "deleteSubadmin"
                setIsConfirmationModelOpen(true);
        }
    }
  return (
    <>
        <>
            <div className={`z-[102] fixed inset-0 bg-black/10 backdrop-blur-[1px] ${toOpenModel ? "block" : "hidden"}`} onClick={onClosed}>
            </div>
            <div
                className={`z-[102] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto flex flex-col gap-4 p-0 bg-[#212529] rounded-lg shadow-lg  overflow-auto w-[800px] border-[1px] border-solid border-[#ffffff26] transition-all duration-700 ease-in-out ${toOpenModel ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"}`}
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
                                            defaultValue={userEditData && userEditData.firstname}
                                            ref={(e)=>{createPersonData.current.firstname = e}}
                                            className="text-white block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground" />
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
                                            defaultValue={userEditData && userEditData.email}
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
                                            defaultValue={userEditData && userEditData.role}
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
                                                className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Number</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="text" name="mnumber"
                                            defaultValue={userEditData && userEditData.mnumber}
                                            ref={(e)=>{createPersonData.current.mnumber = e}}
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
                        <Button classes={`font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2`} btn_title={"Update"} onclickFn={handleUpdatePerson} />
                  </div>
                </div>
            </div>
        </>
        <ConfirmationBox 
            isOpen={isConfirmationModelOpen}
            confirmationMessage={modalBody.current}
            confirmBtnText="OK"
            userEdit={userEdit.current}
            modal_title={modelTitleCon.current}
            handleConfirmButtonFn={handleFinalAction}
            onClose={() => setIsConfirmationModelOpen(false)}
        />
    </>
  )
}

export default SubAdminEditModel
