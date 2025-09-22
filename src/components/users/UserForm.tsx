"use client";

import { Button, Form, Input, message } from "antd";
import { useTransition } from "react";
import { UserEntity } from "./entity";
import { useRouter } from "next/navigation";

export const UserForm = () => {
  const [formInstance] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const submit = async (values: {
    name: string;
    email: string;
    address: string;
  }) => {
    startTransition(async () => {
      const result = await fetch(
        "https://68ce1f186dc3f350777e2b76.mockapi.io/api/v1/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (result.ok) {
        messageApi.success("Berhasil Tambah Data");
        formInstance.resetFields();
        const data: UserEntity = await result.json();
        router.replace(`/users/${data.id}`);
      } else {
        messageApi.error("Gagal Tambah Data");
      }
    });
  };

  return (
    <Form
      layout="vertical"
      form={formInstance}
      onFinish={submit}
      disabled={isPending}
    >
      {contextHolder}
      <Form.Item
        name={"name"}
        label={"Name"}
        rules={[{ required: true, message: "Tidak Boleh Kosong" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"email"}
        label={"Email"}
        rules={[{ required: true, message: "Tidak Boleh Kosong" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={"address"} label={"Address"}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending}>
          Simpan User
        </Button>
      </Form.Item>
    </Form>
  );
};
