"use client";

import { Button, Flex, Table, TableProps } from "antd";
import { UserEntity } from "./entity";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserDestroy } from "./UserDestroy";

export const UserIndexTable = ({ users }: { users: UserEntity[] }) => {
  const router = useRouter();

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
          <Flex gap={"small"}>
            <Button href={`/users/${record.id}/edit`}>Edit</Button>
            <UserDestroy user={record} />
          </Flex>
        );
      },
    },
  ];

  return (
    <Flex vertical gap={"middle"}>
      <Button type="primary" href="/users/new">
        Tambah User
      </Button>
      <Table<UserEntity>
        columns={columns}
        dataSource={users}
        pagination={{ total: 97 }}
        rowKey={(record) => record.id}
        onChange={(pagination) => {
          const current = pagination.current ?? 1;
          const pageSize = pagination.pageSize ?? 10;
          router.replace(`/users?page=${current}&limit=${pageSize}`);
        }}
      />
    </Flex>
  );
};
