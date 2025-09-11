"use client";

import { createTask, updateTask } from "@/app/tasks/actions";
import { TaskEntity } from "@/types/entity";
import { Button, Form, Input, message } from "antd";
import { useTransition } from "react";
import { useTaskContext } from "./TaskProvider";
import { TaskFormData } from "@/types/formData";
import { useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";

export const TaskForm = ({
  task,
  onSuccess,
}: {
  task?: TaskEntity;
  onSuccess?: () => void; // callback // function as props
}) => {
  const [formInstance] = Form.useForm();
  const [isPending, startTransition] = useTransition();
  const { messageApi, test } = useTaskContext();
  const searchParams = useSearchParams();
  const { mutate } = useSWRConfig();

  const create = (values: TaskFormData) => {
    startTransition(async () => {
      const result = await createTask(values);
      if (result.success) {
        formInstance.resetFields();
        mutate(searchParams.toString());
        messageApi.success(result.message);
      } else {
        messageApi.error(result.message);
      }
    });
  };

  const update = (id: string, values: TaskFormData) => {
    startTransition(async () => {
      const result = await updateTask(id, values);
      if (result.success) {
        messageApi.success(result.message);
        mutate(searchParams.toString());
        if (onSuccess) {
          onSuccess();
        }
      } else {
        messageApi.error(result.message);
      }
    });
  };

  const submit = (values: TaskFormData) => {
    if (task == undefined) {
      create(values);
    } else {
      update(task.id, values);
    }
  };

  return (
    <Form
      form={formInstance}
      onFinish={submit}
      disabled={isPending}
      layout="vertical"
      initialValues={task}
    >
      {test}
      <Form.Item
        name={"title"}
        label={"Title"}
        rules={[{ required: true, message: "tidak boleh kosong" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"content"}
        label={"Content"}
        rules={[{ required: true, message: "tidak boleh kosong" }]}
      >
        <Input.TextArea
          onChange={() => {
            console.log("hello");
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending}>
          Simpan
        </Button>
      </Form.Item>
    </Form>
  );
};
