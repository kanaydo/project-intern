"use client";

import { destroyTask } from "@/app/tasks/actions";
import { TaskEntity } from "@/types/entity";
import { Button, Card, Flex, List, message, Typography } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { Fleur_De_Leah } from "next/font/google";
import { Fragment, useTransition } from "react";
import { TaskUpdate } from "./TaskUpdate";
import { useTaskContext } from "./TaskProvider";
import { TaskItem } from "./TaskItem";

export const TaskList = ({ data }: { data: TaskEntity[] }) => {
  return (
    <Fragment>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => <TaskItem item={item} />}
      />
    </Fragment>
  );
};
