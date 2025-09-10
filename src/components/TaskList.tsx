"use client";

import { destroyTask } from "@/app/tasks/actions";
import { TaskEntity } from "@/types/entity";
import { Button, Card, Flex, List, message, Typography } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { Fleur_De_Leah } from "next/font/google";
import { Fragment, useTransition } from "react";
import { TaskUpdate } from "./TaskUpdate";

export const TaskList = ({ data }: { data: TaskEntity[] }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Fragment>
      {contextHolder}
      <List
        bordered
        dataSource={data}
        renderItem={(item) => <TaskItem item={item} messageApi={messageApi} />}
      />
    </Fragment>
  );
};

const TaskItem = ({
  item,
  messageApi,
}: {
  item: TaskEntity;
  messageApi: MessageInstance;
}) => {
  const [isPending, startTransition] = useTransition();

  const destroy = () => {
    startTransition(async () => {
      const result = await destroyTask(item.id);
      if (result.success) {
        messageApi.success(result.message);
      } else {
        messageApi.error(result.message);
      }
    });
  };

  return (
    <List.Item className="!w-full">
      <Flex justify="space-between" className="!w-full">
        <div>{item.title}</div>
        <Flex gap={"small"}>
          <TaskUpdate task={item} />
          <Button danger loading={isPending} onClick={destroy}>
            Hapus
          </Button>
        </Flex>
      </Flex>
    </List.Item>
  );
};
