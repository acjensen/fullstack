"use client";
import { useEffect, useState } from "react";
import { getData } from "./actions";

const MyComponent = (props: any) => {
  const [data, setData] = useState("loading...");
  useEffect(() => {
    const abortController = new AbortController();
    console.log("i fire once");
    fetch("https://httpbin.org/get")
      .then((res) => res.json())
      .then((data) => {
        setData(JSON.stringify(data, null, 2));
      })
      .catch((_err) => {
        throw new Error("Failed to fetch data");
      });
    abortController.abort();
  }, []);
  return <div>{"response: " + data}</div>;
};

export default MyComponent;
