import React, { useEffect, useState } from 'react'
import Button from './Button'

const ConfirmationBox = ({isOpen,confirmationMessage,confirmBtnText,cancelBtnText,onClose,userEdit,handleConfirmButtonFn,outsideClickAllowed}) => {
    const [modalClass, setModalClass] = useState('opacity-0 scale-90 pointer-events-none');
    useEffect(() => {
        if (isOpen) {
          setModalClass('opacity-100 scale-100 pointer-events-auto'); // Modal is fully visible and interactive
        } else {
          setModalClass('opacity-0 scale-90 pointer-events-none'); // Modal hidden and non-interactive
        }
      }, [isOpen]);
      const handleConfirmButton = () => {
        // switch(true){
        //     case userEdit == "provideAllRights":
        //         handleDefineRights();
        //         break;
        // }
        handleConfirmButtonFn();
      }
  return (
    <>
      {
        isOpen && (
            <>
      <div
        className="z-[102] fixed inset-0 bg-black/10 backdrop-blur-[1px] "
        // onClick={outsideClickAllowed == true && onClose}
        onClick={outsideClickAllowed && typeof onClose === 'function' ? onClose : undefined}

      ></div>
      <div
        className={`z-[102] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto flex flex-col gap-4 p-0 bg-[#212529] rounded-lg shadow-lg  overflow-auto w-[500px] border-[1px] border-solid border-[#ffffff26] transition-all duration-700 ease-in-out ${modalClass}`}
        onClick={(e) => e.stopPropagation()} 
      >
        <div className='h-full w-full'>
            <div className="modal-header p-[1rem] border-b-[1px] border-solid border-[#949ca5]">
            <h1 className="modal-title text-[1.25rem] text-white" id="exampleModalCenterTitle">Modal Title</h1>
            </div>
            <h1 className="text-xl text-black p-[1rem] text-white modal-body border-b-[1px] border-solid border-[#949ca5]">{confirmationMessage}</h1>
          <div className="flex gap-2 p-[1rem] justify-end">
            {/* <button
              id="actionButton"
              className={`flex h-10 items-center justify-center gap-2 px-4 py-2 text-white bg-${userEdit ? 'green-500' : 'blue-500'} border-none rounded-md shadow-md ring-1 ring-${userEdit ? 'green-600' : 'blue-600'}  hover:ring-black/33% active:shadow-[inset_0_0_0_1px_rgb(0_0_0/13%),inset_0_2px_0_rgb(0_0_0/13%)] focus:outline-none focus:ring-2 focus:ring-${userEdit ? 'green-600' : 'blue-600'} ${isDisabled ? 'bg-[#60a5fa] cursor-not-allowed' : ''}`}
              onClick={userEdit === "edit" ? handleEditClick : userEdit === "propEdit" ? PropEdit :userEdit === "propCompEdit" ? PropCompEdit:userEdit === "logout" ?  handleLogout:userEdit === "profile1" ?  handleProfileEdit:userEdit === "password" ?  handlePasswordEdit:userEdit === "add" ?  handleAddClick:userEdit === "empty" ?  onClose:userEdit=== "delete"?handleDeleteClick: userEdit == "new-user-create" ? createNewUser : userEdit == "new-property-m-company" ? createNewUser : userEdit == "new-property-management" ? createNewUser : handleEditDailyReport}
              disabled={isDisabled}
            >
              {actionText || (userEdit === "edit" ? "Edit" : userEdit === "propEdit" ? "Edit Property" :userEdit === "logout" ? "Logout":userEdit === "profile1" ? "Edit Profile":userEdit === "propCompEdit" ? "Edit Company":userEdit === "password" ? "Update Password":userEdit === "add" ? "Add record" :userEdit === "empty" ? "Ok":userEdit=== "delete"?"Delete": userEdit == "new-user-create" ? "Yes" : userEdit == "new-property-m-company" ? "Create" : userEdit == "new-property-management" ? "Create" : "Edit")}
            </button>
            <button
              id="cancelButton"
              className={`flex h-10 items-center justify-center gap-2 px-4 py-2  text-black bg-transparent border-none rounded-md hover:bg-black/5% dark:hover:bg-white/5% focus:outline-none ${isDisabled ? 'cursor-not-allowed' : ''}`}
              onClick={onClose}
              disabled={isDisabled}
            >
              Cancel
            </button> */}
            {/* <button
              id="cancelButton"
              className={`flex h-10 items-center justify-center gap-2 px-4 py-2  text-white bg-[#5c636a] border-none rounded-md hover:bg-black/5% dark:hover:bg-white/5% focus:outline-none `} onClick={onClose}
            >
              {cancelBtnText}
            </button> */}
                <Button classes={`flex h-10 items-center justify-center gap-2 px-4 py-2  text-white bg-[#5c636a] border-none rounded-md hover:bg-black/5% dark:hover:bg-white/5% focus:outline-none `} btn_title={cancelBtnText} onclickFn={onClose} />
            <Button classes={`flex h-10 items-center justify-center gap-2 px-4 py-2 bg-[#0d6efd] text-white border-none rounded-md shadow-md ring-1 hover:ring-black/33% active:shadow-[inset_0_0_0_1px_rgb(0_0_0/13%),inset_0_2px_0_rgb(0_0_0/13%)] focus:outline-none focus:ring-2`} btn_title={confirmBtnText} onclickFn={handleConfirmButton} />
            {/* <button
              id="actionButton"
              className={`flex h-10 items-center justify-center gap-2 px-4 py-2 bg-[#0d6efd] text-white border-none rounded-md shadow-md ring-1 hover:ring-black/33% active:shadow-[inset_0_0_0_1px_rgb(0_0_0/13%),inset_0_2px_0_rgb(0_0_0/13%)] focus:outline-none focus:ring-2`}
            >
              {confirmBtnText}
            </button> */}
          </div>
        </div>
      </div>
    </>
        )
      }
    </>
  )
}

export default ConfirmationBox
