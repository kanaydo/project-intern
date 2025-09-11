"use server";

import { TaskEntity } from "@/types/entity";
import { TaskFormData } from "@/types/formData";

export const destroyTask = async (id: string) => {
  const response = await fetch(
    `https://68bfde830b196b9ce1c249b2.mockapi.io/api/v1/tasks/${id}`,
    {
      method: "DELETE",
    }
  );
  if (response.ok) {
    return { success: true, message: "Berhasil Hapus Data" };
  } else {
    return { success: false, data: "Gagal Hapus Data" };
  }
};

export const createTask = async (params: TaskFormData) => {
  const response = await fetch(
    `https://68bfde830b196b9ce1c249b2.mockapi.io/api/v1/tasks`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(params),
    }
  );
  if (response.ok) {
    return { success: true, message: "Berhasil Menambah Data" };
  } else {
    return { success: false, data: "Gagal Menambah Data" };
  }
};

export const updateTask = async (id: string, params: TaskFormData) => {
  const response = await fetch(
    `https://68bfde830b196b9ce1c249b2.mockapi.io/api/v1/tasks/${id}`,
    {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(params),
    }
  );
  if (response.ok) {
    return { success: true, message: "Berhasil Mengubah  Data" };
  } else {
    return { success: false, data: "Gagal Mengubah Data" };
  }
};

export const indexTask = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const result = await fetch(
    `https://68bfde830b196b9ce1c249b2.mockapi.io/api/v1/tasks?page=${page}&limit=${limit}`
  );
  if (result.ok) {
    const data: TaskEntity[] = await result.json();
    return { success: true, data: data };
  } else {
    return { success: false, message: "gagal tarik data" };
  }
};
