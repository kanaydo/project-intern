"use client";

import { TaskEntity } from "@/types/entity";
import { Alert, Button, Flex, Table, TableProps } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { TaskUpdate } from "./TaskUpdate";
import { TaskDestroy } from "./TaskDestroy";
import { indexTask } from "@/app/tasks/actions";
import useSWR from "swr";
import Link from "next/link";

export const TaskTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const columns: TableProps<TaskEntity>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text, record) => (
        <Link href={`/tasks/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Content",
      dataIndex: "content",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Flex gap={"small"}>
          <TaskUpdate task={record} />
          <TaskDestroy task={record} />
        </Flex>
      ),
    },
  ];

  const fetcher = async () => {
    const result = await indexTask({
      limit: parseInt(searchParams.get("limit") ?? "10"),
      page: parseInt(searchParams.get("page") ?? "1"),
    });
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  };

  const { data, isLoading, error } = useSWR(searchParams.toString(), fetcher);

  if (error) {
    return <Alert description={`${error}`} type="error" />;
  }

  return (
    <Table<TaskEntity>
      loading={isLoading}
      columns={columns}
      dataSource={data ?? []}
      bordered
      pagination={{
        total: 97,
        current: parseInt(searchParams.get("page") ?? "1"),
        pageSize: parseInt(searchParams.get("limit") ?? "10"),
      }}
      onChange={(pagination) => {
        const current = pagination.current ?? 1; // null aware
        const pageSize = pagination.pageSize ?? 10;
        router.replace(`/tasks?page=${current}&limit=${pageSize}`);
      }}
      rowKey={(record) => record.id}
    />
  );
};
