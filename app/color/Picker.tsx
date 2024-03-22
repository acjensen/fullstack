"use client";

import { useState } from "react";
import { put } from "../actions";
import { SubmitButton } from "../submit-button";

const Picker = (props: { session: any; initialColor?: string }) => {
  const [value, setValue] = useState(props.initialColor || "#9a5b5b");
  return (
    <div>
      <h1>What's your favorite color???</h1>

      <form
        action={async (formData: FormData) => {
          // "use server";
          if (props.session) {
            await put(props.session.user?.email!, {
              name: "color",
              value: value,
            });
          }
        }}
        className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
      >
        <div>
          <input
            type="color"
            value={value}
            onChange={(v) => {
              setValue(v.target.value);
            }}
          />
        </div>
        <SubmitButton>Save</SubmitButton>
      </form>
    </div>
  );
};

export default Picker;
