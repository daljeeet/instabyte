import React from 'react'
import CardSwiper from './CardSwiper'
import { postDataType } from './CreateModal'
type postdata = {
  element:postDataType
}

const ProfileCard = ({element}:postdata) => {
  return (
    <div className='' >
        <CardSwiper data={element.imgUrl} />
    </div>
  )
}

export default ProfileCard