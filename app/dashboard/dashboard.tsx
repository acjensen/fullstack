"use client";
import React, { useState } from "react";
import { get, put } from "../server/actions";

export default function dashboard(props: { session: any }) {
  const session = props.session;
  const isLoggedIn = !!session;
  const [message, setMessage] = useState("get dynamodb");
  const [text, setText] = useState("test");
  const [debugText, setDebugText] = useState("");

  return (
    <div>
      <h1>Submit an attribute to your user record.</h1>
      <form
        onSubmit={(event: any) => {
          if (isLoggedIn) {
            put(session.user?.email, { name: text, value: text }).then((t) => {
              setDebugText(t);
            });
          }
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
        <div></div>
        <input type="submit" value="SUBMIT" />
      </form>
      <hr className="solid"></hr>
      <h1>Get an attribute to from your user record.</h1>
      <button
        className="btn btn-primary"
        onClick={() => {
          if (isLoggedIn) {
            get(session.user?.email).then((item: any) => {
              // setDebugText(JSON.stringify(item));
              if (item && item[text] && item[text].S) {
                setDebugText(item[text].S);
                return;
              }
              setDebugText("NOT FOUND");
            });
          }
        }}
      >
        GET
      </button>
      <hr className="solid"></hr>
      <div>{debugText}</div>
    </div>
  );
}
