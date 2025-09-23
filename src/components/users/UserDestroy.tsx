"use client";

import { Button, message } from "antd";
import { UserEntity } from "./entity";
import { useTransition } from "react";
import { destroyUser } from "@/app/users/actions";

export const UserDestroy = ({ user }: { user: UserEntity }) => {
  const [isPending, startTransition] = useTransition();
  const [messageApi, contextHolder] = message.useMessage();

  const destroy = () => {
    startTransition(async () => {
      const result = await destroyUser(user.id);
      if (result.success) {
        messageApi.success(result.message);
      } else {
        messageApi.error(result.message);
      }
    });
  };

  return (
    <div>
      {contextHolder}
      <Button danger loading={isPending} onClick={destroy}>
        Hapus
      </Button>
    </div>
  );
};
