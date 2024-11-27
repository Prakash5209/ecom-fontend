import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "./../rdx/slice/dataSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Carousel } from "antd";
import CategoriesMenu from "./Category";
import { cartFetchData } from "../rdx/slice/cartSlice";
function Home() {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.data);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(cartFetchData());
  }, [status, dispatch]);

  const images = [
    "https://images.unsplash.com/photo-1727949395650-5315f1c592c2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1727949395650-5315f1c592c2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1727949395650-5315f1c592c2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1727949395650-5315f1c592c2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1727949395650-5315f1c592c2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Carousel autoplay dotPosition="top" effect="fade">
        {images.map((item, index) => (
          <div className="bg-sky-300" key={index}>
            <img className="object-cover w-full h-64" src={item} />
          </div>
        ))}
      </Carousel>
      <div className="flex justify-around">
        <Box component="section" className="">
          <Typography className="text-center">categoryes</Typography>
          <hr />
          <br />
          {status === "succeeded" && categories.length > 0 ? (
            <CategoriesMenu categories={categories} />
          ) : (
            <p>No categories available.</p>
          )}
        </Box>
      </div>
    </div>
  );
}

export default Home;
