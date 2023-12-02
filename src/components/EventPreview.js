import { UserConfig } from "@/context/UserConfig";
import { AxiosPost } from "@/lib/axios";
import { Box, Button, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { EventExpandModal } from "./modals/EventExpandModal";
import { RSVPCpntrolModal } from "./modals/RSVPCpntrolModal";

export const EventPreview = (props) => {
  const {user,session} = useContext(UserConfig);
  const [status, setStatus] = useState(props.status?props.status:"required")
  console.log(props.data)
  return (
    <Box
      _hover={{
        transform: "translateX(-25px)",
        transitionDuration: "0.2s",
        transitionTimingFunction: "ease-in-out",
      }}
      transition={{ exit: { delay: 1 }, enter: { duration: 0.5 } }}
      padding={"5"}
      rounded={"13"}
      width={"60%"}
      background={`
    background-color: #FBAB7E;
    background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
    
          `}
    >
      {/* <Navbar    /> */}
      <div className="flex flex-row flex-wrap justify-between   ">
        {" "}
        <Text
          className="text-center"
          fontWeight="700"
          color="black"
          fontSize="24px"
          fontStyle="normal"
        >
          {props.data.location}
        </Text>{" "}
        <Text fontWeight="700" color="black" fontSize="24px" fontStyle="normal">
          {props.data.destination}
        </Text>
      </div>
      <Text
        className="text-center md:text-left"
        fontWeight="700"
        color="black"
        fontSize="24px"
        fontStyle="normal"
      >
        {props.data.departure.slice(0,10)}
      </Text>
      <div className="flex flex-row   flex-wrap justify-center md:justify-between ">
        <div className="flex flex-row   flex-wrap justify-center md:justify-around ">
          <Text
            mr={"4"}
            alignContent={"center"}
            alignItems="center"
            fontWeight="700"
            color="black"
            fontSize="14px"
            fontStyle="normal"
            display={"flex"}
            flexDirection="column"
            justifyContent={"end"}
          >
            {props.data.status}
          </Text>
          {!props.host && (
            <Text
              fontWeight="700"
              color="black"
              fontSize="14px"
              fontStyle="normal"
              display={"flex"}
              flexDirection="column"
              justifyContent={"end"}
            >
              {/* {props.data.status} */}
            </Text>
          )}
        </div>
        <div className=" flex flex-row  flex-wrap justify-center md:justify-around ">
          {props.host && (
            <div display={"flex"} flexDirection="column" justifyContent={"end"}>
              <RSVPCpntrolModal data={props.data} rideid={props.data.id} />
            </div>
          )}
          {!props.host && <Button  onClick={async()=>{
            await AxiosPost(`/api/v1/rides/${props.data.id}/requests`,{userid:user.id},session.token);
            setStatus('pending');
          }} >{status}</Button>}
        </div>
      </div>
    </Box>
  );
};
