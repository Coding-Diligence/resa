import Image from "next/image";
import Reservation from "./pages/Reservation";

export default function Home() {
  return (
    <div className=" m-auto flex flex-col items-center justify-center w-3/4 relative">
      <Reservation />
    </div>
    
  );
}
