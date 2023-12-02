import { EventConfig } from "@/context/EventsConfig";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Input,
  Text,
  Tab,
  Tabs,
  TabList,
  Spinner,
} from "@chakra-ui/react";

import React, { useContext, useState } from "react";
import { GeneralButton } from "../buttons/General";
import { ModalInput } from "../inputs/ModalInput";
// import lorem

export const RSVPCpntrolModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [TabValue, setTabValue] = useState(1);
  const { rideRequests, RidesLoading, updateRideRequest } =
    useContext(EventConfig);
  const [isSucLoading, setIsSucLoading] = useState(false);
  const [isFailLoading, setIsFailLoading] = useState(false);

  const handleInvite = () => {
    // props.lfn();
    onClose();
  };
  console.log(rideRequests);
  return (
    <div>
      <Button onClick={onOpen} className="mt-2 md:mt-1" mr="2">
        RSVP Control
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            background={` background-color: #FBAB7E;
    background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);`}
          >
            {" "}
            Control Requests{" "}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Box position="relative" pl="5px">
              Ride RSVP
            </Box>
            {RidesLoading ? (
              <Spinner />
            ) : (
              rideRequests.map((obj) => {
           return(     obj.map((item, k) => {
                  console.log("enteredddd");
                  console.log(
                    "blah lah",
                    props.rideid,
                    props.data,
                    item.id
                  );
                  if (props.rideid == item.rideid) {
                    console.log("yess",props.data.location);
                    return (
                      <Box
                        key={k}
                        background={`background-color: #8EC5FC;
    background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
    `}
                        p="3"
                        mt="3"
                      >
                        <div className="flex flex-row justify-between">
                          {" "}
                          <Text fontFamily={"Inter"} fontSize="16px">
                            {props.data.location} - {props.data.destination}
                          </Text>
                          <Text fontFamily={"Inter"} fontSize="16px">
                            Departure
                          </Text>
                        </div>
                        {item.status === "pending" ? (
                          <div className="flex flex-row justify-begin">
                            <Button
                              onClick={async () => {
                                await updateRideRequest(
                                  props.rideid,
                                  item.id,
                                  "accepted"
                                );
                                rideRequests.map((obj) => {
                                  if (item.id == obj.id) {
                                    return { ...item, status: "accepted" };
                                  }
                                });
                              }}
                              isLoading={isSucLoading}
                              colorScheme={"green"}
                            >
                              Accept
                            </Button>
                            <Button
                              onClick={async () => {
                                await updateRideRequest(
                                  props.rideid,
                                  item.id,
                                  "rejected"
                                );
                                rideRequests.map((obj) => {
                                  if (item.id == obj.id) {
                                    return { ...item, status: "rejected" };
                                  }
                                });
                              }}
                              ml="2"
                              colorScheme={"red"}
                            >
                              Decline
                            </Button>
                          </div>
                        ) : item.status === "accepted" ? (
                          <Text>Accepted</Text>
                        ) : (
                          <Text>Denied</Text>
                        )}
                      </Box>
                    );
                  }
                }))
              })
            )}
          </ModalBody>

          <ModalFooter>
            <GeneralButton colorScheme="blue" mr={3} fn={onClose}>
              Close
            </GeneralButton>
            <Button onClick={handleInvite} variant="ghost">
              {"Invite"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
