import { rootReducertype } from '@/redux/store'
import { useSelector } from 'react-redux'

const Userid = () => {
    const user = useSelector((val:rootReducertype)=>val?.user?.user)
    const userid:string = user?._id
  return userid
}

export default Userid