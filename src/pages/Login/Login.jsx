import { useEffect, useRef, useState } from "react"
import Button from "../../components/Button"
import { handleGetUserTosendLink, loginUser } from "./services/loginApi";
import {Link, useNavigate} from "react-router-dom"
import useAuthStore from "../../store/AuthStore";
import ConfirmationBox from "../../components/ConfirmationBox";
import { toast } from "react-toastify";
import cancelmark from "../../assets/cancelmark.png"
import { emailregx } from "../../validation/InputValidation";

// import "../index.css"
const Login = () => {
    const [isConfirmationModelOpen , setIsConfirmationModelOpen] = useState(false);
    const [isForgetPasswrodModelOpen , setIsForgetPasswrodModelOpen] = useState(undefined);
    const modalBody = useRef("");
    const showConfirmButton = useRef(false);
    const showCancelButton = useRef(false);
    const userCredentials = useRef({
        email: "",
        password: ""
    });
    const handleInputChange = (fieldName, value) => {
        userCredentials.current[fieldName] = value
    }
    const authStore = useAuthStore();
    const navigate = useNavigate();
    useEffect(() => {
        if (authStore.isAuthenticated) {
            navigate('/admin/dashboard');
        }
    }, [authStore])
    const handleSubmitLoginForm = async() => {
        // alert("btn clicked");
        switch(true){
            case userCredentials.current.email == "" && userCredentials.current.password == "":
                alert("Both fields are required");
                break;
            case userCredentials.current.email == "":
                alert("Email is required");
                break;
            case userCredentials.current.password == "":
                alert("password is required");
                break;
            default:
                const getResponse = await loginUser(userCredentials.current);
                const data = await getResponse.json();
                // console.log(data.data);
                switch(true){
                    case getResponse.status == 200:
                        authStore.setAuth({
                            isAuthenticated: true,
                            // token: resp.data.accessToken,
                            storedfirstname: data.data.firstname,
                            storedemail: data.data.email,
                            storedrole: data.data.role,
                            storeduser_id: data.data.id,
                            storedhasAllRights: data.data.hasAllRights,
                            token: data.data.token,
                        });
                        toast.success("Logged In!",{
                            position: "top-center",
                            theme: "dark"
                        })
                        navigate("/admin/dashboard");
                        break;
                    case getResponse.status == 404:
                        setIsConfirmationModelOpen(true);
                        modalBody.current = "EmailId not found";
                        showConfirmButton.current = true;
                        showCancelButton.current = false;
                        break;
                    case getResponse.status == 401:
                        setIsConfirmationModelOpen(true);
                        modalBody.current = "Password not match";
                        showConfirmButton.current = true;
                        showCancelButton.current = false;
                        break;
                    default:
                        setIsConfirmationModelOpen(true);
                        showConfirmButton.current = true;
                        showCancelButton.current = false;
                        modalBody.current = "Something went wrong";
                }
        }
    }
    const handleSendLink = async() => {
        // console.log(userCredentials.current.email);
        !emailregx.test(userCredentials.current.email);
        switch(true){
            case !emailregx.test(userCredentials.current.email):
                alert("Enter valid email");
                break;
            default:
                const getPasswordresetLinkRes = await handleGetUserTosendLink(userCredentials.current.email);
                // console.log(getPasswordresetLinkRes)
                switch(true){
                    case getPasswordresetLinkRes.status == 200:
                        toast.success("Link send sucessfully",{
                            theme: "dark",
                            position: "top-center"
                        });
                        break;
                    case getPasswordresetLinkRes.status == 404:
                        setIsConfirmationModelOpen(true);
                        modalBody.current = "EmailId not found";
                        showConfirmButton.current = true;
                        showCancelButton.current = false;
                        break;
                    default:
                        setIsConfirmationModelOpen(true);
                        modalBody.current = "Error occured! Please again later";
                        showConfirmButton.current = true;
                        showCancelButton.current = false;
                }
        }
    }
  return (
    // <!-- component -->
    <>
     <div className="bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
        <a href="#">
            <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
                    </svg>
                </div>
                Ardiansyah Putra
            </div>
        </a>
        <div className="relative mt-12 w-full max-w-lg sm:mt-10">
            <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
            <div
                className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
                <div className="flex flex-col p-6">
                    <h3 className="text-xl font-semibold leading-6 tracking-tighter">Login</h3>
                    <p className="mt-1.5 text-sm font-medium text-white/50">Welcome back, enter your credentials to continue.
                    </p>
                </div>
                <div className="p-6 pt-0">
                    <form>
                        <div>
                            <div>
                                <div
                                    className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                    <div className="flex justify-between">
                                        <label
                                            className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Username</label>
                                        <div className="absolute right-3 translate-y-2 text-green-200">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                        fill="currentColor" className="w-6 h-6">
                                                        <path fillRule="evenodd"
                                                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                                            clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                    </div>
                                    <input type="text" name="email" placeholder="Username"
                                        autoComplete="off"
                                        onChange={(e)=>{handleInputChange("email",e.target.value)}}
                                        className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div>
                                <div
                                    className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                    <div className="flex justify-between">
                                        <label
                                            className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Password</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="password" name="password"
                                        onChange={(e)=>{handleInputChange("password",e.target.value)}}
                                        placeholder="Password"
                                            className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <p className="flex justify-end mt-[10px]"><span onClick={()=> setIsForgetPasswrodModelOpen(true)} className="text-sm text-[#d9c1c1] hover:text-[#a64bf4] cursor-pointer transition duration-150 hover:underline">Forget Password</span></p>
                        <div className="mt-4 flex items-center justify-end gap-x-2">
                            <Button onclickFn={handleSubmitLoginForm} btn_title="Log in" classes="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2" />
                        </div>
                </div>
            </div>
        </div>
    </div> 
    <ConfirmationBox 
    isOpen={isConfirmationModelOpen}
    confirmBtnText="Ok"
    cancelBtnText="Close"
    confirmationMessage={modalBody.current}
    outsideClickAllowed={false}
    confirmButtonVisible={showConfirmButton.current}
    cancelButtonVisible={showCancelButton.current}
    onClose={() => setIsConfirmationModelOpen(false)}
    handleConfirmButtonFn={() => setIsConfirmationModelOpen(false)}
    />
    {/* forget password code start */}
    <div
        className={`z-[10] fixed inset-0 bg-black/10 backdrop-blur-[10px] transition-all duration-[2s] ease-in-out transform origin-top ${isForgetPasswrodModelOpen ? " scale-y-100" : " scale-y-0"}`}
    >
    </div>
    <div className={`w-[400px] h-[7px] bg-gradient-to-r from-[#5591EA] to-[#AA47F5] fixed inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform origin-bottom transition-all duration-700 ease-in-out z-[20] rounded-sm ${isForgetPasswrodModelOpen == true ? "scale-y-100 animate-revealAndMoveUp" : isForgetPasswrodModelOpen == false ? "animate-closeRevealAndMoveUp scale-y-0" : "scale-y-0"}`}></div>
    {/* <div className={`w-[300px] h-[7px] bg-gradient-to-r from-[#5591EA] to-[#AA47F5] fixed inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform origin-bottom transition-all duration-700 ease-in-out z-[20] ${isForgetPasswrodModelOpen ? "scale-y-100 duration-900" : "scale-y-0"}`}></div> */}
    <div className={`card fixed inset-0 z-[20] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#252323] w-[400px] h-[300px] flex justify-center items-center flex-col border-red-400  origin-top rounded-sm
            ${isForgetPasswrodModelOpen == true ? "scale-y-100 animate-revealAndOpen" : isForgetPasswrodModelOpen == false ? "animate-revealModelClosed scale-y-0" : "scale-y-0" }
        `}>
        <h2 className="text-white text-[1.5rem] uppercase text-center p-[5px_40px_10px_40px]">Forgot Password?</h2>
        <p className="text-white text-[12px]">You can reset your Password here</p>
        <input autoComplete="off" onChange={(e)=>{handleInputChange("email",e.target.value)}} type="email" className="passInput mt-[15px] w-[80%] border-b-[2px] border-solid  border-[deepskyblue] text-[15px] text-white outline-none bg-transparent" placeholder="Email address" />
        <Button btn_title="Send My Password" classes="bg-[deepskyblue] text-white uppercase p-[10px] w-[80%] mt-[15px] w-full" onclickFn={handleSendLink}/>
        {/* <button className=" text-white uppercase p-[10px]  mt-[15px]">Cancel</button> */}
        <div className="btn relative w-[155px] min-h-[50px] m-[20px] group before:content-[''] before:absolute before:left-1/2 before:-translate-x-[14px] before:bottom-[-5px] before:w-[30px] before:h-[10px] before:bg-red before:rounded-[10px] before:duration-[0.2s] before:delay-0 hover:before:bottom-[2px] hover:before:-translate-x-[50px] hover:before:h-1/2 hover:before:w-[80%] hover:before:rounded-[30px] hover:before:delay-[0.5s] after:content-[''] after:absolute after:translate-x-[60px] after:top-[-5px] after:w-[30px] after:h-[10px] after:bg-red after:rounded-[10px] after:duration-[0.2s] after:delay-[0s] hover:after:top-0 hover:after:translate-x-[10px] hover:after:h-1/2 hover:after:w-[80%] hover:after:rounded-[30px] hover:after:delay-[0.5s] before:bg-[#2bd2ff] before:shadow-neon-pink after:bg-[#2bd2ff] after:shadow-neon-pink">
            <a onClick={() => setIsForgetPasswrodModelOpen(false)} className="absolute top-0 left-0 w-full h-full flex  justify-center items-center bg-[#ffffff0d] shadow-[0_15px_35px_rgba(0, 0, 0, 0.2)] border-y-[#ffffff1a] rounded-[30px] text-white z-[1] font-[400] leading-[1px] no-underline overflow-hidden duration-[0.8s] backdrop-blur-[15px] before:content-[''] before:absolute before:top-0 before:left-0 before:w-1/2 before:h-full before:bg-gradient-to-l  before:from-[rgba(255_255_255_0.15)]  before:to-transparent before:skew-x-[45deg]  before:translate-x-0  before:duration-[0.8s] group-hover:before:skew-x-[45deg] group-hover:before:translate-x-[200%] cursor-pointer">
                {/* <img src={cancelmark} className="w-full h-full rounded-[50%]" /> */}
                Cancel
            </a>
        </div>
    </div>
    <div className={`w-[400px] h-[7px] bg-gradient-to-r from-[#AA47F5] to-[#5591EA] bg-[red] fixed inset-0 top-1/2 left-1/2 -translate-x-1/2  transform origin-top transition-all duration-700 ease-in-out z-[20] rounded-sm ${isForgetPasswrodModelOpen == true ? "scale-y-100 animate-revealAndMoveDown" : isForgetPasswrodModelOpen == false ? "animate-closerevealAndMoveDown scale-y-0" : "scale-y-0"}`}></div>
    {/* forget password code end */}
    </>
//   <div className='h1 text-lg'>Login page</div>  
  )
}

export default Login
