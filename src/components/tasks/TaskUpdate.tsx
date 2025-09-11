import { TaskEntity } from "@/types/entity";
import { Button, Modal } from "antd";
import { Fragment, useState } from "react";
import { TaskForm } from "./TaskForm";
import { nanoid } from "nanoid";

export const TaskUpdate = ({ task }: { task: TaskEntity }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Fragment>
      <Button onClick={showModal} className="!text-blue-600 !border-blue-600">
        Edit
      </Button>
      <Modal
        title="Update Task"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        destroyOnHidden
        centered
      >
        <TaskForm
          task={task}
          onSuccess={() => {
            const value = setIsModalOpen(false);
          }}
        />
      </Modal>
    </Fragment>
  );
};
