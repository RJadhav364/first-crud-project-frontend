import { Link } from "react-router-dom"
import useAuthStore from "../store/AuthStore"
import avtar_guy from "../assets/guy_avatar_vhop.svg"
import { useRef, useState } from "react"
import ConfirmationBox from "../components/ConfirmationBox"

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', current: false, shortform: "dashboard" },
  { name: 'SubAdmin List', href: '/admin/sub-admin', current: false , shortform: "sub-admin"},
  { name: 'Users List', href: '/admin/users', current: false , shortform: "users"},
  // { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const {storeduser_id} = useAuthStore();
  const authStore = useAuthStore();
  const [isOpen, setIsOpen] = useState({
    profileDropDown: false,
    navbarDropDown: false
  })
  const [isConfirmationModelOpen , setIsConfirmationModelOpen] = useState(false);
  const modalDetails = useRef({
    modalBody: "",
    showConfirmButton: "",
    showCancelButton: "",
    modelTitleCon: "",
  })
  const toggleMenu = () => {
    setIsOpen({profileDropDown: !isOpen.profileDropDown})
  }
  const handleLogoutClicked = () => {
    setIsOpen({profileDropDown: false})
    setIsConfirmationModelOpen(true);
    modalDetails.current.modalBody = "Are you sure you want to logged out???";
     modalDetails.current.showConfirmButton =  true;
     modalDetails.current.showCancelButton =  true;
     modalDetails.current.modelTitleCon =  "Confirmation";
  }
  const loggedOutUser = () => {
    authStore.setAuth({
      isAuthenticated: false,
      storedfirstname: null,
      storedemail: null,
      storedrole: null,
      storeduser_id: null,
      storedhasAllRights: null,
      token: null,
    });
  }
  return (
    <>
      <div className={`bg-gray-800 origin-top transition ease-in-out ${isOpen.navbarDropDown ? " " : ""}`}>
        <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <button className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none ring-2 ring-inset ring-white" onClick={() => setIsOpen({navbarDropDown: !isOpen.navbarDropDown})}>
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <svg viewBox="0 0 100 80" className="w-[20px] h-[17px]" fill="gray" >
                  <rect width="100" height="20"></rect>
                  <rect y="30" width="100" height="20"></rect>
                  <rect y="60" width="100" height="20"></rect>
                </svg>
                {/* <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" /> */}
                {/* <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" /> */}
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.shortform == window.location.href.split("/")[4] ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                {/* <BellIcon aria-hidden="true" className="size-6" /> */}
              </button>

              {/* Profile dropdown */}
              <div as="div" className="relative ml-3">
                <div>
                {/* to={`user-profile/${storeduser_id}`} */}
                  <button onClick={toggleMenu} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src={avtar_guy}
                      className="size-8 rounded-full"
                    />
                    {/* <span className="text-white">Rohan</span> */}
                  </button>
                </div>
                {/* <div as="div" className="relative inline-block text-left"> */}
                      <div
                        transition
                        className={`absolute right-0 z-10 mt-2 w-[135px] origin-top-right divide-y divide-gray-100 rounded-md bg-[#212130] ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in ${isOpen.profileDropDown ? "translate-y-[5px] scale-y-100" : "translate-y-0 scale-y-0"}`}
                      >
                        <div className="py-1">
                          <div>
                            <Link
                              to={`user-profile/${storeduser_id}`}
                              className="flex gap-[.5rem] px-4 py-2 text-sm text-[#b3b3b3] data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-[#17171E] hover:text-[#6a73fa]"
                              onClick={()=>{setIsOpen({profileDropDown: false})}}
                            >
                              <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                              Profile
                            </Link>
                          </div>
                          <div>
                            <a
                              onClick={handleLogoutClicked}
                              className="flex gap-[.5rem] px-4 py-2 text-sm text-[#b3b3b3] data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden hover:bg-[#17171E] hover:text-[#6a73fa] cursor-pointer"
                            >
                              <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-red-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                              Log Out
                            </a>
                          </div>
                        </div>
                      </div>
                {/* </div> */}
    
              </div>
            </div>
          </div>
        </div>

        <div className={`sm:hidden origin-top transform transition ease-in-out ${isOpen.navbarDropDown ? "max-[640px]:block scale-y-100" : "max-[640px]:hidden scale-y-0"}`}>
          <div className={`space-y-1 px-2 pb-3 pt-2 transition-all duration-700 ease-in-out ${isOpen.navbarDropDown ? "scale-y-100" : "scale-y-0"}`}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                as="a"
                to={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.shortform == window.location.href.split("/")[4] ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <ConfirmationBox 
        confirmBtnText="OK"
        cancelBtnText="Cancel"
        isOpen={isConfirmationModelOpen}
        confirmationMessage={modalDetails.current.modalBody}
        confirmButtonVisible={modalDetails.current.showConfirmButton}
        cancelButtonVisible={modalDetails.current.showCancelButton}
        modal_title={modalDetails.current.modelTitleCon}
        handleConfirmButtonFn={loggedOutUser}
        onClose={() => setIsConfirmationModelOpen(false)}
      />
    </>
  )
}
