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
    Box,Input, Text, Tab, Tabs, TabList
  } from '@chakra-ui/react'

import React, { useContext, useState } from 'react'
import { GeneralButton } from '../buttons/General'
import { ModalInput } from '../inputs/ModalInput'
// import lorem

export const LoginModal = (props) => {
  const [tabValue, setTabValue] = useState(1);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [lastname, setlastname] = useState("")
    const [firstname, setfirstname] = useState("")
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [location, setlocation] = useState("")

    const [cpwd, setcPwd] = useState("")
    const {login,signup,session,loginerror,signupsuccess} = useContext(UserConfig);
    const [loading, setLoading] = useState(false)
    const handleLogin=async()=>{
      console.log("dorrrne")

      setLoading(true);
      await login({email:email,password:pwd});
      console.log("done")
      // if(session) {
        setLoading(false);
        if(!loginerror){
          onClose();

        }
      // }
    }
    const handleSignup=async()=>{
      console.log("dorrrne")

      setLoading(true);
      await signup({ firstname:firstname, lastname:lastname, email:email, location:location, password:pwd });
      console.log("done")
      // if(session) {
        setLoading(false);
        if(!loginerror && signupsuccess){
          onClose();

        }
      // }
    }
    const handleNameChange = (e) => {
        setName(e.target.value);
      };
  
 
  return (
    <div>
             <GeneralButton name="Login" fn={onOpen} />
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> <Box position="relative" pl="5px">
              <Tabs variant="unstyled">
                <TabList
                  borderRadius="md"
                  top="9.5rem"
                  
                  width="100%"
                  zIndex="1"
                >
                  <Box display="flex" width="300px" >
                    <Tab
                      py="1"
                      px="3"
                      color="#676D9A"
                      fontSize="sm"
                      border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                      borderLeftRadius="md"
                      fontWeight="normal"
                      opacity="100%"
                      _selected={{
                        color: "white",
                        bg: "#4D59E8",
                        border: "none",
                      }}
                    //   isDisabled={collateralTransactionStarted == true}
                      onClick={() => {
                        setTabValue(1);
                      }}
                    >
                      Login
                    </Tab>
                    <Tab
                      py="1"
                      px="3"
                      color="#676D9A"
                      fontSize="sm"
                      border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                      borderRightRadius="md"
                      fontWeight="normal"
                      opacity="100%"
                      _selected={{
                        color: "white",
                        bg: "#4D59E8",
                        border: "none",
                      }}
                    //   isDisabled={transactionStarted == true}
                      onClick={() => {
                        setTabValue(2);
                      }}
                    >
                     SignUp
                    </Tab>
                  </Box>
                </TabList>
              </Tabs>
            </Box></ModalHeader>
          <ModalCloseButton />
          { tabValue==1?
          
          <ModalBody>
            
     

      <ModalInput text="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />

      <ModalInput type="password" text="Password" value={pwd} onChange={(e)=>setPwd(e.target.value)} />
      
      {loginerror&&    <Box color={'white'} background="red" padding="2" m="2">Login Error</Box>}
          </ModalBody>
          : <ModalBody>
            
      <ModalInput text="First Name" value={firstname} onChange={(e)=>setfirstname(e.target.value)} />
      <ModalInput text="Last Name" value={lastname} onChange={(e)=>setlastname(e.target.value)} />

      <ModalInput text="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <ModalInput text="Location" value={location} onChange={(e)=>setlocation(e.target.value)} />


      <ModalInput type="password" text="Password" value={pwd} onChange={(e)=>setPwd(e.target.value)} />
      <ModalInput  type="password" text="Confirm Password" error={pwd && cpwd && pwd!=cpwd} value={cpwd} onChange={(e)=>setcPwd(e.target.value)} />
      {signupsuccess&&    <Box color={'black'} background="green" padding="2" m="2">Checkout your email for verification</Box>}
      

          </ModalBody>}

          <ModalFooter>
            <GeneralButton colorScheme='blue' mr={3} fn={onClose}>
              Close
            </GeneralButton>
      
           {!signupsuccess && <Button isLoading={loading} onClick={tabValue==1? handleLogin :handleSignup} variant='ghost'>{tabValue==1? "Log In" : "Sign Up"}</Button>}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
