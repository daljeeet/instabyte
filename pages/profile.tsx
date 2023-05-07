import Navbar from '@/Components/Navbar'
import React, { useEffect, useState, Dispatch, useRef } from 'react'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux'
import { rootReducertype } from '@/redux/store'
import { AiOutlineCheck, AiOutlineClose,AiOutlineSetting } from 'react-icons/ai';
import { updateUserdata } from '@/redux/auth/auth.actions';
import UpdateuserModal from '@/Components/UpdateuserModal';
import Loader from '@/Components/Loader';
import ChangeProfile from '@/Components/ChangeProfle';
import BlurImage from '@/Components/BlurImage';
import { getOneUserPost } from '@/redux/users_post/uesr.action';
import ProfileCard from '@/Components/ProfileCard';
import { postDataType } from '@/helpers/dataTypes';

const Profile = () => {
     
    const inputRef = useRef<HTMLInputElement>(null);
    const [editUser, setEditUser] = useState(false)
    const [editProfile, setEditProfile] = useState(false)
    const [isProfile, setIsProfile] = useState(false)
    const { userPosts } = useSelector((val: rootReducertype) => val.userPost)
    const [logoutMenu, setLogoutMenu] = useState(false)
    const {get_loading,user} = useSelector((val: rootReducertype) => val?.user)
    const [inputval, setInputval] = useState(user?.username)
    const dispatch: Dispatch<any> = useDispatch()
    useEffect(() => {
        if(user){
            dispatch(getOneUserPost(user?.id))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch,user]) 
    const handleLogoutMenu = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation()
        setLogoutMenu(true)
    }
    const closeModal = () => {
        setLogoutMenu(false)
    }
    const closeAddMorePhotos = ()=>{
        setEditProfile(false)
    }
    const handleEditUsername = () => {
        setLogoutMenu(false)
        setEditUser(true)
        setTimeout(() => {
            if (inputRef.current !== null) {
                inputRef.current.focus();
            }
        }, 500);
    }
    const usernameChange = () => {
        if(user._id){
            dispatch(updateUserdata({username:inputval},user._id))
        }
        setInputval("")
        setEditUser(false)
    }
    const handleEditCover = ()=>{
        setLogoutMenu(false)
        setEditProfile(true)
        setIsProfile(false)
    }
    const handleEditProfile =()=>{
        setLogoutMenu(false)
        setEditProfile(true)
        setIsProfile(true)
    }
    return <>
        <Navbar />
        <div className='px-1 md:m-auto py-14' >
            <div className='flex h-40 items-center justify-between md:w-[50%] m-auto relative'>
                <Image src={`${user?.cover||"/logod.png"}`} width={1200} height={1200} alt='Cover Photo' className='border-[1px] border-blue-400 rounded-xl absolute z-0 w-full h-full' blurDataURL={BlurImage}/>
                <div className='border-2 ml-4 rounded-full relative border-blue-400/60'>
                    <Image className="rounded-full w-24 h-24" src={`${user?.profile||"/demo_img.png"}`} width={100} height={100} alt="user.name" blurDataURL={BlurImage} />
                    <div className={`w-4 h-4 absolute bottom-2 right-0 rounded-full ${user? "bg-green-500" : "bg-red-500"}`} ></div>
                </div>
                <div className='flex flex-col items-center mr-4 bg-black/50 z-10 py-2 relative'>
                    <p className='text-xl border-b-2 border-blue-300/40 px-4 mb-2 pb-2 z-10'>{user?.name}</p>
                    {editUser ? <div className='flex items-center justify-end w-max-lg'>
                        <input ref={inputRef} type="text" placeholder='username..' className='md:w-2/3 w-1/2 mx-0 pl-2 bg-transparent rounded-md outline-none border-[1px]' onChange={(e) => { setInputval(e.target.value) }} value={inputval} />
                        <button disabled={inputval.length<5} onClick={usernameChange}>
                        <AiOutlineCheck  className={`mx-2 font-bold text-xl ${inputval.length<5?"text-gray-400":"text-white"} `} />
                        </button>
                        <button onClick={()=>setEditUser(false)}>
                        <AiOutlineClose  className={`mx-2 font-bold text-xl `} />
                        </button>
                    </div> : <div className='flex items-center'>
                        <p className='text-gray-200 hover:underline font-semibold'>{user?.username}</p>
                        <AiOutlineSetting onClick={handleLogoutMenu} className='mx-2 cursor-pointer' />
                    </div>}
                    {
                        logoutMenu&&<UpdateuserModal handleEditProfile={handleEditProfile} handleEditCover={handleEditCover} closeModal={closeModal} handleEditUsername={handleEditUsername} />
                    }
                    {
                        editProfile&&<ChangeProfile  closeAddMorePhotos={closeAddMorePhotos} isProfile={isProfile}/>
                    }
                </div>
            </div>
            <div className='md:ml-52 md:px-10 px-2'>
                <p className='font-semibold text-lg mt-4 bg-black/60 px-4 rounded-full text-center'>Your Posts</p>
               {get_loading?<Loader text="Loading Your Posts" /> :<div className='grid md:grid-cols-3 gap-5 my-6 grid-cols-1'>
                    {userPosts?.map((el: postDataType, id: number) => <div key={id} className='h-fit rounded-lg overflow-hidden ' ><ProfileCard data={el} /></div>)}
                </div>}
            </div>
        </div>
    </>
}


export default Profile;