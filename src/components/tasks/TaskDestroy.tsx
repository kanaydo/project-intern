"use client";

import { TaskEntity } from "@/types/entity";
import { useTransition } from "react";
import { useTaskContext } from "./TaskProvider";
import { destroyTask } from "@/app/tasks/actions";
import { Button } from "antd";

export const TaskDestroy = ({ task }: { task: TaskEntity }) => {
  const [isPending, startTransition] = useTransition();
  const { messageApi } = useTaskContext();

  const destroy = () => {
    startTransition(async () => {
      const result = await destroyTask(task.id);
      if (result.success) {
        messageApi.success(result.message);
      } else {
        messageApi.error(result.message);
      }
    });
  };

  return (
    <Button danger loading={isPending} onClick={destroy}>
      Hapus
    </Button>
  );
};
