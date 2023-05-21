import React, { useState, useEffect, Dispatch } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { rootReducertype } from '@/redux/store'
import PostDetails from './PostModals/PostDetails'
import ModalEdit from './PostModals/ModalEdit'
import DeleteModal from './PostModals/DeleteModal'
import AlertModal from '../Navbar/AlertModal'
import AddMorePhotos from './PostModals/AddMorePhotos'
import { getAllPosts, nextPage } from '@/redux/postdata/post.actions'
import PostCard from './SinglePost'
import LoginModal from '../Navbar/LoginModal'
import { getComments } from '@/redux/comments/comments.action'
import Image from 'next/image'
import { postDataType, resPostDataType } from '@/helpers/dataTypes'
import GetUser from '../../helpers/GetUser'
const Card = () => {
    // =========================Hooks at Top ============================

    const { delete_post_success, delete_post_error, add_post_loading, add_post_error, postData, page } = useSelector((val: rootReducertype) => val?.allPosts)
    const user = GetUser()
    const dispatch: Dispatch<any> = useDispatch();
    const [postObj, setPostObj] = useState<any>(null)
    const [allPosts,setAllPosts] = useState([])
    const [modal, setModal] = useState(false)
    const [loginModal, setLoginModal] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [delModal, setDelModal] = useState(false)
    const [addImgModal, setAddImgModal] = useState(false)
    useEffect(() => {
        if (!allPosts.length) {
            dispatch(getAllPosts(1))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        setAllPosts(postData)
    },[postData])

    useEffect(() => {
        if (page > 1) {
            dispatch(getAllPosts(page))
        }
    }, [dispatch, page])
    // ======================Various Functions & Onclick Events============================
    const handlePostDetails = (el: postDataType) => {
        if (user) {
            setModal(true)
            if (el._id) {
                dispatch(getComments(el?._id))
            }
            setPostObj(el)
        } else {
            setLoginModal(true)
        }
    }
    const closeLoginModal = () => {
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
    if (add_post_error) {
        return <div>Something Went Wrong.....</div>
    }
    return (
        <div className='pb-12'>
            {allPosts.map((el: resPostDataType, id: number) =>
                <PostCard
                    key={el._id}
                    el={el}
                    handlePostDetails={handlePostDetails}
                    handlePostEdit={handlePostEdit}
                    openAddImgModal={openAddImgModal}
                    handleDelModal={handleDelModal}
                    isLast={id === allPosts.length - 1}
                    newLimit={() => dispatch(nextPage())}
                />)}
            {/* {loginModal && <LoginModal handleLoginModal={handleLoginModal} />} */}
            {modal && <PostDetails data={postObj} closeModal={closePostDtlModal} />}
            {modalEdit && <ModalEdit data={postObj} closeModal={closePostEditModal} />}
            {delModal && <DeleteModal id={postObj?._id} closeModal={closeDelModal} />}
            {delete_post_error && <AlertModal type="error" text='Error in Deleting the post. Try again' />}
            {delete_post_success && <AlertModal type="success" text='Post Deleted Successfully.' />}
            {addImgModal && <AddMorePhotos closeAddMorePhotos={closeAddImgModal} data={postObj} />}
            {loginModal && <LoginModal closeLoginModal={closeLoginModal} />}
            {add_post_loading &&
                <Image src='/insta_loading.gif' alt='loading_img' className='m-auto' width={500} height={500} />
            }
            <div className='mt-10 text-center'>
                <p className='m-auto text-sm text-gray-500'> Made with 💖 By Daljeet Singh</p>
            </div>
        </div>
    )
}

export default Card