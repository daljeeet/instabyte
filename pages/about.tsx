import React from 'react'
import Image from 'next/image'
import {GrInProgress} from "react-icons/gr"
import {BiChevronLeft} from "react-icons/bi"
import {BiChevronRight} from "react-icons/bi"
import {FiExternalLink} from "react-icons/fi"
import Link from 'next/link'
const about = () => {
  return (
    <div className='md:w-1/2 sm:3/4 base-1 m-auto border-2'>
      <p className='w-1/2 m-auto text-3xl text-center underline '>
    About InstaByte
      </p>

    <p className='mt-5'>
InstaByte is a Social media app in which you can post images/posts and interact with other users. You can also like posts of other users and comment in their posts.
InstaByte is inspired from a popular Social media plateform Instagram.
    </p>

    <p className='text-2xl  mt-5  underline text-teal-400'>
      Features
    </p>

    <p className='text-lg mt-5 text-rose-500 font-bold'>HomePage</p>
    <Image src="https://i.imgur.com/uyrxP8p.png" width={"800"} height={"800"}  alt="homepage"/>
    <p>
      In the Home section of the app you can see posts of all the users. In order to interact with the post you will need to login. After login you can like and comment in the post and can see the other comments also by clicking on the button <q>View comments </q> provided at the bottom of the post.
      Whenever you will login in the app it will open in the homepage by default. 
    </p>

    <p className='text-lg mt-5 text-rose-500 font-bold'>Explore</p>
    <Image src="https://i.imgur.com/EWTF3NF.png" width={"800"} height={"800"}  alt="Explore"/>
    <p>
      On clicking over the <q>Explore</q> icon provided in the sidebar, you will be redirected to the <q>Explore</q> page. Here you can see images from all the posts in the website. You can also click on any of the image to see the details of the post like likes and comments.
    </p>


    <p className='text-lg mt-5 text-rose-500 font-bold'>Create</p>
    <Image src="https://i.imgur.com/4ctWiZs.png" width={"800"} height={"800"}  alt="Create Post"/>
    <p>
      By clicking over the <q>Create</q> icon provided in the sidebar, you can create a post. It will open a Pop-up and it will give you an option to select images from your device. After selection of the image, it will take some seconds to process the image, meanwhile you can write a beautifull caption for your post. After clicking on the <q>Post</q> button, your post will be succussfully posted.
      You can also add multiple images in a single post by clicking over <q>3 dots icon</q> provided on any particular post. 
      You can also <q>delete</q> the post or <q>edit </q> the caption of the post from this option
    </p>


    <p className='text-lg mt-5 text-rose-500 font-bold' >Profile</p>
    <Image src="https://i.imgur.com/JjWxjIk.png" width={"800"} height={"800"}  alt="Proflie"/>
    <p>
      By clicking over the <q>Profile</q> icon provided in the sidebar, you can view your profile. it will redirect you to profile page which will look something like this  </p>
      <Image src="https://i.imgur.com/hZlrC2H.png" width={"800"} height={"800"}  alt="Profile page"/>
    <p>
      Here you can see your profile picture, cover photo, username and different images of all your posts. 
    Well, you may want to change your Profile picture, cover photo or username, that you can obviously do by clicking over the <q>Setting</q> icon provided below your name. 
    When you will click on it, there will be a Pop-up something like this
    </p>
    <div className='m-auto w-1/2 flex justify-center'>
    <Image  src="https://i.imgur.com/V7jq8c4.png" width={"200"} height={"200"}  alt="Profile page"/>
    </div>
    <p>Click on any of the option to make changes</p>


    <p className='text-lg mt-5 text-rose-500 font-bold'>Login</p>
  
    <p>All the pages except <q>Home</q> are protected. You need to login to visit them, so once you will click on any of these pages from sidebar, there will be an option to login and upon click on that option you will be redirect to login page, which will look something like this
    </p>
    <Image src="https://i.imgur.com/YkmkA0D.png" width={"800"} height={"800"}  alt="Login"/>
<p>For login or SignUp you can click on Google or Github icon and can login/Signup using that account. 
  You do not need to enter any password anywhere. 
</p>

<div className='flex'>
    <p className="text-2xl  mt-5  underline text-teal-400">Features in Progress</p>
    <GrInProgress className='bg-rose-500 mt-7 text-xl ml-5' />
    </div>

    <p className='text-lg mt-5 text-rose-500'>Search</p>
    <p>Here you will be able to search any post by its caption or you can search any user itself once live</p>

    <p className='text-lg mt-5 text-rose-500'>Notifications</p>
    <p>When this feature will be live then you will be be notified whenever anyone likes or comments on your post</p>

    <p className='text-lg mt-5 text-rose-500'>Messaging</p>
    <p> Two users will be able to chat with each other using this feature. </p>

    <p className='text-lg mt-5 text-rose-500'>Bookmarks</p>
    <p>There will be a bookmark option on every post through which you can bookmark(save) that post and they will be shown inside <q>Bookmark</q> option provided in the sidebar. This feature will help you to make collection of your favourite posts.</p>


    <div className="text-2xl  mt-5  text-blue-400 flex">
      <BiChevronLeft className='mt-1 text-3xl'/> Developer Section /<BiChevronRight className='mt-1 text-3xl'/> </div>
      
      <p className='text-xl mt-5 text-teal-500 underline'>Tech Stack Used</p>

      <p className='text-lg mt-5 text-rose-500 '>Front-End</p>
      <p>Framework               -    Next JS</p>
      <p>Language                 -    TypeScript</p>
      <p>State Management  -    Redux</p>
      <p>CSS Library              -    Tailwind</p>
      <p>Authentication        -     Firebase</p>
      <p className='text-lg mt-5 text-rose-500 '>Back-End</p>
      <p>Next JS</p>
     
      <p className='text-lg mt-5 text-rose-500 '>Database</p>
      <p>Mongo DB</p>
      
  <Link href="https://github.com/daljeet-coder/instabyte" target='blank'>
     <div className=' flex text-lg mt-5 text-blue-500'>Visit GitHub Repo   <FiExternalLink className='mt-1 ml-2'/>  </div>
     </Link>
   
    </div>
  )
}

export default about