"use client";

import { message } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { createContext, ReactNode, useContext } from "react";

const TaskContext = createContext<{
  messageApi: MessageInstance;
  test: string;
} | null>(null);

export const useTaskContext = () => {
  const ctx = useContext(TaskContext);
  if (ctx) {
    return ctx;
  } else {
    throw new Error("useTaskContext harus digunakan didalam TaskProvider");
  }
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <TaskContext.Provider value={{ messageApi, test: "hello tara" }}>
      {contextHolder}
      {children}
    </TaskContext.Provider>
  );
};
