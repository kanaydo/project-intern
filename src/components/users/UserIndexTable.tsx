"use client";

import { Button, Flex, Table, TableProps } from "antd";
import { UserEntity } from "./entity";
import Link from "next/link";

export const UserIndexTable = ({ users }: { users: UserEntity[] }) => {
  const columns: TableProps<UserEntity>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) => {
        return <Link href={`/users/${record.id}`}>{record.name}</Link>;
      },
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
      render: (_, record) => {
        return (
          <div>
            <Button href={`/users/${record.id}/edit`}>Edit</Button>
            <Button>Hapus</Button>
          </div>
        );
      },
    },
  ];

  return (
    <Flex vertical gap={"middle"}>
      <Button type="primary" href="/users/new">
        Tambah User
      </Button>
      <Table<UserEntity> columns={columns} dataSource={users} />
    </Flex>
  );
};
