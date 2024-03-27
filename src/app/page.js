import dbConnect from "@/utils/connection";
import Signin from "./signin/page";

export default function Home() {
  dbConnect();
  return (
    <>
      <Signin />
    </>
  );
}
