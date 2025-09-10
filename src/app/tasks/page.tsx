import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { TaskEntity } from "@/types/entity";
import { Card, List, Typography } from "antd";

const fetchData = async () => {
  const result = await fetch(
    "https://68bfde830b196b9ce1c249b2.mockapi.io/api/v1/tasks"
  );
  if (result.ok) {
    const data: TaskEntity[] = await result.json();
    return data;
  } else {
    throw new Error("gagal tarik data");
  }
};

export default async function TaskIndexPage() {
  const data = await fetchData();

  return (
    <Card title={"Task"} extra={`Total ${data.length}`} className="!m-4">
      <TaskForm />
      <TaskList data={data} />
    </Card>
  );
}
