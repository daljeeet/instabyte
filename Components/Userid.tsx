import GetUser from '../helpers/GetUser'

const Userid = () => {
    const user = GetUser()
    const userid:string = user?._id
  return userid
}

export default Userid