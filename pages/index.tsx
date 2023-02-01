import Card from "./Components/Card";
import Status from "./Components/Status";
import{useSelector} from 'react-redux'
import { postDataType } from "./Components/CreateModal";
import Navbar from "./Components/Navbar";
export default function Home() {
  const {loading_post, error_post, postData} = useSelector((val:any)=>val.allPosts)
  return (
    <>
    <Navbar/>
    <div className="md:w-[35%] px-1 md:m-auto py-14 ">
      <Status/>
      {postData?.map((el:postDataType,id:number)=><Card key={id} elem={el}  />)}
    </div>
    </>
  )
}
