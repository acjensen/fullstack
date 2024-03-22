"use client";
import React, { useState } from "react";
import { get, put } from "../actions";

export default function dashboard(props: { session: any }) {
  const session = props.session;
  const [message, setMessage] = useState("get dynamodb");
  const [text, setText] = useState("test");
  const [debugText, setDebugText] = useState("");

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {session
          ? `you're logged in as ${session.user?.email}`
          : "you're not logged in"}
      </div>
      <form
        onSubmit={(event: any) => {
          put(text, { name: "temppp", value: text }).then((t) => {
            setDebugText(t);
          });
          event.preventDefault();
        }}
      >
        <label>
          Input:
          <textarea
            value={text}
            onChange={(event: any) => {
              setText(event.target.value);
            }}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button
        className="btn btn-primary"
        onClick={() => {
          get(text).then((item: any) => {
            if (item) {
              setMessage(item.temppp.S);
            } else {
              setMessage("NOT FOUND");
            }
          });
        }}
      >
        {message}
      </button>
      <hr className="solid"></hr>
      <div>{debugText}</div>
    </div>
  );
}
