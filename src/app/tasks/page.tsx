import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskProvider } from "@/components/tasks/TaskProvider";
import { TaskTable } from "@/components/tasks/TaskTable";
import { TaskEntity } from "@/types/entity";
import { Card, List, Typography } from "antd";
import { Fragment } from "react";

// const fetchData = async (page: number, limit: number) => {
//   const result = await fetch(
//     `https://68bfde830b196b9ce1c249b2.mockapi.io/api/v1/tasks?page=${page}&limit=${limit}`
//   );
//   if (result.ok) {
//     const data: TaskEntity[] = await result.json();
//     return data;
//   } else {
//     throw new Error("gagal tarik data");
//   }
// };

export default async function TaskIndexPage(
  {
    // searchParams,
  }: {
    // searchParams: Promise<{
    //   page: number | undefined;
    //   limit: number | undefined;
    // }>;
  }
) {
  // const pageSearchParams = await searchParams;
  // const data = await fetchData(
  //   pageSearchParams.page ?? 1,
  //   pageSearchParams.limit ?? 10
  // );

  return (
    <Fragment>
      <TaskProvider>
        <Card title={"Task"} className="!m-4">
          <TaskForm />
          <TaskTable />
        </Card>
      </TaskProvider>
    </Fragment>
  );
}
