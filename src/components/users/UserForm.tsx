"use client";

import { Button, Form, Input, message } from "antd";
import { useTransition } from "react";
import { UserEntity, UserFormData } from "./entity";
import { useRouter } from "next/navigation";
import { createUser, updateUser } from "@/app/users/actions";

export const UserForm = ({ user }: { user?: UserEntity }) => {
  const [formInstance] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const create = (values: UserFormData) => {
    startTransition(async () => {
      const result = await createUser(values);
      if (result.success) {
        messageApi.success("Berhasil Tambah Data");
        formInstance.resetFields();
        router.replace(`/users/${result.data?.id}`);
      } else {
        messageApi.error("Gagal Tambah Data");
      }
    });
  };

  const update = (id: string, values: UserFormData) => {
    startTransition(async () => {
      const result = await updateUser(id, values);
      if (result.success) {
        messageApi.success("Berhasil Ubah Data");
        formInstance.resetFields();
        router.replace(`/users/${result.data?.id}`);
      } else {
        messageApi.error("Gagal Ubah Data");
      }
    });
  };

  const submit = async (values: UserFormData) => {
    if (user) {
      update(user.id, values);
    } else {
      create(values);
    }
  };

  return (
    <Form
      layout="vertical"
      form={formInstance}
      onFinish={submit}
      disabled={isPending}
      initialValues={user}
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
