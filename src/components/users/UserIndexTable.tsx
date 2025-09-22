"use client";

import { Button, Table, TableProps } from "antd";
import { UserEntity } from "./entity";

export const UserIndexTable = ({ users }: { users: UserEntity[] }) => {
  const columns: TableProps<UserEntity>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Actions",
      render: (text, record) => {
        return (
          <div>
            <Button>Edit</Button>
            <Button>Hapus</Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table<UserEntity> columns={columns} dataSource={users} />
    </div>
  );
};
