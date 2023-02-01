
import Card from "./Components/Card";
import Status from "./Components/Status";
import{useSelector} from 'react-redux'
import { postDataType } from "./Components/CreateModal";
import Navbar from "./Components/Navbar";

export default function Home() {
  const postData = useSelector((val:any)=>val?.allPosts.postData)
  return (
    <>
    <Navbar/>
    <div className="md:w-[35%] px-1 md:m-auto py-6 ">
      <Status/>
      {postData?.map((el:postDataType,id:number)=><Card key={id} elem={el}  />)}
    </div>
    </>
  )
}
