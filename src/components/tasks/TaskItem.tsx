"use client";

import { TaskEntity } from "@/types/entity";
import { useTransition } from "react";
import { useTaskContext } from "./TaskProvider";
import { destroyTask } from "@/app/tasks/actions";
import { Button, Flex, List } from "antd";
import { TaskUpdate } from "./TaskUpdate";

export const TaskItem = ({ item }: { item: TaskEntity }) => {
  const [isPending, startTransition] = useTransition();
  const { messageApi, test } = useTaskContext();

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
      {test}
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
