import React, { useState, useEffect, Dispatch } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postDataType } from './CreateModal'
import { rootReducertype } from '@/redux/store'
import PostDetails from './PostDetails'
import ModalEdit from './ModalEdit'
import DeleteModal from './DeleteModal'
import AlertModal from './AlertModal'
import AddMorePhotos from './AddMorePhotos'
import { getAllPosts } from '@/redux/postdata/post.actions'
import PostCard from './PostCard'
import LoginModal from './LoginModal'
import Loader from './Loader'
import { getComments } from '@/redux/comments/comments.action'
export const elem: postDataType = {
    caption: "",
    imgUrl: [""],
    author: "",
    likes: [],
    posted_on: "",
    comments:0,
    _id: ""
}
const Card = () => {
    // =========================Hooks at Top ============================
    const { del_success,del_error,loading_post, error_post, postData } = useSelector((val: rootReducertype) => val?.allPosts)
    const user = useSelector((val: rootReducertype) => val?.user?.user)
    const dispatch: Dispatch<any> = useDispatch();
    const [post, setPost] = useState([])
    const [postObj, setPostObj] = useState(elem)
    const [modal, setModal] = useState(false)
    const [loginModal, setLoginModal] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [delModal, setDelModal] = useState(false)
    const [addImgModal, setAddImgModal] = useState(false)
    const [page, setPage] = useState(1)
    useEffect(() => {
        dispatch(getAllPosts(page))
    }, [dispatch,page]) 
    useEffect(()=>{
        if(postData){
            let allData:any=postData
            setPost(allData)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[postData])
    // let getData = async()=>{
    //     let alldta:any = [...post, ...postData]
    //         setPost(alldta)
    // }
    // ======================Various Functions & Onclick Events============================
    const handlePostDetails = (el: postDataType) => {
        if (user) {
            setModal(true)
            if(el._id){
                dispatch(getComments(el?._id))
            }
            setPostObj(el)
        } else {
        setLoginModal(true)
        }
    }
    const closeLoginModal = ()=>{
        setLoginModal(false)
    }
    const closePostDtlModal = () => {
        setModal(false)
    }
    const handlePostEdit = (el: postDataType) => {
        if (user) {
            setModalEdit(true);
            setPostObj(el)
        } else {
            setLoginModal(true)
        }
    }
    const closePostEditModal = () => {
        setModalEdit(false)
    }

    const handleDelModal = (el: postDataType) => {
        setDelModal(true)
        setPostObj(el)
    }
    const closeDelModal = () => {
        setDelModal(false);
    }
    const openAddImgModal = (el: postDataType) => {
        setAddImgModal(true)
        setPostObj(el)
    }
    const closeAddImgModal = () => {
        setAddImgModal(false)
    }
    if (error_post) {
        return <div>Something Went Wrong.....</div>
    }
    if(page==1){
        if(loading_post){
            return <Loader text='Loading' />
        }
    }
    return (
        <div className='pb-12'>
            {post?.map((el: postDataType, id: number) =>
                    <PostCard
                        key={id}
                        el={el}
                        handlePostDetails={handlePostDetails}
                        handlePostEdit={handlePostEdit}
                        openAddImgModal={openAddImgModal}
                        handleDelModal={handleDelModal}
                        isLast={id === post.length - 1}
                        newLimit={() => setPage(page + 1)}
                />)}
            {/* {loginModal && <LoginModal handleLoginModal={handleLoginModal} />} */}
            {modal && <PostDetails data={postObj} closeModal={closePostDtlModal} />}
            {modalEdit && <ModalEdit data={postObj} closeModal={closePostEditModal} />}
            {delModal && <DeleteModal id={postObj?._id} closeModal={closeDelModal} />}
            {del_error && <AlertModal color="bg-red-600" text='Error in Deleting the post. Try again' />}
            {del_success && <AlertModal color="bg-green-600" text='Delete Success.' />}
            {addImgModal && <AddMorePhotos closeAddMorePhotos={closeAddImgModal} data={postObj} />}
            {loginModal&&<LoginModal closeLoginModal={closeLoginModal} />}
            <div className='mt-10 text-center'>
            {/* <Loader text="Loading..." /> */}
                <p className='m-auto text-sm text-gray-500'> copyright © instabyte all Rights reserved </p>
            </div>
        </div>
    )
}

export default Card