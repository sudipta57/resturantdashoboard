"use client";
import React, { useContext, useEffect } from "react";
import { loginContext } from "../layout";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";

const Page = () => {
  const router = useRouter();
  const { setIslogin } = useContext(loginContext);

  useEffect(() => {
    router.push("/signin");
    toast.success("Resturant Logged out successful", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    setIslogin(false);
  }, []);

  return <center>Logggin out</center>;
};

export default Page;
