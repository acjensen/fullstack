"use client";
import { useEffect, useState } from "react";

const ClientComponent = (props: any) => {
  const [data, setData] = useState("loading...");
  useEffect(() => {
    fetch("https://httpbin.org/get")
      .then((res) => res.json())
      .then((data) => {
        setData(JSON.stringify(data, null, 2));
      })
      .catch((_err) => {
        throw new Error("Failed to fetch data");
      });
  }, []);
  return <div>{"response: " + data}</div>;
};

export default ClientComponent;
