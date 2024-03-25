// import { useState } from "react";
import { get } from "../server/actions";
import { auth } from "../auth/auth";
import Picker, { defaultColor } from "./Picker";

export default async function Page() {
  let session = await auth();

  return (
    <Picker
      session={session}
      initialColor={
        (session && (await get(session!.user!.email!)).color.S) || defaultColor
      }
    ></Picker>
  );
}
