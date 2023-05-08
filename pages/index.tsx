import Card from "../Components/Card";
import Status from "../Components/Status";
import Navbar from "../Components/Navbar";
export default function Home() {
    return (
    <>
    <Navbar/>
    <div className="md:w-[40%] px-1 md:m-auto pt-6 ">
      <div >
      <Status/>
      </div>
      <Card/>
    </div>
    </>
  )
}
