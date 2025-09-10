"use client";

import { TaskEntity } from "@/types/entity";
import { Card, List, Typography } from "antd";

export const TaskList = ({ data }: { data: TaskEntity[] }) => {
  return (
    <Card title={"Tasks"}>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>[ITEM]</Typography.Text> {item.title}
          </List.Item>
        )}
      />
    </Card>
  );
};
