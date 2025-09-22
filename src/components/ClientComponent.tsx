"use client";

import { useState } from "react";

export const ClientComponent = () => {
  const [count, setCount] = useState();
  return <div className="bg-red-400">Hello From Client Component</div>;
};
