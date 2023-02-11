import Card from "../Components/Card";
import Status from "../Components/Status";
import Navbar from "../Components/Navbar";
export default function home() {
  return (
    <>
    <Navbar/>
    <div className="md:w-[35%] px-1 md:m-auto py-6 ">
      <Status/>
      <Card/>
    </div>
    </>
  )
}
