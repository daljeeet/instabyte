import Navbar from '@/Components/Navbar'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import React from 'react'

const Explore = () => {
    const images = ['https://i.ibb.co/3cB5fJf/Image613.jpg','"https://i.ibb.co/3zL2Hr3/Image023.jpg']
  return (
    <>
     <Navbar/>
    <div className='border-2 h-96 md:ml-52 ' >

    </div>
    </>
  )
}
type reqres= {
    req:any,
    res:any
}
export async function getServerSideProps({req,res}:reqres) {
    console.log(req)
    // Fetch data from external API
    // const data = await axios.get(`/api/insta`)
    // console.log(data)
    return { props: { data:'sdafkl' } }
  }
export default Explore;