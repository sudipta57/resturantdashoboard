import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import Layout from "./layout";
const Order = () => {
  return (
    <Layout>
      <Stack className="my-16 text-center items-center">
        <Text className="text-7xl font-bold">Welcome Mio Amore</Text>
        <Text color="purple" className="font-bold text-4xl">
          There is no order right now
        </Text>
      </Stack>
    </Layout>
  );
};

export default Order;
