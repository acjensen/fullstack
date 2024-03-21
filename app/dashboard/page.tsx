"use client";
import React, { useState } from "react";
import { get, put } from "../actions";

export default function Page() {
  const [message, setMessage] = useState("get dynamodb");
  return (
    <div>
      <h1>Hello, Next.js... dashboard</h1>
      <button className="btn" onClick={() => put()}>
        put dynamodb
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          get("test").then((m: string) => {
            setMessage(m);
          });
        }}
      >
        {message}
      </button>
      <div className="p-10">
        <button className="btn btn-primary">Button daisy UI</button>
      </div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}
