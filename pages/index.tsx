import Card from "../Components/Card";
import Status from "../Components/Status";
import { postDataType } from "../Components/CreateModal";
import Navbar from "../Components/Navbar";
import axios from "axios";
type postAray ={
  res: postDataType[]
} 
export default function home(data:postAray) {
  let dataa:postDataType[] = data.res
  return (
    <>
    <Navbar/>
    <div className="md:w-[35%] px-1 md:m-auto py-6 ">
      <Status/>
      {dataa?.map((el:postDataType,id:number)=><Card key={id} elem={el}  />)}
    </div>
    </>
  )
}
export async function getServerSideProps() {
  const posts:any = process.env.NEXT_PUBLIC_POSTS;
  const data = await axios.get(posts);
  let res:postDataType[] = data.data
  return {
    props: {res}
  }
}
