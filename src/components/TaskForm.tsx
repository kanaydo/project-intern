"use client";

import { createTask, updateTask } from "@/app/tasks/actions";
import { TaskEntity } from "@/types/entity";
import { Button, Form, Input, message } from "antd";
import { useTransition } from "react";

export const TaskForm = ({
  task,
  onSuccess,
}: {
  task?: TaskEntity;
  onSuccess?: () => void; // callback // function as props
}) => {
  const [formInstance] = Form.useForm();
  const [isPending, startTransition] = useTransition();
  const [messageApi, contextHolder] = message.useMessage();

  const create = (values: { title: string; content: string }) => {
    startTransition(async () => {
      const result = await createTask(values);
      if (result.success) {
        formInstance.resetFields();
        messageApi.success(result.message);
      } else {
        messageApi.error(result.message);
      }
    });
  };

  const update = (id: string, values: { title: string; content: string }) => {
    startTransition(async () => {
      const result = await updateTask(id, values);
      if (result.success) {
        messageApi.success(result.message);
        if (onSuccess) {
          onSuccess();
        }
      } else {
        messageApi.error(result.message);
      }
    });
  };

  const submit = (values: { title: string; content: string }) => {
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
      {contextHolder}
      <Form.Item name={"title"} label={"Title"}>
        <Input />
      </Form.Item>
      <Form.Item name={"content"} label={"Content"}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending}>
          Simpan
        </Button>
      </Form.Item>
    </Form>
  );
};
