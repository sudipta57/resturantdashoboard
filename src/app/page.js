import dbConnect from "@/utils/connection";
import Signin from "./signin/page";

export default async function Home() {
  await dbConnect();
  return (
    <>
      <Signin />
    </>
  );
}
