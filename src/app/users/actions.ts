"use server";

import { UserEntity, UserFormData } from "@/components/users/entity";
import { revalidatePath } from "next/cache";

export const createUser = async (values: UserFormData) => {
  const result = await fetch(
    "https://68ce1f186dc3f350777e2b76.mockapi.io/api/v1/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
  if (result.ok) {
    const user: UserEntity = await result.json();
    return { success: true, data: user };
  } else {
    return { success: false, message: "Gagal Tambah Data" };
  }
};

export const updateUser = async (id: string, values: UserFormData) => {
  const result = await fetch(
    `https://68ce1f186dc3f350777e2b76.mockapi.io/api/v1/users/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
  if (result.ok) {
    const user: UserEntity = await result.json();
    return { success: true, data: user };
  } else {
    return { success: false, message: "Gagal Update Data" };
  }
};

export const destroyUser = async (id: string) => {
  const result = await fetch(
    `https://68ce1f186dc3f350777e2b76.mockapi.io/api/v1/users/${id}`,
    {
      method: "DELETE",
    }
  );
  if (result.ok) {
    revalidatePath("/users");
    return { success: true, message: "Berhasil Hapus User" };
  } else {
    return { success: false, message: "Gagal Hapus User" };
  }
};
