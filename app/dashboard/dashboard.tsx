'use client';

import { useState } from 'react';
import { get, put } from '../server/actions';

export default function dashboard(props: { session: any }) {
  const { session } = props;
  const isLoggedIn = !!session;
  const [text, setText] = useState('test');
  const [debugText, setDebugText] = useState('');

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
        <label htmlFor="textArea">
          Input:
          <textarea
            id="textArea"
            value={text}
            onChange={(event: any) => {
              setText(event.target.value);
            }}
          />
        </label>
        <div />
        <input type="submit" value="SUBMIT" />
      </form>
      <hr className="solid" />
      <h1>Get an attribute to from your user record.</h1>
      <button
        type="button"
        onClick={() => {
          if (isLoggedIn) {
            get(session.user?.email).then((item: any) => {
              // setDebugText(JSON.stringify(item));
              if (item?.[text]?.S) {
                setDebugText(item[text].S);
                return;
              }
              setDebugText('NOT FOUND');
            });
          }
        }}
      >
        GET
      </button>
      <hr className="solid" />
      <div>{debugText}</div>
    </div>
  );
}
