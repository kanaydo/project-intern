import { TaskEntity } from "@/types/entity";
import { Card } from "antd";

const fetchData = async (id: string) => {
  const result = await fetch(
    `https://68bfde830b196b9ce1c249b2.mockapi.io/api/v1/tasks/${id}`
  );
  if (result.ok) {
    const data: TaskEntity = await result.json();
    return data;
  } else {
    throw new Error("Gagal Mengambil Data");
  }
};

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const pageParams = await params;
  const detail = await fetchData(pageParams.id);

  return (
    <Card title={detail.title} className="!m-4">
      <div>{detail.content}</div>
    </Card>
  );
}
