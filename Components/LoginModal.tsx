import Link from "next/link";

type loginData = {
  closeLoginModal:()=>void;
}
const LoginModal = (props:loginData) => {
    const { closeLoginModal } = props; 
  return (
    <>
  <div onClick={closeLoginModal} className='fixed h-screen flex justify-center items-center right-0 top-0 left-0 bg-black/60 z-10' >
            <div onClick={(e)=>{e.stopPropagation()}} className='bg-darkbg/80 flex flex-col h-32 md:h-[15%] rounded-xl md:w-[40%] w-5/6 items-center justify-around px-5 animate-in zoom-in'>
                <p className='' >Login required</p>
                <div className='md:w-1/3 w-5/6 flex justify-around'>
                <Link href={'/login'}  className='border-2 border-gray-500 px-3 rounded-md' >Login</Link>
                </div>
            </div>
        </div>
        </>
  )
}

export default LoginModal