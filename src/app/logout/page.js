"use client";
import React, { useContext, useEffect } from "react";
import { loginContext } from "../layout";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";

const Page = () => {
  const router = useRouter();
  const { setIslogin } = useContext(loginContext);
  const logout = async () => {
    const res = await fetch("api/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (data.message) {
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
    } else {
      toast.error(data.error, {
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
    }
  };
  useEffect(() => {
    logout();
  }, []);

  return <center>Logggin out</center>;
};

export default Page;
