import { EventPreview } from "@/components/EventPreview";
import { EventAddModal } from "@/components/modals/EventAddModal";
import { EventConfig } from "@/context/EventsConfig";
import { UserConfig } from "@/context/UserConfig";
import PageCard from "@/layouts/Pagecard";
import { Box, Spinner, Tab, TabList, Tabs, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";

export const Page = () => {
  const [TabValue, setTabValue] = useState(1);
  const { user } = useContext(UserConfig);
  const { RidesLoading, ridesAvaailableData } = useContext(EventConfig);
  return (
    <PageCard>
      <div className="flex flex-row justify-center mb-4">
        <EventAddModal />
      </div>
      {user ? (
        <>
          {" "}
          <Tabs variant="unstyled">
            <TabList borderRadius="md" top="9.5rem" width="100%" zIndex="1">
              <Box display="flex">
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
                  Rides around
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
                  Rides Hosted
                </Tab>
              </Box>
            </TabList>
          </Tabs>
          {RidesLoading ? (
            <Spinner />
          ) : TabValue == 1 ? (
            ridesAvaailableData.length > 0 ? (
              
              ridesAvaailableData.map((item, k) => {
                console.log(item.userid, user);

                if (item.userid != user.id) {
                  return (
                    <EventPreview key={k} data={item} host={TabValue == 2} />
                  );
                }
              })
            ) : (
              <Text>No Rides at the moment</Text>
            )
          ) : ridesAvaailableData.length > 0 ? (
            ridesAvaailableData.map((item, k) => {
              console.log(item.userid, user.id);

              if (item.userid == user.id) {
                return (
                  <EventPreview key={k} data={item} host={TabValue == 2} />
                );
              }
            })
          ) : (
            <Text>No Rides at the moment</Text>
          )}
        </>
      ) : (
        <></>
      )}
    </PageCard>
  );
};
export default Page;
