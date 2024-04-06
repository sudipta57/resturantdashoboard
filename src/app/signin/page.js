"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loading from "../loading";
const Signin = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [forminfo, setforminfo] = useState({
    resturantName: "",
    email: "",
    password: "",
    secret: "",
  });
  const [loading, setloading] = useState(false);
  const oninputchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setforminfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //sending the resturantinfos to the backend for saving the infos to the database
  const SendResturantData = async (e) => {
    e.preventDefault();
    setloading(true);
    const { resturantName, email, password } = forminfo;
    if (!resturantName || !email || !password) {
      setloading(false);
      return toast.warn("please fill all the details", {
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
    const res = await fetch("/api/resturantinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",

      body: JSON.stringify({
        resturantName,
        email,
        password,
      }),
    });
    const data = await res.json();
    setloading(false);
    if (!data.message) {
      return toast.error(res.error || "error in submiting infos", {
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
    } else {
      toast.success("resturant signed up please login", {
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
      setforminfo({
        resturantName: "",
        email: "",
        password: "",
        secret: "",
      });
    }
  };

  // const HandleLogin = async (e) => {
  //   e.preventDefault();
  //   const { email, password } = forminfo;
  //   if (!email || !password) {
  //     return toast.warn("please fill all the data", {
  //       position: "top-right",
  //       autoClose: 1500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //       transition: Bounce,
  //     });
  //   }

  //   try {
  //     const res = await fetch("api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({
  //         email: email,
  //         password: password,
  //       }),
  //     });
  //     const data = await res.json();
  //     if (data.message) {
  //       router.push("/dashboard");
  //       setIslogin(true);
  //       return toast("Resturant Logged in successful", {
  //         position: "top-right",
  //         autoClose: 1500,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //         transition: Bounce,
  //       });
  //     } else {
  //       toast.error(data.error, {
  //         position: "top-right",
  //         autoClose: 1500,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //         transition: Bounce,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true);
    const { email, password } = forminfo;
    if (!email || !password) {
      setloading(false);
      return toast.warn("please fill all the details", {
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
    // Sign in using the 'credentials' provider
    const result = await signIn("credentials", {
      redirect: false, // Set to true if you want to redirect the user to another page upon success
      email,
      password,
    });
    if (result.status == 200) {
      setloading(false);

      router.push("/dashboard");
      return toast("Resturant Logged in successful", {
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
    if (result.error) {
      setloading(false);
      return toast.error("User not registered", {
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
  return loading ? (
    <Loading />
  ) : (
    <div className="body">
      <div className="main">
        <input
          className="input"
          type="checkbox"
          id="chk"
          aria-hidden="true"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />

        <div className="signup">
          <form>
            <label className="label" htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              className="input"
              type="text"
              name="resturantName"
              value={forminfo.resturantName}
              placeholder="Resturant name"
              onChange={oninputchange}
            />
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              value={forminfo.email}
              onChange={oninputchange}
            />
            <input
              className="input"
              type="password"
              name="password"
              value={forminfo.password}
              placeholder="Password"
              onChange={oninputchange}
            />
            <input
              className="input"
              type="text"
              name="secret"
              placeholder="secret code"
              onChange={oninputchange}
              value={forminfo.secret}
            />
            <button className="button" onClick={SendResturantData}>
              Sign up
            </button>
          </form>
        </div>

        <div className="login">
          <form>
            <label className="label" htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              onChange={oninputchange}
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              onChange={oninputchange}
            />
            <button className="button" onClick={handleSubmit}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
