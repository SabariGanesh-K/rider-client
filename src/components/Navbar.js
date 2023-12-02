import Account from "@/assets/icons/Account";
import { UserConfig } from "@/context/UserConfig";
import { Box, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { GeneralButton } from "./buttons/General";
import { LoginModal } from "./modals/LoginModal";
// import
export const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const {session,user,logout} = useContext(UserConfig);
  // const router = useRouter();
  useEffect(()=>{
    if(session){
      setLoggedIn(true);
    }
  },[session])

 console.log(user,session);

  return (
    <div
      zIndex={100}
      className=" w-screen h-20 rounded-6xl    border-b-gray-600 flex flex-row justify-between"
    >
      <Image src="/LOGO-CTX-FULL.png" width={256} height={123} />
      <div className="flex flex-col justify-center align-middle mr-2">
        {!session ? (
          <LoginModal
            lfn={() => setLoggedIn(true)}
            sfn={() => setLoggedIn(true)}
            loggedIn={loggedIn}
          />
        ) : (
         <Box cursor={'pointer'} onClick={logout}> <Account /></Box>
        )}
      </div>
    </div>
  );
};
