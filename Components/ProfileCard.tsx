import React, { useState, useEffect, Dispatch } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postDataType } from './CreateModal'
import { rootReducertype } from '@/redux/store'
import PostDetails from './PostDetails'
import ModalEdit from './ModalEdit'
import DeleteModal from './DeleteModal'
import AlertModal from './AlertModal'
import AddMorePhotos from './AddMorePhotos'
import { editPost, getAllPosts } from '@/redux/postdata/post.actions'
import Router from 'next/router'
import PostCard from './PostCard'
import LoginModal from './LoginModal'
export const elem: postDataType = {
    caption: "",
    imgUrl: [""],
    owner: "",
    owner_profile: "",
    likes: [],
    posted_on: "",
    comments: [
        {
            user: "",
            comment: "",
            time: ""
        }
    ],
    show_Caption: false,
    edit_post: false,
    _id: ""
}
const ProfileCard = () => {
    // =========================Hooks at Top ============================
    const { del_error, error_post, postData } = useSelector((val: rootReducertype) => val?.allPosts)
    const user = useSelector((val: rootReducertype) => val?.user?.user)
    
    const dispatch: Dispatch<any> = useDispatch();
    const [post, setPost] = useState([])
    const [postObj, setPostObj] = useState(elem)
    const [modal, setModal] = useState(false)
    const [loginModal, setLoginModal] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [postEdit, setPostEdit] = useState(true)
    const [delModal, setDelModal] = useState(false)
    const [addImgModal, setAddImgModal] = useState(false)
    const [page, setPage] = useState(1)
   
    useEffect(() => {
        dispatch(getAllPosts(page))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch,page]) 
    useEffect(()=>{
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[postData])
    let getData = async()=>{
        let alldta: any = [...post, ...postData]
        setPost(alldta) 
    }
    // ======================Various Functions & Onclick Events============================
    
    const handlePostDetails = (el: postDataType) => {
        if (user) {
            setModal(true)
            setPostObj(el)
        } else {
          return <LoginModal />
        }
    }
    const handleLoginModal = ()=>{
        setLoginModal(false)
    }
    const closePostDtlModal = () => {
        setModal(false)
    }
    const handlePostEdit = (el: postDataType) => {
        if (user) {
            setModalEdit(true);
            handleEditPost(el._id)
            setPostObj(el)
        } else {
            setLoginModal(true)
        }
    }
    const closePostEditModal = () => {
        setModalEdit(false)
    }
    const handleEditPost = (id: string | undefined) => {
        setPostEdit(!postEdit)
        let showpostData = postData.map((e: { _id: string | undefined }) => {
            if (e._id === id) {
                let newData = { ...e, edit_post: postEdit }
                return newData
            } else {
                return e
            }
        })
        setPost(showpostData)
    }

    const handleDelModal = (el: postDataType) => {
        setDelModal(true)
        handleEditPost(el._id)
        setPostObj(el)
    }
    const closeDelModal = () => {
        setDelModal(false);
    }
    const openAddImgModal = (el: postDataType) => {
        setAddImgModal(true)
        handleEditPost(el._id)
        setPostObj(el)
    }
    const closeAddImgModal = () => {
        setAddImgModal(false)
    }
    // comments
    // likes

    const handleLike = (state: boolean, el: postDataType) => {
        if (user) {
            if (state) {
                el.likes.push(user.name)
                dispatch(editPost(el))
            }
            else {
                let newLikedel = el.likes.filter((el) => {
                    return el !== user.name
                })
                el.likes = newLikedel
                dispatch(editPost(el))
            }
        } else {
            Router.push("/login")
        }
    }
    if (error_post) {
        return <div>Something Went Wrong.....</div>
    }
    return (
        <div className='pb-12'>
            {post?.map((el: postDataType, id: number) =>{
                console.log(el)
                if(el.owner==user?.name){
                return    <PostCard
                    key={id}
                    el={el}
                    handleLike={handleLike}
                    handlePostDetails={handlePostDetails}
                    handlePostEdit={handlePostEdit}
                    openAddImgModal={openAddImgModal}
                    handleDelModal={handleDelModal} 
                    handleEditPost={handleEditPost} 
                    isLast={id === post.length - 1}
                    newLimit={() => setPage(page + 1)}
            />
                }
                 })}
            {/* {loginModal && <LoginModal handleLoginModal={handleLoginModal} />} */}
            {modal && <PostDetails data={postObj} closeModal={closePostDtlModal} />}
            {modalEdit && <ModalEdit data={postObj} closeModal={closePostEditModal} />}
            {delModal && <DeleteModal id={postObj?._id} closeModal={closeDelModal} />}
            {del_error && <AlertModal color="bg-red-600" text='Error in Deleting the post. Try again' />}
            {addImgModal && <AddMorePhotos closeAddMorePhotos={closeAddImgModal} data={postObj} />}
            <div className='mt-10 text-center'>
            {/* <Loader text="Loading..." /> */}
                <p className='m-auto text-sm text-gray-500'> copyright © instabyte all Rights reserved </p>
            </div>
        </div>
    )
}

export default ProfileCard