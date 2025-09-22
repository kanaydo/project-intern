"use server";

import { UserEntity, UserFormData } from "@/components/users/entity";

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
