"use client";

import { TaskEntity } from "@/types/entity";
import { Table, TableProps } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

export const TaskTable = ({ data }: { data: TaskEntity[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const columns: TableProps<TaskEntity>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
    },
    {
      title: "Actions",
      render: () => <div>actions</div>,
    },
  ];

  return (
    <Table<TaskEntity>
      columns={columns}
      dataSource={data}
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
    />
  );
};
