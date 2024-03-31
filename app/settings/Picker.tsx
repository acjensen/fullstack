'use client';

import { useState } from 'react';
import { SubmitButton } from '../auth/signin/submit-button';
import { put } from '../server/actions';

export const defaultColor = '#9a5b5b';

const Picker = (props: { session: any; initialColor: string }) => {
  const { initialColor, session } = props;
  const [value, setValue] = useState(initialColor);
  return (
    <div>
      <h1>What is your favorite color???</h1>

      <form
        action={async () => {
          // "use server";
          if (session) {
            await put(session.user?.email, {
              name: 'color',
              value,
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
