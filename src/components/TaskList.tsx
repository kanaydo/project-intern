"use client";

import { destroyTask } from "@/app/tasks/actions";
import { TaskEntity } from "@/types/entity";
import { Button, Card, Flex, List, message, Typography } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { Fleur_De_Leah } from "next/font/google";
import { Fragment, useTransition } from "react";

export const TaskList = ({ data }: { data: TaskEntity[] }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Card title={"Tasks"} extra={`Total Data ${data.length}`}>
      {contextHolder}
      <List
        bordered
        dataSource={data}
        renderItem={(item) => <TaskItem item={item} messageApi={messageApi} />}
      />
    </Card>
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
        <Button danger loading={isPending} onClick={destroy}>
          Hapus
        </Button>
      </Flex>
    </List.Item>
  );
};
