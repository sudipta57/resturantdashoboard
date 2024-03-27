"use client";
import React, { useContext } from "react";
import Link from "next/link";

import { Text, Box } from "@chakra-ui/react";
import { loginContext } from "../layout";

const Nav = () => {
  const { islogin, setIslogin } = useContext(loginContext);

  const NavItem = ({ href, button, children }) => {
    const defaultClasses =
      "p-4 cursor-pointer hover:text-white hover:transition hover:bg-black hover:rounded-md";
    const buttonClasses =
      "p-4 cursor-pointer bg-orange-600 text-white rounded-md";

    return (
      <Link href={href}>
        <li className={button ? buttonClasses : defaultClasses}>{children}</li>
      </Link>
    );
  };

  return (
    <>
      <Box>
        <nav className="h-22 py-3 max-w-full mx-auto px-4 sm:px-4 lg:px-8 w-full md:w-80%">
          <ul className="flex justify-between items-center font-bold">
            <Text className="px-4 text-2xl cursor-pointer">FooDie HuNteR</Text>
            <div className="flex space-x-6 font-bold w-50%">
              <NavItem href="/dashboard">Dashboard</NavItem>
              <NavItem href="/addItem">Add Food</NavItem>
              {islogin ? (
                <NavItem href="/logout">Log out</NavItem>
              ) : (
                <NavItem href="/signin">Sign in</NavItem>
              )}
            </div>
          </ul>
        </nav>
      </Box>
    </>
  );
};

export default Nav;
