import Card from "../Components/Card";
import Status from "../Components/Status";
import Navbar from "../Components/Navbar";
import CardSkl from "@/Skeleton/CardSkl";
export default function Home() {
  
    return (
    <>
    <Navbar/>
    <div className="md:w-[450px] px-1 md:m-auto pt-6 ">
      <div >
      <Status/>
      </div>
      {/* <CardSkl/> */}
      <Card/>
    </div>
    </>
  )
}
