"use client";
import React, { useState } from "react";
import { get, put } from "../actions";

export default function Page() {
  const [message, setMessage] = useState("initial message");
  return (
    <div>
      <h1>Hello, Next.js... dashboard</h1>
      <button onClick={() => put()}>put dynamodb</button>
      <button
        onClick={() => {
          get().then((m: string) => {
            setMessage(m);
          });
        }}
      >
        {message}
      </button>
    </div>
  );
}
