import Navbar from '@/Components/Navbar/Navbar'
import React, { useEffect, useState, Dispatch } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { rootReducertype } from '@/redux/store';
import ExploreImg from '@/Components/ExploreImg';
import { getAllPosts, nextPage } from '@/redux/postdata/post.actions';
import {  resPostDataType } from '@/helpers/dataTypes';
const Explore = () => {
  const { postData, page } = useSelector((val: rootReducertype) => val?.allPosts)
  const dispatch: Dispatch<any> = useDispatch()
  //=================================view Post on click of Image==================================== 
  useEffect(() => {
    if (postData.length == 0) {
      dispatch(getAllPosts(1))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (page > 1) {
      dispatch(getAllPosts(page))
    }
  }, [dispatch, page])
  return (
    <>
      <Navbar />
      <div className='md:ml-52 pt-14 h-fit' >
        <div className='grid gap-4 p-4 md:grid-cols-3 grid-cols-1 sm:grid-cols-2 grid-rows-auto'>
          {postData.map((el: resPostDataType, id: number) => <ExploreImg key={id} data={el} isLast={id == postData.length - 1} newLimit={() => dispatch(nextPage())} />)}
        </div>
      </div>
    </>
  )
}
export default Explore;