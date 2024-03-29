"use client";
import React, { useState } from "react";
import Layout from "./layout";
import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Bounce, toast } from "react-toastify";
import Loading from "../loading";
const Fooditem = () => {
  const [formData, setFormData] = useState({
    foodcat: "",
    foodname: "",
    image: "",
    pricehalf: "",
    description: "",
  });
  const [loading, setloading] = useState(false);
  const inputOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setloading(true);
    const { foodcat, foodname, image, pricehalf, description } = formData;
    if (!foodcat || !foodname || !image || !pricehalf || !description) {
      return toast.error("please fill all the details", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    try {
      const response = await fetch("api/insertFoodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          foodcat,
          foodname,
          image,
          pricehalf,
          description,
        }),
      });
      const data = await response.json();
      setloading(false);
      if (data.message) {
        // Handle success
        toast.success(data.message, {
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
        setFormData({
          foodcat: "",
          foodname: "",
          image: null,
          pricehalf: "",
          pricefull: "",
          description: "",
        });
      } else {
        // Handle error
        toast.error(data.error, {
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
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  };

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <Box
          p="10"
          className="bg-gray-300 h-[90vh] justify-center flex text-center"
        >
          <Card maxW="700px" m="auto" className="bg-white rounded-md">
            <Box p="6">
              <Text
                textAlign="center"
                fontSize="2xl"
                fontWeight="bold"
                className="py-6"
              >
                Add Food Item
              </Text>
              <form method="POST">
                <Stack>
                  <FormControl>
                    <Flex justify="space-between" className="py-6">
                      <FormLabel>Add Food_Catagory :</FormLabel>
                      <Input
                        value={formData.foodcat}
                        type="text"
                        maxW="400px"
                        required
                        name="foodcat"
                        onChange={inputOnChange}
                        m="auto"
                        className="bg-gray-100"
                        placeholder="Food Catagory"
                      />
                    </Flex>
                  </FormControl>
                  <FormControl>
                    <Flex justify="space-between" className="py-6">
                      <FormLabel>Add Food_Name :</FormLabel>
                      <Input
                        type="text"
                        value={formData.foodname}
                        maxW="400px"
                        required
                        name="foodname"
                        onChange={inputOnChange}
                        m="auto"
                        className="bg-gray-100"
                        placeholder="Food name"
                      />
                    </Flex>
                  </FormControl>
                  <FormControl>
                    <Flex justify="space-between" className="py-6">
                      <FormLabel>Add Food_Image :</FormLabel>
                      <Input
                        value={formData.image}
                        type="text"
                        name="image"
                        maxW="400px"
                        required
                        onChange={inputOnChange}
                        m="auto"
                        className="bg-gray-100"
                        placeholder="Food image link"
                      />
                    </Flex>
                  </FormControl>
                  <FormControl>
                    <Flex justify="space-between" className="py-6">
                      <FormLabel>Add Food_Price :</FormLabel>
                      <Input
                        type="number"
                        name="pricehalf"
                        value={formData.pricehalf}
                        maxW="400px"
                        required
                        onChange={inputOnChange}
                        m="auto"
                        className="bg-gray-100"
                        placeholder="Food Price"
                      />
                    </Flex>
                  </FormControl>

                  <FormControl>
                    <Flex justify="space-between" className="py-6">
                      <FormLabel>Add Food_Description :</FormLabel>
                      <Input
                        type="text"
                        maxW="400px"
                        required
                        value={formData.description}
                        name="description"
                        onChange={inputOnChange}
                        m="auto"
                        className="bg-gray-100"
                        placeholder="Food Description"
                      />
                    </Flex>
                  </FormControl>
                </Stack>
              </form>

              <Button
                w="150px"
                textAlign="center"
                m="auto"
                onClick={handleSubmit}
                className="p-3 bg-gray-200 rounded-xl"
              >
                Add Food Item
              </Button>
            </Box>
          </Card>
        </Box>
      )}
    </Layout>
  );
};

export default Fooditem;
