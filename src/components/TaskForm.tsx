"use client";

import { createTask } from "@/app/tasks/actions";
import { Button, Form, Input, message } from "antd";
import { useTransition } from "react";

export const TaskForm = () => {
  const [formInstance] = Form.useForm();
  const [isPending, startTransition] = useTransition();
  const [messageApi, contextHolder] = message.useMessage();

  const submit = (values: { title: string; content: string }) => {
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

  return (
    <Form form={formInstance} onFinish={submit} disabled={isPending}>
      {contextHolder}
      <Form.Item name={"title"} label={"Title"} labelCol={{ span: 2 }}>
        <Input />
      </Form.Item>
      <Form.Item name={"content"} label={"Content"} labelCol={{ span: 2 }}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 2 }}>
        <Button type="primary" htmlType="submit" loading={isPending}>
          Simpan
        </Button>
      </Form.Item>
    </Form>
  );
};
