import { useState, useEffect, useContext, createContext } from "react";
import { AxiosGet, AxiosPost } from "../lib/axios";
import { UserConfig } from "./UserConfig";

export const EventConfig = createContext();

export const EventProvider = ({ children }) => {
  const { session, user } = useContext(UserConfig);
  const [RidesLoading, setRidesLoading] = useState(false);
  const [ridesAvaailableData, setRidesAavailableData] = useState([]);
  const [rideRequests, setRideRequests] = useState([]);

  useEffect(() => {
    const getAvailableRides = async () => {
      const data = await AxiosGet("/api/v1/rides", session.token);
      if (data.success) {
        
        setRidesAavailableData(data.rides);
      }
    };

 

    if (user && session) {
      setRidesLoading(true);

      getAvailableRides();
    
      setRidesLoading(false);
    }
  }, [user, session]);
  useEffect(()=>{
    const getRideRequests = async() => {
      let request = [];
      console.log(ridesAvaailableData)
      ridesAvaailableData.map(async (item) => {
            if (item.userid == user.id) {
                console.log(item.userid, user.id);
                const data = await AxiosGet(
                    `/api/v1/users/rides/${item.id}/requests`,
                    session.token
                );
                console.log(data.success, "fetchd requedst");
                if (data.success) {
                    request.push(data.rides);
                    console.log(data.rides);
                }
                else {
                }
            }
        });
      setRideRequests(request);
      if(ridesAvaailableData){
        getRideRequests();
      }
    };
  },[ridesAvaailableData,user,session])
  const updateRideRequest = async (rideid, requestid, decision) => {
    const data = await AxiosPost(
      `/api/v1/users/rides/${rideid}/requests/${requestid}`,
      { status: decision }
    );
    if (data.success) {
      return true;
    }
    return false;
  };
  const postRide = async (values) => {
    console.log(session.token);
    const data = await AxiosPost(`/api/v1/users/rides`, values, session.token);
    //   {
    //     "success": true,
    //     "message": "Ride created successfully",
    //     "ride": {
    //       "id": 8,
    //       "location": "ss",
    //       "destination": "ss",
    //       "seats": 2,
    //       "departure": "2018-05-03T00:00:00.000Z",
    //       "userid": 1,
    //       "created_at": "2018-07-13T17:02:03.067Z",
    //       "updated_at": "2018-07-13T17:02:03.067Z"
    //     }
    //   }
    if (data.success) {
      //   showErrorAlert({ title: data.msg });
      console.log("done");
    } else {
      console.log("error");
      // setuserdata(user)
    }
  };

  return (
    <EventConfig.Provider
      value={{
        postRide,
        RidesLoading,
        ridesAvaailableData,
        updateRideRequest,
        rideRequests,
      }}
    >
      {children}
    </EventConfig.Provider>
  );
};
