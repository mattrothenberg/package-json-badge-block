import React from "react";
import { tw } from "twind";

export const Label = (props: { children: React.ReactNode }) => {
  return (
    <p
      className={tw`text-gray-500 font-medium uppercase tracking-widest text-xs`}
    >
      {props.children}
    </p>
  );
};
