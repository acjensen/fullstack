"use client";
import React, { useState } from "react";
import { get, put } from "../actions";
import { CopyBlock } from "react-code-blocks";

export default function Page() {
  const [message, setMessage] = useState("get dynamodb");

  const [text, setText] = useState("test");

  const [debugText, setDebugText] = useState("");

  const onSubmit = (event: any) => {
    put(text).then((t) => {
      setDebugText(t);
    });
    event.preventDefault();
  };

  const onChange = (event: any) => {
    setText(event.target.value);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <form onSubmit={onSubmit}>
        <label>
          Input:
          <textarea value={text} onChange={onChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button
        className="btn btn-primary"
        onClick={() => {
          get(text).then((m: string) => {
            setMessage(m);
          });
        }}
      >
        {message}
      </button>
      <div className="p-10">
        <button className="btn btn-primary">Button daisy UI</button>
      </div>
      <CopyBlock language={"javascript"} text={debugText} />
      <hr className="solid"></hr>
      <div>{debugText}</div>
    </div>
  );
}
