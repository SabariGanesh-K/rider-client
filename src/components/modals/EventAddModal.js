import { EventConfig } from '@/context/EventsConfig'
import { UserConfig } from '@/context/UserConfig'
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
    Box,Input, Text, Tab, Tabs, TabList, Select
  } from '@chakra-ui/react'

import React, { useContext, useState } from 'react'
import { GeneralButton } from '../buttons/General'
import { ModalInput } from '../inputs/ModalInput'
// import lorem

export const EventAddModal = (props) => {
  const [tabValue, setTabValue] = useState(1);
//   {"eventid":"sabb2","name":"ragging","urlAlias":"raggnigga2","organizer":"nigga","email":"k.sabarii.ganesh@gmail.com","openedDate":"2023-11-18","mode":"online","desc":"shit" }
    const { isOpen, onOpen, onClose } = useDisclosure()
const [eventid, setEventid] = useState("");
const [eventname, setEventname] = useState("")
const {login,signup,session,user} = useContext(UserConfig);

const [location, setLocation] = useState("")
const [departure, setdeparture] = useState("")
const [destination, setdestination] = useState("")
const [seats, setseats] = useState(0)

    const {postRide}=useContext(EventConfig)
    const [loading, setLoading] = useState(false)
    const [addLoader, setAddLoader] = useState(false)
   const handleAddEvent = async() =>{
    setAddLoader(true);
    await postRide({location:location,destination:destination,seats:seats,departure:departure});
    setAddLoader(false);
    onClose();
   }

  
 
  return (
    <div>
             <GeneralButton name="Host Your Event" fn={onOpen} />
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> <Box position="relative" pl="5px">
         Add Ride
                 
            </Box></ModalHeader>
          <ModalCloseButton />
          { <ModalBody>
            
      <ModalInput text="Location " value={location} onChange={(e)=>setLocation(e.target.value)} />
   
      <ModalInput text="Destination" value={destination} onChange={(e)=>setdestination(e.target.value)} />
      <Select mt="2" mb="2"  value={seats} onChange={(e)=>setseats(e.target.value)} placeholder='Select No Of seats'>
    <option>{1}</option>
    <option>{2}</option>
    <option>{3}</option>

  </Select>
      
      <Input  mt="2" mb="2" value={departure} 
 placeholder="Select Departure"
 onChange={(e)=>setdeparture(e.target.value)}
 size="md"
 type="date"
/>
     
      

          </ModalBody>}

          <ModalFooter>
            <GeneralButton colorScheme='blue' mr={3} fn={onClose}>
              Close
            </GeneralButton>
            <Button isLoading={addLoader} onClick={handleAddEvent} variant='ghost'>{"ADD EVENT"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
