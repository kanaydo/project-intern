"use client";

import { useState } from "react";
import { Studi } from "./Studi";

export const Experience = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="text-blue-500 flex flex-col items-center">
      <b>{count}</b>
      <div className="flex flex-row gap-4">
        <button
          onClick={() => {
            setCount(count - 1);
          }}
        >
          decrease
        </button>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          increase
        </button>
      </div>
    </div>
  );
};

